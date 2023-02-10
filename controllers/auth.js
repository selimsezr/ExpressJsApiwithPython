const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req, res, next) => {
  console.log(req.body);
  const { name, email, password, role } = req.body;
  const user = await User.create({
    name,//ES7 ile birlikte name: name yazmamıza gerek kalmıyor
    email,
    password,
    role
  });
  res.status(200).json({
    success: true,
    data: user,
  });
});
const errorTest = (req, res, next) => {
  throw new CustomError("Bir hata oluştu", 400);
};
module.exports = {
  register,
  errorTest,
};
