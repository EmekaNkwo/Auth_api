const router = require("express").Router();
const User = require("../model/User");

const { registerValidation } = require("../validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.stack });
  }
});

module.exports = router;
