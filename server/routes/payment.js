require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

router.post("/orders", async (req, res) => {
try {

    console.log(process.env.ENV);

    if (process.env.ENV == "live") {
      var razorpay_key = process.env.RAZORPAY_LIVE_KEY_ID;
      var razorpay_secret = process.env.RAZORPAY_LIVE_SECRET;
    } else {
      var razorpay_key = process.env.RAZORPAY_KEY_ID;
      var razorpay_secret = process.env.RAZORPAY_SECRET;
    }

    console.log(`key_id: ${razorpay_key}, key_secret: ${razorpay_secret}`);

    const instance = new Razorpay({
        key_id: razorpay_key,
        key_secret: razorpay_secret,
    });

    const options = {
        amount: 500, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    console.log(order);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
} catch (error) {
    res.status(500).send(error);
}
});

router.post("/subscriptions", async (req, res) => {
  try {
  
      console.log(process.env.ENV);
  
      if (process.env.ENV == "live") {
        var razorpay_key = process.env.RAZORPAY_LIVE_KEY_ID;
        var razorpay_secret = process.env.RAZORPAY_LIVE_SECRET;
      } else {
        var razorpay_key = process.env.RAZORPAY_KEY_ID;
        var razorpay_secret = process.env.RAZORPAY_SECRET;
      }
  
      console.log(`key_id: ${razorpay_key}, key_secret: ${razorpay_secret}`);
  
      const instance = new Razorpay({
          key_id: razorpay_key,
          key_secret: razorpay_secret,
      });

      const oneMonthFromNow = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60);
  
      const options = {
        plan_id: "plan_PvSXyQU8VoL6zb",
        customer_notify: 1,
        quantity: 1,
        total_count: 12,
        start_at: oneMonthFromNow,
        addons: [
        ],
        notes: {
          key1: "value3",
          key2: "value2"
        }
      }

      const subscription = await instance.subscriptions.create(options);
  
      console.log(subscription);
  
      if (!subscription) return res.status(500).send("Some error occured");
  
      res.json(subscription);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
  });

router.post("/success", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderAmount } =
      req.body;

    console.log("req body", req.body);

    console.log("other")
    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature, orderAmount);
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    if (process.env.ENV == "live") {
      var razorpay_key = process.env.RAZORPAY_LIVE_KEY_ID;
      var razorpay_secret = process.env.RAZORPAY_LIVE_SECRET;
    } else {
      var razorpay_key = process.env.RAZORPAY_KEY_ID;
      var razorpay_secret = process.env.RAZORPAY_SECRET;
    }

    // const instance = new Razorpay({
    //   key_id: razorpay_key,
    //   key_secret: razorpay_secret,
    // });

    // instance.payments.capture(razorpay_payment_id, orderAmount, "INR")
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });

module.exports = router;
