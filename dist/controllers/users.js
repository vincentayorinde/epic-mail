"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _usersDb = _interopRequireDefault(require("../db/usersDb"));

var _validateCreateUser = _interopRequireDefault(require("../helpers/validateCreateUser"));

var _validateUserLogin2 = _interopRequireDefault(require("../helpers/validateUserLogin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "createUser",

    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
    value: function createUser(req, res) {
      var _validateCreatUser = (0, _validateCreateUser.default)(req.body),
          errors = _validateCreatUser.errors,
          isValid = _validateCreatUser.isValid;

      var password = req.body.password;

      if (!isValid) {
        return res.status(400).send({
          status: 400,
          errors: errors
        });
      }

      _bcryptjs.default.hash(password, 10, function (err, hash) {
        if (err) {
          return res.status(500).send({
            status: 500,
            error: err
          });
        }

        var user = [];

        _jsonwebtoken.default.sign({
          user: user
        }, 'secretKey', function (err, token) {
          user = {
            token: token,
            id: _usersDb.default.length + 1,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            password: hash
          };

          _usersDb.default.push(user);

          return res.status(201).send({
            status: 201,
            message: 'User account created successfully',
            data: user
          });
        });
      });
    }
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */

  }, {
    key: "userLogin",
    value: function userLogin(req, res) {
      var _validateUserLogin = (0, _validateUserLogin2.default)(req.body),
          errors = _validateUserLogin.errors,
          isValid = _validateUserLogin.isValid;

      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      if (!isValid) {
        return res.status(400).send({
          status: 400,
          errors: errors
        });
      }

      var user = _usersDb.default.find(function (dbUser) {
        return dbUser.email === email;
      });

      if (user) {
        var IsPassword = _bcryptjs.default.compareSync(password, user.password);

        if (IsPassword) {
          var token = _jsonwebtoken.default.sign(user, 'secretKey', {
            expiresIn: '1h'
          });

          return res.status(200).send({
            status: 200,
            message: 'User sign in successful',
            data: _objectSpread({}, user, {
              token: token
            })
          });
        }
      }

      return res.status(400).send({
        status: 400,
        message: 'Username or Password Incorrect'
      });
    }
  }]);

  return User;
}();

var _default = User;
exports.default = _default;