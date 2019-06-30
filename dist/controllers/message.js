"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("../db/index"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

var _sms = _interopRequireDefault(require("../helpers/sms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      var _req$body, subject, message, receiverId, status, receiverdelete, getPhone, phoneValue, sendMailQuery, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, subject = _req$body.subject, message = _req$body.message, receiverId = _req$body.receiverId, status = _req$body.status, receiverdelete = _req$body.receiverdelete;

              if (_helpers["default"].isValidEmail(receiverId)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: 'Please enter a valid receiver email address'
              }));

            case 3:
              getPhone = 'SELECT mobile FROM userTable WHERE email=$1 LIMIT 1';
              phoneValue = [receiverId];
              sendMailQuery = "INSERT INTO\n      messageTable(id, createon, subject, message, parentmessageid, status, senderid, receiverid, senderdelete, receiverdelete)\n      VALUES(DEFAULT,$1, $2, $3, $4, $5, $6, (SELECT email FROM userTable WHERE email=$7), $8, $9)\n      returning *";
              values = [(0, _moment["default"])(new Date()), subject, message, 0, status, req.user.id, receiverId, false, receiverdelete];
              _context.prev = 7;
              _context.next = 10;
              return _index["default"].query(sendMailQuery, values);

            case 10:
              if (!(status !== 'draft')) {
                _context.next = 16;
                break;
              }

              _context.next = 13;
              return _index["default"].query(getPhone, phoneValue);

            case 13:
              _ref = _context.sent;
              rows = _ref.rows;
              console.log(rows[0].mobile); // await smsPackage.sendSMS(req.user.id, rows[0].mobile, subject, message);

            case 16:
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                message: 'Email sent successfully'
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](7);
              console.log(_context.t0);

              if (!(_context.t0.routine !== '_bt_check_unique')) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Receiver email does not exist'
              }));

            case 24:
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request',
                error: _context.t0
              }));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[7, 19]]);
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
              AllMailsQuery = 'SELECT * FROM messageTable WHERE receiverid=$1 AND receiverdelete=false ORDER BY id DESC';
              _context2.prev = 1;
              _context2.next = 4;
              return _index["default"].query(AllMailsQuery, [req.user.id]);

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
              return _index["default"].query(AllMailsByUserQuery, values);

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
                message: 'Unread Emails retrieved successfully',
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
  sentByUser: function () {
    var _sentByUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var sentByUserQuery, _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              sentByUserQuery = 'SELECT * FROM messageTable WHERE senderId=$1 ORDER BY createon DESC';
              _context4.prev = 1;
              _context4.next = 4;
              return _index["default"].query(sentByUserQuery, [req.user.id]);

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
                message: 'Sent Emails retrieved successfully',
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

    function sentByUser(_x7, _x8) {
      return _sentByUser.apply(this, arguments);
    }

    return sentByUser;
  }(),

  /**
   * Get All Mails Sent by User
   * @param {object} req
   * @param {object} res
   * @returns {object} mails array
   */
  draftByUser: function () {
    var _draftByUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var draftByUserQuery, _ref5, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              draftByUserQuery = 'SELECT * FROM messageTable WHERE senderId=$1 AND status=$2 ORDER BY createon DESC';
              _context5.prev = 1;
              _context5.next = 4;
              return _index["default"].query(draftByUserQuery, [req.user.id, 'draft']);

            case 4:
              _ref5 = _context5.sent;
              rows = _ref5.rows;
              rowCount = _ref5.rowCount;

              if (!(rowCount < 1)) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                message: 'No mails found'
              }));

            case 9:
              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Draft Emails retrieved successfully',
                data: {
                  rowCount: rowCount,
                  rows: rows
                }
              }));

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request',
                error: _context5.t0
              }));

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 12]]);
    }));

    function draftByUser(_x9, _x10) {
      return _draftByUser.apply(this, arguments);
    }

    return draftByUser;
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
    regeneratorRuntime.mark(function _callee6(req, res) {
      var findMailQuery, updateMailQuery, _ref6, rows, values, row;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
              updateMailQuery = 'UPDATE messageTable SET status=$1 WHERE id=$2 returning *';
              _context6.prev = 2;
              _context6.next = 5;
              return _index["default"].query(findMailQuery, [req.params.messageId]);

            case 5:
              _ref6 = _context6.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                message: 'no unread mail with ID provided'
              }));

            case 9:
              values = ['read', rows[0].id];
              _context6.next = 12;
              return _index["default"].query(updateMailQuery, values);

            case 12:
              row = _context6.sent;
              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Email retrieved successfully',
                data: row.rows[0]
              }));

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](2);
              return _context6.abrupt("return", res.status(400).send({
                status: 400,
                message: 'mail not found'
              }));

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 16]]);
    }));

    function getAMailRecord(_x11, _x12) {
      return _getAMailRecord.apply(this, arguments);
    }

    return getAMailRecord;
  }(),
  getASentMailRecord: function () {
    var _getASentMailRecord = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var findMailQuery, _ref7, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
              _context7.prev = 1;
              _context7.next = 4;
              return _index["default"].query(findMailQuery, [req.params.messageId]);

            case 4:
              _ref7 = _context7.sent;
              rows = _ref7.rows;

              if (rows[0]) {
                _context7.next = 8;
                break;
              }

              return _context7.abrupt("return", res.status(200).send({
                status: 200,
                message: 'no unread mail with ID provided'
              }));

            case 8:
              return _context7.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Email retrieved successfully',
                data: rows[0]
              }));

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](1);
              return _context7.abrupt("return", res.status(400).send({
                status: 400,
                message: 'mail not found'
              }));

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 11]]);
    }));

    function getASentMailRecord(_x13, _x14) {
      return _getASentMailRecord.apply(this, arguments);
    }

    return getASentMailRecord;
  }(),

  /**
   * Get A Specific Mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  sendDraft: function () {
    var _sendDraft = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res) {
      var findMailQuery, updateMailQuery, _ref8, rows, values, row;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
              updateMailQuery = 'UPDATE messageTable SET status=$1, receiverdelete=$2 WHERE id=$3 returning *';
              _context8.prev = 2;
              _context8.next = 5;
              return _index["default"].query(findMailQuery, [req.params.messageId]);

            case 5:
              _ref8 = _context8.sent;
              rows = _ref8.rows;

              if (rows[0]) {
                _context8.next = 9;
                break;
              }

              return _context8.abrupt("return", res.status(200).send({
                status: 200,
                message: 'no draft mail with ID provided'
              }));

            case 9:
              values = ['unread', false, rows[0].id];
              _context8.next = 12;
              return _index["default"].query(updateMailQuery, values);

            case 12:
              row = _context8.sent;
              location.href = 'http://google.com';
              return _context8.abrupt("return", location.href);

            case 17:
              _context8.prev = 17;
              _context8.t0 = _context8["catch"](2);
              return _context8.abrupt("return", res.status(400).send({
                status: 400,
                message: 'mail not found'
              }));

            case 20:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[2, 17]]);
    }));

    function sendDraft(_x15, _x16) {
      return _sendDraft.apply(this, arguments);
    }

    return sendDraft;
  }(),

  /**
   * Get A Specific Mail
   * @param {object} req
   * @param {object} res
   * @returns {object} mail object
   */
  getADraftRecord: function () {
    var _getADraftRecord = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(req, res) {
      var findMailQuery, _ref9, rows;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              findMailQuery = 'SELECT * FROM messageTable WHERE id = $1';
              _context9.prev = 1;
              _context9.next = 4;
              return _index["default"].query(findMailQuery, [req.params.messageId]);

            case 4:
              _ref9 = _context9.sent;
              rows = _ref9.rows;

              if (rows[0]) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", res.status(200).send({
                status: 200,
                message: 'no draft mail with ID provided'
              }));

            case 8:
              return _context9.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Draft retrieved successfully',
                data: rows[0]
              }));

            case 11:
              _context9.prev = 11;
              _context9.t0 = _context9["catch"](1);
              console.log(_context9.t0);
              return _context9.abrupt("return", res.status(400).send({
                status: 400,
                message: 'mail not found'
              }));

            case 15:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[1, 11]]);
    }));

    function getADraftRecord(_x17, _x18) {
      return _getADraftRecord.apply(this, arguments);
    }

    return getADraftRecord;
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
    regeneratorRuntime.mark(function _callee10(req, res) {
      var senderDeletionUpdateQuery, receiverDeletionUpdateQuery, deleteQuery, senderValues, _ref10, rows1, receiverValues, _ref11, rows2, deleteValues, _ref12, rows3;

      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              senderDeletionUpdateQuery = 'UPDATE messageTable SET senderDelete=$1 WHERE senderid=$2 AND id=$3 returning *';
              receiverDeletionUpdateQuery = 'UPDATE messageTable SET receiverDelete=$1 WHERE receiverid=$2 AND id=$3 returning *';
              deleteQuery = 'DELETE FROM messageTable WHERE senderDelete=$1 AND receiverDelete=$1 AND id=$2 returning *';
              _context10.prev = 3;
              senderValues = [true, req.user.id, req.params.messageId];
              _context10.next = 7;
              return _index["default"].query(senderDeletionUpdateQuery, senderValues);

            case 7:
              _ref10 = _context10.sent;
              rows1 = _ref10.rows1;
              receiverValues = [true, req.user.id, req.params.messageId];
              _context10.next = 12;
              return _index["default"].query(receiverDeletionUpdateQuery, receiverValues);

            case 12:
              _ref11 = _context10.sent;
              rows2 = _ref11.rows2;
              deleteValues = [true, req.params.messageId];
              _context10.next = 17;
              return _index["default"].query(deleteQuery, deleteValues);

            case 17:
              _ref12 = _context10.sent;
              rows3 = _ref12.rows3;

              if (!(!rows1[0] || !rows2[0] || !rows3[0])) {
                _context10.next = 21;
                break;
              }

              return _context10.abrupt("return", res.status(404).send({
                status: 404,
                message: 'mail not found'
              }));

            case 21:
              return _context10.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Email deleted successfully'
              }));

            case 24:
              _context10.prev = 24;
              _context10.t0 = _context10["catch"](3);
              return _context10.abrupt("return", res.status(404).send({
                status: 404,
                message: 'mail not found'
              }));

            case 27:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[3, 24]]);
    }));

    function deleteUserMail(_x19, _x20) {
      return _deleteUserMail.apply(this, arguments);
    }

    return deleteUserMail;
  }()
};
var _default = Message;
exports["default"] = _default;