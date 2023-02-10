//Class olduğunu belli etmek için ilk harflerini büyük yaptık

class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
module.exports = CustomError;