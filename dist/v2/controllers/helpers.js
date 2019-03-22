"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _validator = _interopRequireDefault(require("validator"));

var _isValueEmply = _interopRequireDefault(require("./isValueEmply"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword: function hashPassword(password) {
    return _bcryptjs.default.hashSync(password, _bcryptjs.default.genSaltSync(10));
  },

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcryptjs.default.compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail: function isValidEmail(email) {
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
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken.default.sign({
      userId: id
    }, process.env.SECRET, {
      expiresIn: '7d'
    });

    return token;
  },
  validateCreateUser: function validateCreateUser(data) {
    var errors = {};
    /* Value passed in to data may be empty but may not be a string
       so the isValueEmpty helps us to ensure that if its empty.
       We made it an empty string so that it can be checked by the validator.isEmpty method
       This is due to the fact that validator.isEmpty can only check for empty string not empty object
    */

    if ((0, _isValueEmply.default)(data.email) || !_validator.default.isEmail(data.email)) {
      errors.email = 'The Email is invalid';
    }

    if ((0, _isValueEmply.default)(data.firstname) || !_validator.default.isLength(data.firstname, {
      min: 2,
      max: 30
    })) {
      errors.firstname = 'Firstname must be between 2 and 30 characters';
    }

    if ((0, _isValueEmply.default)(data.firstname) || !_validator.default.isAlpha(data.firstname)) {
      errors.firstname = 'Firstname must be only alphabets';
    }

    if ((0, _isValueEmply.default)(data.lastname) || !_validator.default.isAlpha(data.lastname)) {
      errors.lastname = 'Lastname must be only alphabets';
    }

    if ((0, _isValueEmply.default)(data.lastname) || _validator.default.isEmpty(data.lastname) || !_validator.default.isLength(data.lastname, {
      min: 2,
      max: 30
    })) {
      errors.lastname = 'Lastname must be between 2 and 30 characters';
    }

    if (_validator.default.isEmpty(data.password)) {
      errors.password = 'The Password field is required';
    }

    if (!_validator.default.isLength(data.password, {
      min: 8,
      max: 30
    })) {
      errors.password = 'Password must be between 8 and 30 characters';
    }

    if ((0, _isValueEmply.default)(data.mobile) || !_validator.default.isMobilePhone(data.mobile, 'en-NG')) {
      errors.mobile = 'Mobile number must be a Nigerian';
    }

    if ((0, _isValueEmply.default)(data.confirmPassword)) {
      errors.confirmPassword = 'Confirm password field is required';
    }

    if (!_validator.default.equals(data.password, data.confirmPassword)) {
      errors.confirmPassword = 'Your password does not match';
    }

    return {
      errors: errors,
      isValid: (0, _isValueEmply.default)(errors)
    };
  },
  validateUserLogin: function validateUserLogin(data) {
    var errors = {};
    /* Value passed in to data may be empty but may not be a string
     so the isValueEmpty helps us to ensure that if its empty.
     We made it an empty string so that it can be checked by the validator.isEmpty method
     This is due to the fact that validator.isEmpty can only check for empty string not empty object
    */

    data.email = (0, _isValueEmply.default)(data.email) === true ? '' : data.email;
    data.password = (0, _isValueEmply.default)(data.password) === true ? '' : data.password;

    if (!_validator.default.isEmail(data.email)) {
      errors.email = 'The Email is invalid';
    }

    if (_validator.default.isEmpty(data.password)) {
      errors.password = 'The Password field is required';
    }

    if (!_validator.default.isLength(data.password, {
      min: 8,
      max: 30
    })) {
      errors.password = 'Password must be between 8 and 30 characters';
    }

    return {
      errors: errors,
      isValid: (0, _isValueEmply.default)(errors)
    };
  }
};
var _default = Helper;
exports.default = _default;