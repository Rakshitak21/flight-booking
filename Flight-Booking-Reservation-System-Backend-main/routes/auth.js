const express = require("express");
const { json } = require("express/lib/response");
const { generateAccessToken } = require("../helpingfunctions/jwt");

const {
  isUserPresent,
  createUser,
  validateUser,
} = require("../mongodb/controllers/usercontroller");

const route = express.Router();

route.post("/signup", async (req, res) => {
  const isPresent = await isUserPresent(req.body.username);

  if (isPresent)
    return res
      .status(406)
      .json({ isDone: false, isError: true, msg: "Username Already Exist" });

  const data = await createUser(req.body);
  return res.json(data);
});

route.post("/login", async (req, res) => {
  const data = await validateUser(req.body.username, req.body.password);

  if (data.isError) {
    return res.json(data);
  }

  if (!data.isAuthorized) {
    return res.json({ ...data, msg: "Please enter valid password" });
  }

  // Generating JWT token
  const userdata = {
    id: data.data._id,
    username: data.data.username,
    email: data.data.email,
    role: data.data.role,
    name: data.data.name,
  };

  const token = generateAccessToken(userdata);

  return res.json({
    isDone: true,
    isError: false,
    token: token,
    id: data.data._id,
    username: data.data.username,
    email: data.data.email,
    role: data.data.role,
    name: data.data.name,
  });
});

module.exports = route;
