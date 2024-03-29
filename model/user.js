const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  first_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  phoneNumber: {type: Number},
  age: {type: Number},
  gender: {type: String},
  type:{type: String},
  token: { type: String },
});

module.exports = model("user", userSchema);