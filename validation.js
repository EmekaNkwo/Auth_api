const Joi = require("@hapi/joi");

//Register Validation with Joi
const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(4).max(255).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  next();
};

// const registerValidation = (req, res, next) => {
//   const schema = Joi.object({
//     email: Joi.string().min(6).required().email,
//     password: Joi.string().min(4).required(),
//   });
//   const { error } = schema.validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   next();
// };

// Validate login with username and password with joi
const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(4).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
