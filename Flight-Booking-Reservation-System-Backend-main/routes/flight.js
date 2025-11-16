const express = require("express");
const {
  getFlights,
  addFlight,
} = require("../mongodb/controllers/flightcontroller");

const {
  addFlightBookings,
  getFlightBookingsById,
} = require("../mongodb/controllers/flightbookingcontroller");

const routes = express.Router();

// Get all flights
routes.post("/getflights", async (req, res) => {
  const result = await getFlights(req.body.filters);
  res.json(result);
});

// Add new Flights
routes.post("/addflight", async (req, res) => {
  const data = req.body.data;

  // if (req.user.role === process.env.ADMIN) {
  const result = await addFlight(data);
  res.json(result);
  // } else {
  //   res.json({ isDone: false, isError: true, err: "Permission Denied" });
  // }
});

// Add new flight booking
routes.post("/booking/newbooking", async (req, res) => {
  const data = req.body.data;
  data["userId"] = req.user.id;
  data["username"] = req.user.username;

  const result = await addFlightBookings(data);
  res.json(result);
});

// Add new flight booking
routes.post("/booking/getbookings", async (req, res) => {
  const userId = req.user.id;

  const result = await getFlightBookingsById(userId);
  res.json(result);
});

module.exports = routes;
