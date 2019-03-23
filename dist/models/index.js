"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

var _userTable = require("./userTable");

var _messageTable = require("./messageTable");

var _groupMemberTable = require("./groupMemberTable");

var _groupTable = require("./groupTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv.default.config();

var pool;
var env = process.env.NODE_ENV;

if (env === 'development') {
  pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL_DEV
  });
}

if (env === 'test') {
  pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL_TEST
  });
}

if (env === 'production') {
  pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL_PROD
  });
}

pool.on('connect', function () {});

var createTables =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _userTable.createUserTable)();

          case 3:
            _context.next = 5;
            return (0, _messageTable.createMessageTable)();

          case 5:
            _context.next = 7;
            return (0, _groupTable.createGroupTable)();

          case 7:
            _context.next = 9;
            return (0, _groupMemberTable.createGroupMemberTable)();

          case 9:
            _context.next = 13;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function createTables() {
    return _ref.apply(this, arguments);
  };
}();

var dropTables =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _groupMemberTable.dropGroupMemberTable)();

          case 3:
            _context2.next = 5;
            return (0, _groupTable.dropGroupTable)();

          case 5:
            _context2.next = 7;
            return (0, _messageTable.dropMessageTable)();

          case 7:
            _context2.next = 9;
            return (0, _userTable.dropUserTable)();

          case 9:
            _context2.next = 13;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function dropTables() {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  createTables: createTables,
  dropTables: dropTables
};

require('make-runnable');