const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: 'https://gogirlcommunity.netlify.app',
    methods: ['GET', 'POST'],
    credentials: true
  }));
app.use(express.json({ extended: false }));
app.use("/payment", require("./routes/payment"));
app.use(require("./routes/addMembersInfo"));

app.listen(port, () => console.log(`server started on port ${port}`));
