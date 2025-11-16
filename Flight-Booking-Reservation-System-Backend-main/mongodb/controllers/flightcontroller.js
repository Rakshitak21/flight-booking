const FlightModel = require("../models/flightmodel");

// Get all flights
const getFlights = async (filters) => {
  try {
    const data = await FlightModel.find(filters);
    return {
      isDone: true,
      isError: false,
      data: data,
    };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

// Add New Flight
const addFlight = async (flightdata) => {
  try {
    const data = await FlightModel.insertMany([flightdata]);
    return { isDone: true, isError: false, data: data };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

// Find flight by id
const findFlightById = async (flightId) => {
  try {
    const data = await FlightModel.find({ id: flightId });

    return { isDone: true, isError: false, data: data };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

module.exports = {
  getFlights,
  addFlight,
  findFlightById,
};
