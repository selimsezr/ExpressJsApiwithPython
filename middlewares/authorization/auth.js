const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");

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
module.exports = { getAccessToRoute };
