const express = require("express");
const router = express.Router();
const { getSingleUser, getAllUsers } = require("../controllers/user");
const {
  checkUserExist,
} = require("../middlewares/database/databeseErrorHelpers");

router.get("/:id", checkUserExist, getSingleUser);
router.get ("/", getAllUsers);
module.exports = router;
