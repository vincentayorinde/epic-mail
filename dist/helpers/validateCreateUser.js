"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isValueEmpty = _interopRequireDefault(require("./isValueEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateCreateUser = function validateCreateUser(data) {
  var errors = {};
  /* Value passed in to data may be empty but may not be a string
     so the isValueEmpty helps us to ensure that if its empty.
     We made it an empty string so that it can be checked by the validator.isEmpty method
     This is due to the fact that validator.isEmpty can only check for empty string not empty object
  */

  if ((0, _isValueEmpty.default)(data.email) || !_validator.default.isEmail(data.email)) {
    errors.email = 'The Email is invalid';
  }

  if ((0, _isValueEmpty.default)(data.firstname) || !_validator.default.isLength(data.firstname, {
    min: 2,
    max: 30
  })) {
    errors.firstname = 'Firstname must be between 2 and 30 characters';
  }

  if ((0, _isValueEmpty.default)(data.firstname) || !_validator.default.isAlpha(data.firstname)) {
    errors.firstname = 'Firstname must be only alphabets';
  }

  if ((0, _isValueEmpty.default)(data.lastname) || !_validator.default.isAlpha(data.lastname)) {
    errors.lastname = 'Lastname must be only alphabets';
  }

  if ((0, _isValueEmpty.default)(data.lastname) || _validator.default.isEmpty(data.lastname) || !_validator.default.isLength(data.lastname, {
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

  if ((0, _isValueEmpty.default)(data.mobile) || !_validator.default.isMobilePhone(data.mobile, 'en-NG')) {
    errors.mobile = 'Mobile number must be a Nigerian';
  }

  if ((0, _isValueEmpty.default)(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required';
  }

  if (!_validator.default.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Your password does not match';
  }

  return {
    errors: errors,
    isValid: (0, _isValueEmpty.default)(errors)
  };
};

var _default = validateCreateUser;
exports.default = _default;