const bcrypt = require("bcrypt");
const response = require("express");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");

const {
  emailValidationCheck,
  passwordValidationCheck,
} = require("../utils/validation-check");

const signUp = async (email, password, name) => {
  await emailValidationCheck(email);
  await passwordValidationCheck(password);

  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return userDao.createUser(email, hashedPassword, name);
};

module.exports = {
    signUp,
}