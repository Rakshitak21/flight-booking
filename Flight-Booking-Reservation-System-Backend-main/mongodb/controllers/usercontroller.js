const UserModel = require("../models/usermodel");
const {
  encryptPassword,
  comparePassword,
} = require("../../helpingfunctions/bcrypt");

// Get User
const getUsers = async () => {
  try {
    const data = await UserModel.find({});
    return {
      isDone: true,
      isError: false,
      data: data,
    };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

const getUserByUsername = async (username) => {
  try {
    const data = await UserModel.find({ username: username });
    return {
      isDone: true,
      isError: false,
      data: data,
    };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

// Create New User
const createUser = async (userdata) => {
  try {
    const password = userdata.password;
    const hashedData = await encryptPassword(password);

    if (hashedData.isError) {
      return hashedData;
    }

    userdata.password = (await hashedData).hashedPassword;

    const data = await UserModel.insertMany([userdata]);
    return { isDone: true, isError: false, data: data };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

// Validate User by password
const validateUser = async (username, password) => {
  try {
    const data = await UserModel.find({ username: username });

    if (data.length == 0) {
      return {
        isDone: false,
        isError: true,
        msg: "Please enter valid username",
      };
    }

    const compareData = await comparePassword(password, data[0].password);

    if (compareData.isError) {
      return compareData;
    }

    if (!compareData.isAuthorized) {
      return compareData;
    }

    return {
      ...compareData,
      data: data[0],
    };
  } catch (err) {
    return { isDone: false, isError: true, err: err };
  }
};

// Other Supportive Methods
const isUserPresent = async (username) => {
  const data = await UserModel.find({ username: username });

  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserByUsername,
  isUserPresent,
  validateUser,
};
