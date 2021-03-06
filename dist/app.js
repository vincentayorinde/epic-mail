"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("idempotent-babel-polyfill");

var _swagger = _interopRequireDefault(require("../docs/swagger.json"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // Global app object


var app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
})); // Middleware

app.use(_index.default);
app.get('/', function (req, res) {
  res.send('Welcome to Epic Mail');
});
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
var PORT = process.env.PORT || 5000;
app.listen(PORT);
var _default = app;
exports.default = _default;