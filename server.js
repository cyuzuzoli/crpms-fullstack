const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cars", require("./routes/car"));
app.use("/api/services", require("./routes/services"));
app.use("/api/records", require("./routes/serviceRecord"));
app.use("/api/payments", require("./routes/payment"));

// SERVE REACT BUILD
app.use(express.static(path.join(__dirname, "build")));

// EXPRESS v5 SAFE CATCH-ALL
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
