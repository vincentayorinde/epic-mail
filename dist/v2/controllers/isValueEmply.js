"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isValueEmpty = function isValueEmpty(value) {
  if (value === undefined || value === 'undefined' || value === null || _typeof(value) === 'object' && Object.keys(value).length === 0 || typeof value === 'string' && value.trim().length === 0) {
    return true;
  }
};

var _default = isValueEmpty;
exports.default = _default;