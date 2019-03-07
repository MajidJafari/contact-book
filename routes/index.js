var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render('index', { title: "Express" });
});

router.post("/", (req, res) => {
  const body = req.body;
  const username = body.username;
  const hashedPassword = body.password;

  if(username === "admin" && hashedPassword === "123456") {
    res.json({success: true});
  }
  else if(!username){
    res.json({success: false, message: "username is mandatory"});
  }
  else if (!hashedPassword) {
    res.json({success: false, message: "password is mandatory"});
  }
  else {
    res.json({success: false, message: "username or password is wrong"});
  }
});

module.exports = router;
