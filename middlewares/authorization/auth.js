const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const question = require("../../models/Question");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");
const Question = require("../../models/Question");

const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;
  if (!isTokenIncluded(req)) {
    //401 Unauthorized hatası: Auth işleminde hata olduğğu zaman yazılır
    //403 Forbidden hatası: Yasaklı bir yere erişim yapıldığı zaman yazılır. Örn: admin yerine girilmeye çalışılması gibi
    return next(
      new CustomError("You are not authorized to access this page.", 401)
    );
  }
  const access_token = getAccessTokenFromHeader(req);
  jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this route", 401)
      );
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    console.log(decoded);
    next();
  });
};
const getAdminAccess = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (user.role !== "admin") {
    return next(
      new CustomError("You are not authorized to access this route", 403)
    );
  }
  next();
});
const getQuestionOwnerAccess = asyncErrorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;
  const question = await Question.findById(questionId);

  if (question.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  next();
});
module.exports = { getAccessToRoute, getAdminAccess, getQuestionOwnerAccess };
