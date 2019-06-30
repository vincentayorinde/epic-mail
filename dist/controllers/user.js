"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _index = _interopRequireDefault(require("../db/index"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

var _mail = _interopRequireDefault(require("../helpers/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

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
      var _Helper$validateCreat, errors, isValid, _req$body, password, email, firstname, lastname, mobile, hashPassword, signUpQuery, values, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _Helper$validateCreat = _helpers["default"].validateCreateUser(req.body), errors = _Helper$validateCreat.errors, isValid = _Helper$validateCreat.isValid;
              _req$body = req.body, password = _req$body.password, email = _req$body.email, firstname = _req$body.firstname, lastname = _req$body.lastname, mobile = _req$body.mobile;

              if (isValid) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                errors: errors
              }));

            case 4:
              mobile = parseInt(mobile, 10);
              mobile = "+234".concat(mobile);
              hashPassword = _helpers["default"].hashPassword(password);
              signUpQuery = "INSERT INTO userTable(id, email, firstname, lastname, password, mobile, join_date)\n      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) returning *";
              values = [email, firstname, lastname, hashPassword, mobile, (0, _moment["default"])(new Date())];
              _context.prev = 9;
              _context.next = 12;
              return _index["default"].query(signUpQuery, values);

            case 12:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _helpers["default"].generateToken(rows[0].id);
              delete rows[0].password;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                message: 'User account created successfully',
                data: _objectSpread({}, rows[0], {
                  token: token
                })
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](9);
              console.log(_context.t0);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", res.status(409).send({
                status: 409,
                message: 'User with that email already exist'
              }));

            case 24:
              return _context.abrupt("return", res.status(401).send({
                status: 401,
                message: 'Sign up failed'
              }));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 19]]);
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
   * @returns {object}  array
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
              _Helper$validateUserL = _helpers["default"].validateUserLogin(req.body), errors = _Helper$validateUserL.errors, isValid = _Helper$validateUserL.isValid;
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
              return _index["default"].query(signInQuery, [email]);

            case 8:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(401).send({
                status: 401,
                error: 'Username or Password is incorrect'
              }));

            case 12:
              if (_helpers["default"].comparePassword(rows[0].password, password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(401).send({
                status: 401,
                error: 'Username or Password is incorrect'
              }));

            case 14:
              token = _helpers["default"].generateToken(rows[0].email);
              res.cookie('userData', token, {
                maxAge: 3600000,
                httpOnly: false
              }); // res.AddHeader('Set-Cookie', `userData=${token}; path=/;`);
              // Cookies.set('userData', token, { expires: 7, path: '' });

              console.log(req.headers.userData);
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Login successful',
                token: token
              }));

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](5);
              console.log('>>>>>>', _context2.t0);
              return _context2.abrupt("return", res.status(401).send({
                status: 401,
                message: 'Auth failed'
              }));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[5, 20]]);
    }));

    function loginUser(_x3, _x4) {
      return _loginUser.apply(this, arguments);
    }

    return loginUser;
  }(),
  forgotPassword: function () {
    var _forgotPassword = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var email, checkEmailQuery, _ref3, rows, token;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Gets user email
              email = req.body.email;
              checkEmailQuery = 'SELECT * FROM userTable WHERE email = $1';
              _context3.prev = 2;
              _context3.next = 5;
              return _index["default"].query(checkEmailQuery, [email]);

            case 5:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(401).send({
                status: 401,
                error: 'email does not exists'
              }));

            case 9:
              token = _helpers["default"].generateToken(rows[0].email);

              _mail["default"].reset(email, token);

              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Reset Link Sent'
              }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", res.status(401).send({
                status: 401,
                message: 'Auth failed'
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 14]]);
    }));

    function forgotPassword(_x5, _x6) {
      return _forgotPassword.apply(this, arguments);
    }

    return forgotPassword;
  }(),
  resetPassword: function () {
    var _resetPassword = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var _Helper$validateForge, errors, isValid, newPassword, hashPassword, updatePasswordQuery, values, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _Helper$validateForge = _helpers["default"].validateForgetPassword(req.body), errors = _Helper$validateForge.errors, isValid = _Helper$validateForge.isValid;
              newPassword = req.body.newPassword;

              if (isValid) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                errors: errors
              }));

            case 4:
              hashPassword = _helpers["default"].hashPassword(newPassword);
              updatePasswordQuery = 'UPDATE userTable SET password=$1 WHERE email=$2 returning *';
              values = [hashPassword, req.user.id];
              _context4.prev = 7;
              _context4.next = 10;
              return _index["default"].query(updatePasswordQuery, values);

            case 10:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Password reset successful, You can now login'
              }));

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](7);
              console.log(_context4.t0);
              return _context4.abrupt("return", res.status(401).send({
                status: 401,
                message: 'Reset password failed. Try again'
              }));

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[7, 15]]);
    }));

    function resetPassword(_x7, _x8) {
      return _resetPassword.apply(this, arguments);
    }

    return resetPassword;
  }(),
  profilePic: function () {
    var _profilePic = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var pic;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              pic = req.body.picture;
              console.log(pic);

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function profilePic(_x9, _x10) {
      return _profilePic.apply(this, arguments);
    }

    return profilePic;
  }()
};
var _default = User;
exports["default"] = _default;