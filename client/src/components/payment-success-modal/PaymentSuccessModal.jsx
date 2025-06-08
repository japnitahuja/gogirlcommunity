import React from "react";
import "./PaymentSuccessModal.css";

export default function PaymentSuccessModal({
  show,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="psm-overlay" role="dialog" aria-modal="true">
      <div className="psm-modal">
        <p>Subscription Successful!</p>
                <p className="heading">
          Welcome to the{" "}</p>
          <p className="heading"><strong> Go Girl community</strong></p>
        {/* </p> */}
        <p>
          You will be added to the whatsapp group soon
        </p>

        <p>Thank you for joining. </p>
         <p> See you on the other side!</p>
        <button className="psm-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
