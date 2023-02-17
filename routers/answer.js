const express = require("express");
//Burası alt sınıf olduu için question id direk gelemiyor. Biz de burda da kullanmak için mergeParams ifadesini ekledik 
const router = express.Router({ mergeParams: true });

router.get("/", (req, res, next) => {
  console.log(req.params);
  res.send("Answers Route");
});

module.exports = router;
