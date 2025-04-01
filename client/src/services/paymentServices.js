import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function handleSubscription(formData) {
  console.log("aqsa 2");
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Failed to load Razorpay SDK.");
    return;
  }
  const result = await axios.post("/payment/subscriptions", { user: formData });
  console.log("aqsa 2", result);

  if (!result) {
    alert("Server error. Try again later.");
    return;
  }
  console.log("aqsa 3", result);

  const razorpay_key_id =
    process.env.ENV === "live"
      ? process.env.REACT_APP_RAZORPAY_LIVE_KEY_ID
      : process.env.REACT_APP_RAZORPAY_KEY_ID;
  const options = {
    key: razorpay_key_id,
    subscription_id: result.data.subscription_id,
    name: "Go Girl Community",
    description: "Community Subscription",
    prefill: {
      name: formData.name,
      email: formData.email,
      contact: formData.whatsapp,
    },
    theme: { color: "#61dafb" },
    handler: async function (response) {
      console.log("🔹 Razorpay Response:", response);
      const data = {
        subscription_id: response.razorpay_subscription_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        email: formData.email,
      };
      await axios.post("/payment/success", data);
      alert("Subscription successful!");
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
