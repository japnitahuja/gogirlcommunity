require("dotenv").config();
const { google } = require("googleapis");
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require("path");

const router = express.Router();
let subscriptions = {}; // Local storage for subscriptions

router.post("/orders", async (req, res) => {
  try {
    console.log("-------->process env", process.env.ENV);

    const razorpay_key =
      process.env.ENV == "live"
        ? process.env.RAZORPAY_LIVE_KEY_ID
        : process.env.RAZORPAY_KEY_ID;
    const razorpay_secret =
      process.env.ENV == "live"
        ? process.env.RAZORPAY_LIVE_SECRET
        : process.env.RAZORPAY_SECRET;

    console.log(`key_id: ${razorpay_key}, key_secret: ${razorpay_secret}`);

    const instance = new Razorpay({
      key_id: razorpay_key,
      key_secret: razorpay_secret,
    });

    const options = {
      amount: 500,
      currency: "INR",
      receipt: "receipt_order_74394",
    };
    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occurred");
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/subscriptions", async (req, res) => {
  try {
    const { email } = req.body.user;

    console.log("Creating Subscription...", req.body.user);
    const razorpay_key =
      process.env.ENV === "live"
        ? process.env.RAZORPAY_LIVE_KEY_ID
        : process.env.RAZORPAY_KEY_ID;
    const razorpay_secret =
      process.env.ENV === "live"
        ? process.env.RAZORPAY_LIVE_SECRET
        : process.env.RAZORPAY_SECRET;

    const instance = new Razorpay({
      key_id: razorpay_key,
      key_secret: razorpay_secret,
    });

    const plan_id =
      process.env.ENV === "live"
        ? process.env.PLAN_ID
        : process.env.PLAN_ID_TEST;

    const options = {
      plan_id: plan_id,
      customer_notify: 1,
      quantity: 1,
      total_count: 12,
      addons: [],
      notes: {},
    };

    const subscription = await instance.subscriptions.create(options);
    console.log("✅ Subscription Created:", subscription.id);

    console.log('rowwwww', email);
    // ✅ Write subscription ID to Google Sheet
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, "../config/sheet.json"),
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1Vb9L79fRSQG_WuxtUEe4XjN4Kp_ly3mA6gN66UjzquU";

    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Paid Members!A:Z",
    });
    const rows = getRows.data.values;
    const headerRow = rows[0];
    const emailColIndex = headerRow.indexOf("Email");
    const subscriptionIdColIndex = headerRow.indexOf("Subscription ID");

    const userRowIndex = rows.findIndex((row, index) => {
      if (index === 0) return false; // skip header
      return row[emailColIndex] === email;
    });

    if (userRowIndex === -1) {
      return res.status(404).json({ msg: "❌ Email not found in sheet" });
    }

    // Update cell with subscription ID
    const cellToUpdate = `${String.fromCharCode(65 + subscriptionIdColIndex)}${userRowIndex + 1}`;
    await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Paid Members!${cellToUpdate}`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[subscription.id]],
      },
    });

    console.log(`✅ Updated Google Sheet cell ${cellToUpdate} with subscription ID`);

    res.json({
      message: "Subscription created and written to sheet",
      subscription_id: subscription.id,
    });
  } catch (error) {
    console.log("🔥 Error in /subscriptions:", error);
    res.status(500).send("Error creating subscription");
  }
});


router.post("/success", async (req, res) => {
  console.log("📝 Full request body:", req.body);
  const { razorpay_payment_id, razorpay_signature, email } = req.body;

  if (!razorpay_payment_id || !razorpay_signature || !email) {
    return res.status(400).json({ msg: "❌ Missing required fields!" });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, "../config/sheet.json"),
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1Vb9L79fRSQG_WuxtUEe4XjN4Kp_ly3mA6gN66UjzquU";

    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Paid Members!A:Z",
    });

    const rows = getRows.data.values;
    const headerRow = rows[0];
    const emailColIndex = headerRow.indexOf("Email");
    const subscriptionIdColIndex = headerRow.indexOf("Subscription ID");

    const userRow = rows.find(row => row[emailColIndex] === email);

    if (!userRow || !userRow[subscriptionIdColIndex]) {
      return res.status(400).json({ msg: "❌ Subscription ID not found in sheet!" });
    }

    const storedSubscriptionId = userRow[subscriptionIdColIndex];
    console.log("✅ Fetched Subscription ID from sheet:", storedSubscriptionId);

    // ✅ Signature verification
    const secret = process.env.RAZORPAY_SECRET;
    const payload = `${razorpay_payment_id}|${storedSubscriptionId}`;
    const sha = crypto.createHmac("sha256", secret);
    sha.update(payload);
    const generated_signature = sha.digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res
        .status(400)
        .json({ msg: "❌ Signature Mismatch! Verification failed." });
    }

    console.log("✅ Payment Verified Successfully!");
    res.json({
      msg: "✅ Success",
      subscriptionId: storedSubscriptionId,
      paymentId: razorpay_payment_id,
    });

  } catch (error) {
    console.error("🔥 Error in /success:", error);
    res.status(500).json({ msg: "❌ Internal Server Error" });
  }
});


module.exports = router;
