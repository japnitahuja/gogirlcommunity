const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: ['https://thegogirlcommunity.netlify.app', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("🚀 GoGirl Community API is running!");
});

app.use("/payment", require("./routes/payment"));
app.use(require("./routes/addMembersInfo"));

// Optional: serve frontend if applicable
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`server started on port ${port}`));
