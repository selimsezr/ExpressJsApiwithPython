const express = require("express");
const router = express.Router();
const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const { blockUser, deleteUser } = require("../controllers/admin");
const {
  checkUserExist,
} = require("../middlewares/database/databeseErrorHelpers");
//Block User and Delete User
router.use([getAccessToRoute, getAdminAccess]); //Tüm routlerda geçerli

router.get("/block/:id", checkUserExist, blockUser);
router.delete("/user/:id", checkUserExist, deleteUser);
module.exports = router;
