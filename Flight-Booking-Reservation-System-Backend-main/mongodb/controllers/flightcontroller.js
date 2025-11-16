// Get all flights
const getFlights = async (filters) => {
  try {
    let query = {};

    // Required filters
    if (filters.routeSource) query.routeSource = filters.routeSource;
    if (filters.routeDestination) query.routeDestination = filters.routeDestination;
    if (filters.departureDate) query.departureDate = filters.departureDate;

    // Only include returnDate if it exists and is not empty
    if (filters.returnDate && filters.returnDate.trim() !== "") {
      query.returnDate = filters.returnDate;
    }

    // Class filter
    if (filters.isEconomyClass !== undefined) {
      query.isEconomyClass = filters.isEconomyClass;
    }

    const data = await FlightModel.find(query);

    return {
      isDone: true,
      isError: false,
      data: data,
    };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};
