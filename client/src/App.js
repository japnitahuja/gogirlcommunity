import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import RazorpayPayment from "./components/RazorpayPayment";
import { UserInfo } from "./components/UserInfo";

function App() {
  return (
    <div className="App flex-container">
      <header className="flex-container">
        <p>Welcome to Go Girl Community!</p>
        <UserInfo />
        {/* <RazorpayPayment /> */}
      </header>
    </div>
  );
}

export default App;
