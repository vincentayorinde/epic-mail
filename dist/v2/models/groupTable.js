"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _pg = require("pg");

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
} //  Create Messate Table


var createGroupTable =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var groupTable;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            groupTable = "CREATE TABLE IF NOT EXISTS\n      groupTable(\n        id SERIAL PRIMARY KEY,\n        groupName VARCHAR(128) NOT NULL,\n        groupDesc VARCHAR(128) NOT NULL,\n        groupMail VARCHAR(128) UNIQUE NOT NULL,\n        role VARCHAR(128) NOT NULL,\n        ownerId VARCHAR(128) REFERENCES userTable(email),\n        createdOn TIMESTAMP,\n        modifiedDate TIMESTAMP,\n        constraint check_role check (role in ('admin', 'user'))\n      )";
            _context.next = 3;
            return pool.query(groupTable).then(function (res) {
              pool.end();
            }).catch(function (err) {
              pool.end();
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createGroupTable() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Drop User Table
 */


var dropGroupTable =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var dropGroup;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dropGroup = 'DROP TABLE IF EXISTS groupTable';
            _context2.next = 3;
            return pool.query(dropGroup).then(function (res) {
              pool.end();
            }).catch(function (err) {
              pool.end();
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function dropGroupTable() {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  createGroupTable: createGroupTable,
  dropGroupTable: dropGroupTable
};