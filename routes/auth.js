const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if an email exists in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hashing Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    confirm_password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
