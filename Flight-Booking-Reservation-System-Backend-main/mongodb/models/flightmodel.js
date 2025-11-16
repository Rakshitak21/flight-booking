const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  name: { type: String, unique: false, required: true },
  departureDate: { type: String, unique: false, required: true },
  departureTime: { type: String, unique: false, required: true },
  returnDate: { type: String, unique: false, required: true },
  returnTime: { type: String, unique: false, required: true },
  routeSource: {
    type: String,
    unique: false,
    required: true,
  },
  routeDestination: {
    type: String,
    unique: false,
    required: true,
  },

  flightDuration: {
    type: String,
    unique: false,
    required: true,
  },

  isEconomyClass: {
    type: Boolean,
    unique: false,
    required: true,
  },
  economyClassTicketCost: {
    type: Number,
    unique: false,
    required: false,
  },
  economyClassTotalSeats: {
    type: Number,
    unique: false,
    required: false,
  },
  economyClassRemainingSeats: {
    type: Number,
    unique: false,
    required: false,
  },

  isBusinessClass: {
    type: Boolean,
    unique: false,
    required: true,
  },
  businessClassTicketCost: {
    type: Number,
    unique: false,
    required: false,
  },
  businessClassTotalSeats: {
    type: Number,
    unique: false,
    required: false,
  },
  businessClassRemainingSeats: {
    type: Number,
    unique: false,
    required: false,
  },

  isFirstClass: {
    type: Boolean,
    unique: false,
    required: true,
  },
  firstClassTicketCost: {
    type: Number,
    unique: false,
    required: false,
  },
  firstClassTotalSeats: {
    type: Number,
    unique: false,
    required: false,
  },
  firstClassRemainingSeats: {
    type: Number,
    unique: false,
    required: false,
  },
});

const FlightModel = mongoose.model("flights", FlightSchema);

module.exports = FlightModel;
