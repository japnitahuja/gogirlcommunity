import React from "react";
import axios from "axios";

function RazorpayPayment({ type }) {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handlePayment(isSubscription = false) {
    console.log("Button clicked");

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const apiEndpoint = isSubscription
      ? "payment/subscriptions"
      : "payment/orders";
    const result = await axios.post(apiEndpoint);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    console.log("API response:", result.data);

    let razorpay_key =
      process.env.REACT_APP_ENV === "live"
        ? process.env.REACT_APP_RAZORPAY_LIVE_KEY_ID
        : process.env.REACT_APP_RAZORPAY_KEY_ID;
    console.log("aqsa razorpay key", razorpay_key);
    const options = {
      key: razorpay_key,
      name: "Acme Corp.",
      description: isSubscription ? "Monthly Test Plan" : "Test Transaction",
      image: "/your_logo.jpg",
      theme: { color: "#61dafb" },
      handler: async function (response) {
        const data = {
          orderCreationId: result.data.id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: isSubscription
            ? response.razorpay_subscription_id
            : response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        console.log("Payment Data:", data);
        const successResult = await axios.post("payment/success", data);
        alert(successResult.data.msg);
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "+919876543210",
      },
      notes: {
        address: "Corporate Office",
      },
    };

    if (isSubscription) {
      options.subscription_id = result.data.id;
    } else {
      options.amount = result.data.amount.toString();
      options.currency = result.data.currency;
      options.order_id = result.data.id;
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <button className="pay-button" onClick={() => handlePayment(false)}>
        Pay ₹500
      </button>
      <br />
      <button className="pay-button" onClick={() => handlePayment(true)}>
        Subscribe
      </button>
    </>
  );
}

export default RazorpayPayment;
