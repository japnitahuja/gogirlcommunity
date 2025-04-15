import React, { useState } from "react";
import "./UserInfo.css";
import logo from "../../assets/logo.svg";
import axios from "axios";
import { handleSubscription } from "../../services/paymentServices";



const UserInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    organization: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // plan_PVy9D4lCuE3rHA
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
    if (validateForm()) {
      try {
        const sheetsResponse = await axios.post(
          "https://gogirlcommunity.onrender.com/add-info",
          formData, 
          { headers: { "Content-Type": "application/json" } }
        );
  
        console.log("Google Sheets API Response:", sheetsResponse.data);
        await handleSubscription(formData);
        console.log('hi happening');
      } catch (error) {
        console.error("Error submitting data", error);
        alert("Submission failed. Please try again.");
      }
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
        <button type="submit">Subscribe to community</button>
      </form>
    </div>
  );
};

export default UserInfo;