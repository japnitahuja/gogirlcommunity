require("dotenv").config();
const { google } = require("googleapis");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json()); // Ensure the server can parse JSON requests

app.post("/add-info", async (req, res) => {
  console.log("Received data:", req.body);  
  try {

    const { name, email, whatsapp, organization } = req.body;

    if (!name || !email || !whatsapp || !organization) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!process.env.GOOGLE_SHEET_CREDENTIALS_BASE64) {
      console.error("❌ GOOGLE_SHEET_CREDENTIALS_BASE64 is missing!");
    } else {
      console.log("✅ GOOGLE_SHEET_CREDENTIALS_BASE64 is set");
    }
    
    const credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_SHEET_CREDENTIALS_BASE64, "base64").toString("utf-8")
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1Vb9L79fRSQG_WuxtUEe4XjN4Kp_ly3mA6gN66UjzquU";

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Paid Members!A:Z",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[
          "Onboarded",  // Status
          name,         // Name from form
          email,        // Email from form
          whatsapp,     // WhatsApp from form
          "waitlist, form", // Default value
          "Active",     // Default status
          "", "", "Not yet",
          new Date().toLocaleDateString(),  // Current Date
          "", "", "100",
          "Aqsa", "", "", "", 
          "Rs. 100/month for the first year, early adopter discount",
        ]],
      },
    });

    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
