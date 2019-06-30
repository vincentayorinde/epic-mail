"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("idempotent-babel-polyfill");

var _swagger = _interopRequireDefault(require("../docs/swagger.json"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // Global app object


var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])('secret'));
app.use((0, _expressSession["default"])({
  resave: false,
  saveUninitialized: false,
  secret: 'secret'
})); // Middleware

app.use(_index["default"]);
app.get('/', function (req, res) {
  return res.status(200).json({
    message: 'welcome to Epic Mail'
  });
});
app.use(function (req, res) {
  return res.status(404).json({
    status: 404,
    error: "Route ".concat(req.url, " Not found")
  });
});
app.use(function (error, req, res) {
  return res.status(500).json({
    status: 500,
    error: error
  });
});
app.get('/logout', function (req, res) {
  res.clearCookie('myfirstcookie');
  res.redirect('/');
});
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
var PORT = process.env.PORT || 5000;
app.listen(PORT);
var _default = app;
exports["default"] = _default;