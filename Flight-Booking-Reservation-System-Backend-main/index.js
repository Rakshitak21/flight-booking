const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const uuid = require("uuid");
// Constants
const app = express();
const port = process.env.PORT || 3001;

// Config
dotenv.config();

// DB Connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connecting", function () {
  console.log("connecting to MongoDB...");
});

db.on("error", function (error) {
  console.error("Error in MongoDb connection: " + error);
  mongoose.disconnect();
});

db.on("connected", function () {
  console.log("MongoDB connected!");
});

db.once("open", function () {
  console.log("MongoDB connection opened!");
});

db.on("reconnected", function () {
  console.log("MongoDB reconnected!");
});

db.on("disconnected", function () {
  console.log("MongoDB disconnected!");
  mongoose.connect(process.env.MONGODB_URL, {
    server: { auto_reconnect: true },
  });
});
mongoose.connect(process.env.MONGODB_URL, { server: { auto_reconnect: true } });

// Components
const authroute = require("./routes/auth");
const userroute = require("./routes/user");
const flightroute = require("./routes/flight");

const { authenticateToken } = require("./helpingfunctions/jwt");

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authroute);
app.use("/user", authenticateToken, userroute);
app.use("/flight", authenticateToken, flightroute);

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Base path for API" });
});

// Starting
app.listen(port, () => {
  console.log(`Server stated listeling on port ${port}`);
});
