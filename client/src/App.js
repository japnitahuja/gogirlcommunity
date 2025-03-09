import React, { useState } from "react";
import "./App.css";
import axios from "axios";
// Import your logos
// You'll need to add these to your assets folder
import ggLogo from "./assets/gg-logo.png";
import instagramLogo from "./assets/instagram-logo.svg";
import expediaLogo from "./assets/expedia.png";
import googleLogo from "./assets/google.png";
import amazonLogo from "./assets/amazon.png";
import bnyLogo from "./assets/bny.png";
import microsoftLogo from "./assets/microsoft.png";
import communityImage from "./assets/community-members.jpeg";

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
            description: "One Month Free Trial",
            image: ggLogo,
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
                contact: "",
            },
            notes: {
                address: "Go Girl! Community Headquarters",
            },
            theme: {
                color: "#b19cd9",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="landing-page">
            <div className="page-content">
                <header>
                    <div className="logo-container">
                        <img src={ggLogo} alt="Go Girl Community" className="gg-logo" />
                    </div>
                    <div className="social-links">
                        <a href="https://www.instagram.com/thegogirlcommunity/" target="_blank" rel="noopener noreferrer">
                            <img src={instagramLogo} alt="Instagram" className="instagram-icon" />
                        </a>
                    </div>
                </header>

                <main>
                    <div className="left-section">
                        <h1 className="main-heading">Join the<br />Community</h1>
                        <p className="promo-text">Claim your One Month<br />Free Trial now!</p>
                        <div className="community-image-container">
                            <img src={communityImage} alt="Community members" className="community-image" />
                        </div>
                    </div>

                    <div className="right-section">
                        <div className="signup-form-wrapper">
                            <h2 className="form-heading">Sign up <span className="here-text">here</span>.</h2>
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
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone No."
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
                </main>

                <footer>
                    <p className="companies-text">join members from companies like</p>
                    <div className="company-logos">
                        <img src={expediaLogo} alt="Expedia Group" className="company-logo" />
                        <img src={googleLogo} alt="Google" className="company-logo" />
                        <img src={amazonLogo} alt="Amazon" className="company-logo" />
                        <img src={bnyLogo} alt="BNY" className="company-logo" />
                        <img src={microsoftLogo} alt="Microsoft" className="company-logo" />
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;