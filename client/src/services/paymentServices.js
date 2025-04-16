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
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Failed to load Razorpay SDK.");
    return { msg: "failed" };
  }

  const result = await axios.post("/payment/subscriptions", { user: formData });

  if (!result) {
    alert("Server error. Try again later.");
    return { msg: "failed" };
  }

  const razorpay_key_id =
    process.env.ENV === "live"
      ? process.env.REACT_APP_RAZORPAY_LIVE_KEY_ID
      : process.env.REACT_APP_RAZORPAY_KEY_ID;

  return new Promise((resolve) => {
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
        const data = {
          subscription_id: response.razorpay_subscription_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          email: formData.email,
        };
        const res = await axios.post("/payment/success", data);
        alert("Subscription successful!");
        resolve(res.data);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", () => resolve({ msg: "failed" }));
  });
}
