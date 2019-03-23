"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("../db/index"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Message = {
  /**
   * Send a mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  sendMail: function () {
    var _sendMail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, subject, message, receiverId, sendMailQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, subject = _req$body.subject, message = _req$body.message, receiverId = _req$body.receiverId;

              if (_helpers.default.isValidEmail(receiverId)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: 'Please enter a valid receiver email address'
              }));

            case 3:
              sendMailQuery = "INSERT INTO\n      messageTable(id, createon, subject, message, parentmessageid, status, senderid, receiverid, senderdelete, receiverdelete)\n      VALUES(DEFAULT,$1, $2, $3, $4, $5, (SELECT email FROM userTable WHERE email=$6), $7, $8, $9)\n      returning *";
              values = [(0, _moment.default)(new Date()), subject, message, 0, 'unread', req.user.id, receiverId, false, false];
              _context.prev = 5;
              _context.next = 8;
              return _index.default.query(sendMailQuery, values);

            case 8:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                message: 'Email sent successfully',
                data: _objectSpread({}, rows[0])
              }));

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](5);

              if (!(_context.t0.routine !== '_bt_check_unique')) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Receiver email does not exist'
              }));

            case 17:
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request',
                error: _context.t0
              }));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 13]]);
    }));

    function sendMail(_x, _x2) {
      return _sendMail.apply(this, arguments);
    }

    return sendMail;
  }(),

  /**
   * Get All Mails
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  getAllMails: function () {
    var _getAllMails = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var AllMailsQuery, _ref2, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              AllMailsQuery = 'SELECT * FROM messageTable WHERE senderid=$1 OR receiverid=$1';
              _context2.prev = 1;
              _context2.next = 4;
              return _index.default.query(AllMailsQuery, [req.user.id]);

            case 4:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              rowCount = _ref2.rowCount;

              if (!(rowCount < 1)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                message: 'No mails found'
              }));

            case 9:
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Emails retrieved successfully',
                data: {
                  rowCount: rowCount,
                  rows: rows
                }
              }));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request',
                error: _context2.t0
              }));

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 12]]);
    }));

    function getAllMails(_x3, _x4) {
      return _getAllMails.apply(this, arguments);
    }

    return getAllMails;
  }(),

  /**
   * Get All Mails Received by User
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  getAllUnreadMailByUser: function () {
    var _getAllUnreadMailByUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var AllMailsByUserQuery, values, _ref3, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              AllMailsByUserQuery = 'SELECT * FROM messageTable WHERE status=$1 AND receiverId=$2';
              values = ['unread', req.user.id];
              _context3.prev = 2;
              _context3.next = 5;
              return _index.default.query(AllMailsByUserQuery, values);

            case 5:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              rowCount = _ref3.rowCount;

              if (!(rowCount < 1)) {
                _context3.next = 10;
                break;
              }

              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                message: 'No mails found'
              }));

            case 10:
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Emails retrieved successfully',
                data: {
                  rowCount: rowCount,
                  rows: rows
                }
              }));

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request',
                error: _context3.t0
              }));

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 13]]);
    }));

    function getAllUnreadMailByUser(_x5, _x6) {
      return _getAllUnreadMailByUser.apply(this, arguments);
    }

    return getAllUnreadMailByUser;
  }(),

  /**
   * Get All Mails Sent by User
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  getAllMailsSentByUser: function () {
    var _getAllMailsSentByUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var AllMailsSentByUserQuery, _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              AllMailsSentByUserQuery = 'SELECT * FROM messageTable WHERE senderId=$1';
              _context4.prev = 1;
              _context4.next = 4;
              return _index.default.query(AllMailsSentByUserQuery, [req.user.id]);

            case 4:
              _ref4 = _context4.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;

              if (!(rowCount < 1)) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                message: 'No mails found'
              }));

            case 9:
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Emails retrieved successfully',
                data: {
                  rowCount: rowCount,
                  rows: rows
                }
              }));

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request',
                error: _context4.t0
              }));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 12]]);
    }));

    function getAllMailsSentByUser(_x7, _x8) {
      return _getAllMailsSentByUser.apply(this, arguments);
    }

    return getAllMailsSentByUser;
  }(),

  /**
   * Get A Specific Mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  getAMailRecord: function () {
    var _getAMailRecord = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var findMailQuery, updateMailQuery, _ref5, rows, values, row;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
              updateMailQuery = 'UPDATE messageTable SET status=$1 WHERE id=$2 returning *';
              _context5.prev = 2;
              _context5.next = 5;
              return _index.default.query(findMailQuery, [req.params.messageId]);

            case 5:
              _ref5 = _context5.sent;
              rows = _ref5.rows;

              if (rows[0]) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                message: 'no unread mail at the moment'
              }));

            case 9:
              values = ['read', rows[0].id];
              _context5.next = 12;
              return _index.default.query(updateMailQuery, values);

            case 12:
              row = _context5.sent;
              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Email retrieved successfully',
                data: row.rows[0]
              }));

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](2);
              return _context5.abrupt("return", res.status(400).send({
                status: 400,
                message: 'mail not found'
              }));

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 16]]);
    }));

    function getAMailRecord(_x9, _x10) {
      return _getAMailRecord.apply(this, arguments);
    }

    return getAMailRecord;
  }(),

  /**
   * Delete A Mail
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   *
   */
  deleteUserMail: function () {
    var _deleteUserMail = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var senderDeletionUpdateQuery, receiverDeletionUpdateQuery, deleteQuery, senderValues, _ref6, rows1, receiverValues, _ref7, rows2, deleteValues, _ref8, rows3;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              senderDeletionUpdateQuery = 'UPDATE messageTable SET senderDelete=$1 WHERE senderid=$2 AND id=$3 returning *';
              receiverDeletionUpdateQuery = 'UPDATE messageTable SET receiverDelete=$1 WHERE receiverid=$2 AND id=$3 returning *';
              deleteQuery = 'DELETE FROM messageTable WHERE senderDelete=$1 AND receiverDelete=$1 AND id=$2 returning *';
              _context6.prev = 3;
              senderValues = [true, req.user.id, req.params.messageId];
              _context6.next = 7;
              return _index.default.query(senderDeletionUpdateQuery, senderValues);

            case 7:
              _ref6 = _context6.sent;
              rows1 = _ref6.rows1;
              receiverValues = [true, req.user.id, req.params.messageId];
              _context6.next = 12;
              return _index.default.query(receiverDeletionUpdateQuery, receiverValues);

            case 12:
              _ref7 = _context6.sent;
              rows2 = _ref7.rows2;
              deleteValues = [true, req.params.messageId];
              _context6.next = 17;
              return _index.default.query(deleteQuery, deleteValues);

            case 17:
              _ref8 = _context6.sent;
              rows3 = _ref8.rows3;

              if (!(!rows1[0] || !rows2[0] || !rows3[0])) {
                _context6.next = 21;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                status: 404,
                message: 'mail not found'
              }));

            case 21:
              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Email deleted successfully'
              }));

            case 24:
              _context6.prev = 24;
              _context6.t0 = _context6["catch"](3);
              return _context6.abrupt("return", res.status(404).send({
                status: 404,
                message: 'mail not found'
              }));

            case 27:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[3, 24]]);
    }));

    function deleteUserMail(_x11, _x12) {
      return _deleteUserMail.apply(this, arguments);
    }

    return deleteUserMail;
  }()
};
var _default = Message;
exports.default = _default;