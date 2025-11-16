const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, unique: false, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  role: {
    type: String,
    unique: false,
    required: true,
    default: process.env.USER,
  },
  password: { type: String, unique: false, required: true },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
