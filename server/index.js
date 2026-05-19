const express = require("express");
const cors = require("cors");
require("dotenv").config();

const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/report", reportRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend running successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});