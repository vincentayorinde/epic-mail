"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _twilio = _interopRequireDefault(require("twilio"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var smsPackage = {
  sendSMS: function () {
    var _sendSMS = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(sender, phone, subject, body) {
      var accountSid, authToken, client;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              accountSid = process.env.TWILIO_ACCOUNT_SID;
              authToken = process.env.TWILIO_AUTH_TOKEN;
              client = new _twilio["default"](accountSid, authToken);
              _context.next = 5;
              return client.messages.create({
                body: "From ".concat(sender, ": ").concat(subject, "-").concat(body),
                from: '+12028838471',
                to: phone,
                rejectUnauthorized: false,
                // add when working with https sites
                requestCert: false,
                // add when working with https sites
                agent: false // add when working with https sites

              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function sendSMS(_x, _x2, _x3, _x4) {
      return _sendSMS.apply(this, arguments);
    }

    return sendSMS;
  }()
};
var _default = smsPackage;
exports["default"] = _default;