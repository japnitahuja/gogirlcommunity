import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import instagramLogo from "./assets/instagram-logo.svg";
import ggLogo from "./assets/gg-logo.png";
import expediaLogo from "./assets/expedia.png";
import googleLogo from "./assets/google.png";
import amazonLogo from "./assets/amazon.png";
import bnyLogo from "./assets/bny.png";
import microsoftLogo from "./assets/microsoft.png";
import communityLogo from "./assets/community-members.jpeg";

function App() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // You can replace this with your actual signup API endpoint
            const response = await axios.post("/api/signup", formData);
            console.log("Signup successful:", response.data);
            // After successful signup, you might want to redirect or show the payment options
            displayRazorpay();
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        console.log("button clicked");
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("payment/orders");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        console.log(process.env.REACT_APP_ENV);
        let razorpay_key;
        if (process.env.REACT_APP_ENV === "live") {
            razorpay_key = process.env.REACT_APP_RAZORPAY_LIVE_KEY_ID;
        } else {
            razorpay_key = process.env.REACT_APP_RAZORPAY_KEY_ID;
        }

        const options = {
            key: razorpay_key,
            amount: amount.toString(),
            currency: currency,
            name: "Go Girl! Community",
            description: "Monthly Subscription",
            image: { ggLogo }, // Using Go Girl logo
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    orderAmount: amount,
                };

                const result = await axios.post("payment/success", data);
                alert(result.data.msg);
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: "", // You might want to add a phone field to your form
            },
            notes: {
                address: "Go Girl! Community Headquarters",
            },
            theme: {
                color: "#b19cd9", // Matching your purple theme
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="app-container">
            <div className="main-content">
                <header className="header">
                    <div className="logo">
                        <img src={ggLogo} alt="Go Girl! Community" className="gg-logo" />
                    </div>
                    <div className="social-links">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={instagramLogo} alt="Instagram" className="instagram-icon" />
                        </a>
                    </div>
                </header>

                <div className="content-container">
                    <div className="left-content">
                        <h2 className="main-heading">Join the<br />Community</h2>
                        <p className="promo-text">Claim your One Month<br />Free Trial now!</p>
                        <div className="community-image">
                            {/* Replace with your actual community image */}
                            <img src={communityLogo} alt="Community members" />
                        </div>
                    </div>

                    <div className="right-content">
                        <div className="signup-form-container">
                            <h3 className="form-heading">Sign up <span className="highlight">here</span>.</h3>
                            <form onSubmit={handleSubmit} className="signup-form">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Company"
                                />
                                <button type="submit" className="signup-button">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="companies-section">
                    <p className="companies-text">join members from companies like</p>
                    <div className="company-logos">
                        <img src={expediaLogo} alt="Expedia" className="company-logo" />
                        <img src={googleLogo} alt="Google" className="company-logo" />
                        <img src={amazonLogo} alt="Amazon" className="company-logo" />
                        <img src={bnyLogo} alt="BNY" className="company-logo" />
                        <img src={microsoftLogo} alt="Microsoft" className="company-logo" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;