const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }

  /*if (validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }*/
  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters.";
  }

  //console.log({ errors, isValid: isEmpty(errors) });
  console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
