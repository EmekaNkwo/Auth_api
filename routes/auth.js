const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const { registerValidation, validateLogin } = require("../validation");

router.post("/register", async (req, res) => {
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

  // console.log(user);
  // return;

  try {
    const savedUser = await user.save();

    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//Login
router.post("/login", validateLogin, async (req, res) => {
  //checking if an email exists
  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Email does not exist");

  console.log(userExist);

  //checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, userExist.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  res.send("Logged in");
});

module.exports = router;
