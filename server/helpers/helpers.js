import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ValidData from 'validator';
import isValueEmpty from './isValueEmply';

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  // confirmPassword(password, confirmPassword) {
  //   if (password === confirmPassword) return 'psitive';
  // },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign({
      userId: id,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },

  validateCreateUser(data) {
    const errors = {};
    /* Value passed in to data may be empty but may not be a string
       so the isValueEmpty helps us to ensure that if its empty.
       We made it an empty string so that it can be checked by the validator.isEmpty method
   This is due to the fact that validator.isEmpty can only check for empty string not empty object
    */
    if (isValueEmpty(data.email) || !ValidData.isEmail(data.email)) { errors.email = 'The Email is invalid'; }
    if (isValueEmpty(data.firstname) || !ValidData.isLength(data.firstname, { min: 2, max: 30 })) {
      errors.firstname = 'Firstname must be between 2 and 30 characters'; 
    }
    if (isValueEmpty(data.firstname) || !ValidData.isAlpha(data.firstname)) { errors.firstname = 'Firstname must be only alphabets'; }
    if (isValueEmpty(data.lastname) || !ValidData.isAlpha(data.lastname)) { errors.lastname = 'Lastname must be only alphabets'; }
    if (isValueEmpty(data.lastname) || ValidData.isEmpty(data.lastname) || !ValidData.isLength(data.lastname, { min: 2, max: 30 })) {
      errors.lastname = 'Lastname must be between 2 and 30 characters';
    }
    if (ValidData.isEmpty(data.password)) { errors.password = 'The Password field is required'; }
    if (!ValidData.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = 'Password must be between 8 and 30 characters';
    }
    if (isValueEmpty(data.mobile) || !ValidData.isMobilePhone(data.mobile, 'en-NG')) {
      errors.mobile = 'Mobile number must be a Nigerian';
    }
    if (isValueEmpty(data.confirmPassword)) { errors.confirmPassword = 'Confirm password field is required'; }
    if (!ValidData.equals(data.password, data.confirmPassword)) { errors.confirmPassword = 'Your password does not match'; }
    return { errors, isValid: isValueEmpty(errors) };
  },
  validateUserLogin(data) {
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
  },

};

export default Helper;
