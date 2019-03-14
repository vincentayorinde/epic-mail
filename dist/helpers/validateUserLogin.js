"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isValueEmpty = _interopRequireDefault(require("./isValueEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateUserLogin = function validateUserLogin(data) {
  var errors = {};
  /* Value passed in to data may be empty but may not be a string
     so the isValueEmpty helps us to ensure that if its empty.
     We made it an empty string so that it can be checked by the validator.isEmpty method
     This is due to the fact that validator.isEmpty can only check for empty string not empty object
  */

  data.email = (0, _isValueEmpty.default)(data.email) === true ? '' : data.email;
  data.password = (0, _isValueEmpty.default)(data.password) === true ? '' : data.password;

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
    isValid: (0, _isValueEmpty.default)(errors)
  };
};

var _default = validateUserLogin;
exports.default = _default;