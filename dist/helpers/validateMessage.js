"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isValueEmpty = _interopRequireDefault(require("./isValueEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateMessage = function validateMessage(data) {
  var errors = {};
  /* Value passed in to data may be empty but may not be a string
     so the isValueEmpty helps us to ensure that if its empty.
     We made it an empty string so that it can be checked by the validator.isEmpty method
     This is due to the fact that validator.isEmpty can only check for empty string not empty object
  */

  if ((0, _isValueEmpty.default)(data.senderId) || !_validator.default.isInt(data.senderId)) {
    errors.senderId = 'ID is invalid';
  }

  if ((0, _isValueEmpty.default)(data.receiverId) || !_validator.default.isInt(data.receiverId)) {
    errors.receiverId = 'ID is invalid';
  }

  if ((0, _isValueEmpty.default)(data.message) || !_validator.default.isLength(data.message, {
    min: 2
  })) {
    errors.message = 'Message must be min 2 characters';
  }

  if ((0, _isValueEmpty.default)(data.subject) || _validator.default.isEmpty(data.subject) || !_validator.default.isLength(data.subject, {
    min: 2
  })) {
    errors.subject = 'Subject must be min 2 characters';
  }

  return {
    errors: errors,
    isValid: (0, _isValueEmpty.default)(errors)
  };
};

var _default = validateMessage;
exports.default = _default;