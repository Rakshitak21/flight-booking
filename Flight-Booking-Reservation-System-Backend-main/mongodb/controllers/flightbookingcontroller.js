const FlightBookingModel = require("../models/flightbookingmodel");

const getFlightBookings = async (id) => {
  try {
    const data = await FlightBookingModel.find({});
    return {
      isDone: true,
      isError: false,
      data: data,
    };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

const getFlightBookingsById = async (id) => {
  try {
    const data = await FlightBookingModel.find({ userId: id });
    return {
      isDone: true,
      isError: false,
      data: data,
    };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

const addFlightBookings = async (bookingData) => {
  try {
    const data = await FlightBookingModel.insertMany([bookingData]);
    return { isDone: true, isError: false, data: data };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

module.exports = {
  getFlightBookings,
  getFlightBookingsById,
  addFlightBookings,
};
