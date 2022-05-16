const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = () => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email,
    password: Joi.string().min(6).required(),
    confirm_password: Joi.ref("password"),
  });
  return schema.validate({});
};

//Login Validation with Joi

const loginValidation = () => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email,
    password: Joi.string().min(6).required(),
  });
  return schema.validate({});
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
