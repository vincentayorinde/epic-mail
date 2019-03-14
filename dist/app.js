"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // Parse incoming requests data

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
})); // Middleware

app.use(_index.default);
var PORT = process.env.PORT || 5000;
app.listen(PORT);
var _default = app;
exports.default = _default;