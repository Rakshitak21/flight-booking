const express = require("express");

const routes = express.Router();

routes.post("/userdata", (req, res) => {
  res.json({ isDone: true, endpoint: "/userdata", user: req.user });
});

module.exports = routes;
