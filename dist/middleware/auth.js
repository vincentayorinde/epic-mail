"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = _interopRequireDefault(require("../db/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  verifyToken: function () {
    var _verifyToken = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decoded, text, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers['x-access-token'];

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'Token is not provided'
              }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jsonwebtoken["default"].verify(token, process.env.SECRET);

            case 6:
              decoded = _context.sent;
              text = 'SELECT * FROM userTable  WHERE email = $1';
              _context.next = 10;
              return _index["default"].query(text, [decoded.userId]);

            case 10:
              _ref = _context.sent;
              rows = _ref.rows;

              if (rows[0]) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                message: 'The token you provided is invalid'
              }));

            case 14:
              req.user = {
                id: decoded.userId
              };
              next();
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'The token you provided is invalid'
              }));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 18]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _verifyToken.apply(this, arguments);
    }

    return verifyToken;
  }()
};
var _default = Auth;
exports["default"] = _default;