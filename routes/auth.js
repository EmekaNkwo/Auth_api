const router = require("express").Router();
const User = require("../model/User");

router.post("/register", (req, res) => {
  const user = new User();
});

module.exports = router;
