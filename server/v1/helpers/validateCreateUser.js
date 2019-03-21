import ValidData from 'validator';
import isValueEmpty from './isValueEmpty';

const validateCreateUser = (data) => {
  const errors = {};

  /* Value passed in to data may be empty but may not be a string
     so the isValueEmpty helps us to ensure that if its empty.
     We made it an empty string so that it can be checked by the validator.isEmpty method
     This is due to the fact that validator.isEmpty can only check for empty string not empty object
  */

  if (isValueEmpty(data.email) || !ValidData.isEmail(data.email)) {
    errors.email = 'The Email is invalid';
  }

  if (isValueEmpty(data.firstname)
  || !ValidData.isLength(data.firstname, { min: 2, max: 30 })) {
    errors.firstname = 'Firstname must be between 2 and 30 characters';
  }

  if (isValueEmpty(data.firstname) || !ValidData.isAlpha(data.firstname)) {
    errors.firstname = 'Firstname must be only alphabets';
  }

  if (isValueEmpty(data.lastname) || !ValidData.isAlpha(data.lastname)) {
    errors.lastname = 'Lastname must be only alphabets';
  }
  if (isValueEmpty(data.lastname)
  || ValidData.isEmpty(data.lastname)
  || !ValidData.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Lastname must be between 2 and 30 characters';
  }

  if (ValidData.isEmpty(data.password)) {
    errors.password = 'The Password field is required';
  }

  if (!ValidData.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = 'Password must be between 8 and 30 characters';
  }

  if (isValueEmpty(data.mobile) || !ValidData.isMobilePhone(data.mobile, 'en-NG')) {
    errors.mobile = 'Mobile number must be a Nigerian';
  }

  if (isValueEmpty(data.rpassword)) {
    errors.rpassword = 'Confirm password field is required';
  }

  if (!ValidData.equals(data.password, data.rpassword)) {
    errors.rpassword = 'Your password does not match';
  }

  return {
    errors,
    isValid: isValueEmpty(errors),
  };
};

export default validateCreateUser;
