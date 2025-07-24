require("dotenv").config();
const { google } = require("googleapis");
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const path = require("path");
const { start } = require("repl");

const router = express.Router();
let subscriptions = {};

router.post("/orders", async (req, res) => {
  try {
    const razorpay_key =
      process.env.ENV == "live"
        ? process.env.RAZORPAY_LIVE_KEY_ID
        : process.env.RAZORPAY_KEY_ID;
    const razorpay_secret =
      process.env.ENV == "live"
        ? process.env.RAZORPAY_LIVE_SECRET
        : process.env.RAZORPAY_SECRET;
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
  const trialDays = 30;
  const startAt = Math.floor(Date.now() / 1000) + trialDays * 24 * 60 * 60;
  try {
    const { email } = req.body.user;

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
    console.log("envssss server", process.env.ENV);
    const plan_id =
      process.env.ENV === "live"
        ? process.env.PLAN_ID
        : process.env.PLAN_ID_TEST;

    const options = {
      plan_id: plan_id,
      customer_notify: 1,
      quantity: 1,
      total_count: 12,
      start_at: startAt,
      addons: [],
      notes: {},
    };

    console.log("👉 Creating Razorpay subscription with options:", options);
    const subscription = await instance.subscriptions.create(options);
    console.log("✅ Razorpay subscription response:", subscription);
    const credentials = JSON.parse(
      Buffer.from(
        process.env.GOOGLE_SHEET_CREDENTIALS_BASE64,
        "base64"
      ).toString("utf-8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
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
      if (index === 0) return false;
      return row[emailColIndex] === email;
    });

    if (userRowIndex === -1) {
      return res.status(404).json({ msg: "❌ Email not found in sheet" });
    }

    const subscriptionLinkColIndex = headerRow.indexOf("Subscription Link");

    const rowNumber = userRowIndex + 1;
    const linkColLetter = String.fromCharCode(65 + subscriptionLinkColIndex);
    const idColLetter = String.fromCharCode(65 + subscriptionIdColIndex);

    const subscriptionLink = `https://dashboard.razorpay.com/app/subscriptions/${subscription.id}`;

    await googleSheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      resource: {
        valueInputOption: "USER_ENTERED",
        data: [
          {
            range: `Paid Members!${linkColLetter}${rowNumber}`,
            values: [[subscriptionLink]],
          },
          {
            range: `Paid Members!${idColLetter}${rowNumber}`,
            values: [[subscription.id]],
          },
        ],
      },
    });

    res.json({
      message: "Subscription created and written to sheet",
      subscription_id: subscription.id,
    });
  } catch (error) {
    console.error("🔥 Error in /subscriptions:", error);
    res.status(500).send("Error creating subscription");
  }
});

router.post("/success", async (req, res) => {
  console.log(" /success called with body:", req.body);

  const {
    subscription_id: razorpay_subscription_id,
    razorpay_payment_id,
    razorpay_signature,
    email,
  } = req.body;

  if (!razorpay_payment_id || !razorpay_signature || !email) {
    console.error(" /success missing fields:", {
      razorpay_subscription_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
    });
    return res.status(400).json({ msg: "❌ Missing required fields!" });
  }

  try {
    console.log(" Loading Google Sheets client…");
    const credentials = JSON.parse(
      Buffer.from(
        process.env.GOOGLE_SHEET_CREDENTIALS_BASE64,
        "base64"
      ).toString("utf-8")
    );
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1Vb9L79fRSQG_WuxtUEe4XjN4Kp_ly3mA6gN66UjzquU";

    console.log("📄 Fetching rows from sheet Paid Members!A:Z");
    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Paid Members!A:Z",
    });
    const rows = getRows.data.values;
    console.log(` Got ${rows.length - 1} data rows (plus header)`);
    const headerRow = rows[0];
    const emailColIndex = headerRow.indexOf("Email");
    const subscriptionIdColIndex = headerRow.indexOf("Subscription ID");
    console.log(
      " Columns – Email:",
      emailColIndex,
      "Subscription ID:",
      subscriptionIdColIndex
    );

    const userRow = rows.find((row) => row[emailColIndex] === email);
    console.log(" Lookup for email", email, "=>", userRow);

    if (!userRow || !userRow[subscriptionIdColIndex]) {
      console.error(" Subscription ID not found for email", email);
      return res
        .status(400)
        .json({ msg: " Subscription ID not found in sheet!" });
    }
    const storedSubscriptionId = userRow[subscriptionIdColIndex];
    console.log(
      "✅ Incoming razorpay_subscription_id:",
      razorpay_subscription_id
    );
    console.log("✅ Stored subscriptionId in sheet:", storedSubscriptionId);

    const secret =
      process.env.ENV === "live"
        ? process.env.RAZORPAY_LIVE_SECRET
        : process.env.RAZORPAY_SECRET;
    const payload = `${razorpay_payment_id}|${razorpay_subscription_id}`;
    console.log(" Payload for HMAC:", payload);
    const sha = crypto.createHmac("sha256", secret);
    sha.update(payload);
    const generated_signature = sha.digest("hex");
    console.log(" Generated signature:", generated_signature);
    console.log(" Received signature :", razorpay_signature);

    if (generated_signature !== razorpay_signature) {
      console.error(" Signature mismatch");
      return res
        .status(400)
        .json({ msg: " Signature Mismatch! Verification failed." });
    }

    console.log(" Signature match — success!");
    res.json({
      msg: "✅ Success",
      subscriptionId: storedSubscriptionId,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error("🔥 Error in /success handler:", error);
    res.status(500).json({ msg: "❌ Internal Server Error" });
  }
});

module.exports = router;
