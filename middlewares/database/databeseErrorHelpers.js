const User = require("../../models/User");
const asyncErrorWrapper = require("express-async-handler");
const CustomError = require("../../helpers/error/CustomError");

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError("There is no such user with that id", 400));
  }
  //req.data = user //bu kodu kullarak controllers -> user.js den kopyaladığımız const user=... kodunu silebilirsiniz 
  next();
});
module.exports = { checkUserExist };
