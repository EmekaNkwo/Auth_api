const Joi = require("@hapi/joi");

//Register Validation with Joi
const registerValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email,
    password: Joi.string().min(6).required(),
    confirm_password: Joi.ref("password"),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

// Validate login with username and password with joi
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

module.exports.registerValidation = registerValidation;
module.exports.validateLogin = validateLogin;
