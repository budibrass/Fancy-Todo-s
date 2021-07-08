const { compareSync } = require("bcryptjs");
const express = require("express");
const route = express.Router();
const userRoute = require("./userRoute");
const todoRoute = require("./todoRoute");

route.use("/user", userRoute);
route.use("/todo", todoRoute);

module.exports = route;