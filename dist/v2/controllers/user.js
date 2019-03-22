"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("../db/index"));

var _helpers = _interopRequireDefault(require("./helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  signUp: function () {
    var _signUp = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _Helper$validateCreat, errors, isValid, password, _req$body, email, firstname, lastname, mobile, hashPassword, signUpQuery, values, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _Helper$validateCreat = _helpers.default.validateCreateUser(req.body), errors = _Helper$validateCreat.errors, isValid = _Helper$validateCreat.isValid;
              password = req.body.password;

              if (isValid) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                errors: errors
              }));

            case 4:
              _req$body = req.body, email = _req$body.email, firstname = _req$body.firstname, lastname = _req$body.lastname, mobile = _req$body.mobile;
              hashPassword = _helpers.default.hashPassword(password);
              signUpQuery = "INSERT INTO\n      userTable(id, email, firstname, lastname, password, mobile, join_date)\n      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6)\n      returning *";
              values = [email, firstname, lastname, hashPassword, mobile, (0, _moment.default)(new Date())];
              _context.prev = 8;
              _context.next = 11;
              return _index.default.query(signUpQuery, values);

            case 11:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _helpers.default.generateToken(rows[0].id);
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                message: 'User account created successfully',
                data: _objectSpread({}, rows[0], {
                  token: token
                })
              }));

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](8);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", res.status(409).send({
                status: 409,
                message: 'User with that email already exist'
              }));

            case 21:
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Fields cannot be blank'
              }));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 17]]);
    }));

    function signUp(_x, _x2) {
      return _signUp.apply(this, arguments);
    }

    return signUp;
  }(),

  /**
   * Login User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflections array
   */
  loginUser: function () {
    var _loginUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _Helper$validateUserL, errors, isValid, _req$body2, email, password, signInQuery, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _Helper$validateUserL = _helpers.default.validateUserLogin(req.body), errors = _Helper$validateUserL.errors, isValid = _Helper$validateUserL.isValid;
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

              if (isValid) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                errors: errors
              }));

            case 4:
              signInQuery = 'SELECT * FROM userTable WHERE email = $1';
              _context2.prev = 5;
              _context2.next = 8;
              return _index.default.query(signInQuery, [email]);

            case 8:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                status: 404,
                error: 'Username or Password is incorrect'
              }));

            case 12:
              if (_helpers.default.comparePassword(rows[0].password, password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                error: 'Username or Password is incorrect'
              }));

            case 14:
              token = _helpers.default.generateToken(rows[0].email);
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Login successfull',
                data: {
                  token: token
                }
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](5);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[5, 18]]);
    }));

    function loginUser(_x3, _x4) {
      return _loginUser.apply(this, arguments);
    }

    return loginUser;
  }()
};
var _default = User;
exports.default = _default;