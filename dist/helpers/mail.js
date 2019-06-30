"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var ResetPassword = {
  // async..await is not allowed in global scope, must use a wrapper
  reset: function () {
    var _reset = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(email, token) {
      var transporter, mailOptions;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // create reusable transporter object using the default SMTP transport
              transporter = _nodemailer["default"].createTransport({
                service: 'Gmail',
                pool: true,
                host: 'smtp-relay.gmail.com',
                port: 465,
                secure: false,
                // true for 465, false for other ports
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASS
                }
              }); // setup email data with unicode symbols

              mailOptions = {
                from: "\"Support \uD83D\uDC7B\" <".concat(process.env.EMAIL, ">"),
                // sender address
                to: email,
                // list of receivers
                subject: 'EPIC Mail - Password Reset',
                // Subject line
                text: "You are receiving this email because you or (someone else) has requested the reset of your password\n      please click the link below, or past this into your browser to complete the process\n      http://localhost:5000/reset-password/".concat(token, " \n\n\n      If you did not request this, please ignore this email, your password will remain unchanged ") // plain text body

              }; // send mail with defined transport object

              _context.next = 4;
              return transporter.sendMail(mailOptions);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function reset(_x, _x2) {
      return _reset.apply(this, arguments);
    }

    return reset;
  }()
};
var _default = ResetPassword;
exports["default"] = _default;