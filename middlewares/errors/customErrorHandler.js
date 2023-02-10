const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = (err, req, res, next) => {
    let customError = err;
    console.log(customError.message, customError.status)

    if (customError.name === 'SyntaxError') {
        customError = new CustomError("Unexpected syntax error", 400);
    }
    if (customError.name === 'validationError') {
        customError = new CustomError(err.message, 400);
    }
    res
    .status(customError.status || 500)
    .json({
        success: false,
        message: customError.message 
    });
};

module.exports = customErrorHandler;