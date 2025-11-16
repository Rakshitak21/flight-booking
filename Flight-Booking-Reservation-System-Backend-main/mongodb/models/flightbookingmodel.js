const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FlightBookingSchema = new Schema({
  flightId: { type: String, unique: false, required: true },
  userId: { type: String, unique: false, required: true },
  username: { type: String, unique: false, required: true },
  isEconomyClass: {
    type: Boolean,
    unique: false,
    required: true,
  },
  economyClassTickets: {
    type: Number,
    unique: false,
    required: false,
  },
  economyClassTicketCost: {
    type: Number,
    unique: false,
    required: false,
  },

  isBusinessClass: {
    type: Boolean,
    unique: false,
    required: true,
  },
  businessClassTickets: {
    type: Number,
    unique: false,
    required: false,
  },
  businessClassTicketCost: {
    type: Number,
    unique: false,
    required: false,
  },

  isFirstClass: {
    type: Boolean,
    unique: false,
    required: true,
  },
  firstClassTickets: {
    type: Number,
    unique: false,
    required: false,
  },
  firstClassTicketCost: {
    type: Number,
    unique: false,
    required: false,
  },

  totalCost: {
    type: Number,
    unique: false,
    required: true,
  },
});

const FlightBookingModel = mongoose.model(
  "flight-bookings",
  FlightBookingSchema
);

module.exports = FlightBookingModel;
