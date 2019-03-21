import ValidData from 'validator';
import isValueEmpty from './isValueEmpty';

const validateUserLogin = (data) => {
  const errors = {};

  /* Value passed in to data may be empty but may not be a string
     so the isValueEmpty helps us to ensure that if its empty.
     We made it an empty string so that it can be checked by the validator.isEmpty method
     This is due to the fact that validator.isEmpty can only check for empty string not empty object
  */
  data.email = isValueEmpty(data.email) === true ? '' : data.email;
  data.password = isValueEmpty(data.password) === true ? '' : data.password;


  if (!ValidData.isEmail(data.email)) {
    errors.email = 'The Email is invalid';
  }

  if (ValidData.isEmpty(data.password)) {
    errors.password = 'The Password field is required';
  }

  if (!ValidData.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }

  return {
    errors,
    isValid: isValueEmpty(errors),
  };
};

export default validateUserLogin;
