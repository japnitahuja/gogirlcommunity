import React, { useState } from "react";
import "./UserInfo.css";
import { handleSubscription } from "../../services/paymentServices";
import api from "../../api";
import PaymentSuccessModal from "../payment-success-modal/PaymentSuccessModal";

const UserInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    organization: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter Name";
    if (!formData.email.trim()) newErrors.email = "Please enter Email";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "Please enter WhatsApp";
    if (!formData.organization.trim())
      newErrors.organization = "Please enter College/Company";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 1) Add member info
      await api.post("/add-info", formData, {
        headers: { "Content-Type": "application/json" },
      });

      // 2) Launch Razorpay & wait for payment success
      const paymentResult = await handleSubscription(formData);

      // 3) On successful transaction, capture details and show modal
      if (paymentResult.msg === "✅ Success") {
        setPaymentInfo({
          subscriptionId: paymentResult.subscriptionId,
          paymentId: paymentResult.paymentId,
        });
        setFormData({ name: "", email: "", whatsapp: "", organization: "" });
        setErrors({});
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error submitting data", error);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex-container">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="flex-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="flex-container">
          <label>WhatsApp Number:</label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="Enter your WhatsApp number"
          />
          {errors.whatsapp && <p className="text-red-500">{errors.whatsapp}</p>}
        </div>

        <div className="flex-container">
          <label>College/Company:</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="Enter your college/company name"
          />
          {errors.organization && (
            <p className="text-red-500">{errors.organization}</p>
          )}
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? <div className="css-spinner" /> : "Subscribe to community"}
        </button>
        <div className="payment-info-banner">
          <p>
            💡 Your ₹5 trial fee will be refunded. Regular subscription of
            ₹100/month starts from your second month. Cancel anytime. ❤️
          </p>
        </div>
      </form>

      <PaymentSuccessModal
        show={showModal}
        subscriptionId={paymentInfo?.subscriptionId}
        paymentId={paymentInfo?.paymentId}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default UserInfo;
