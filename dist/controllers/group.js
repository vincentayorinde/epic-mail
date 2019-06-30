"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("../db/index"));

var _helpers = _interopRequireDefault(require("../helpers/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Group = {
  createGroup: function () {
    var _createGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, groupName, groupDesc, groupEmail, checkGroupQuery, groupQuery, AddOwnerToGroupQuery, _ref, rows, values, _ref2, row, ownerValues;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, groupName = _req$body.groupName, groupDesc = _req$body.groupDesc, groupEmail = _req$body.groupEmail;

              if (!(groupName === '' || groupDesc === '' || groupEmail === '')) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'All fiels are required'
              }));

            case 3:
              checkGroupQuery = 'SELECT * FROM groupTable WHERE groupmail=$1 LIMIT 1';
              groupQuery = "INSERT INTO\n      groupTable(id, groupname, groupdesc, groupmail, ownerid, createdon, modifieddate)\n      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6) returning *";
              AddOwnerToGroupQuery = "INSERT INTO groupMemberTable(id, groupid, groupemail, memberid, memberemail, role, join_date)\n      VALUES(DEFAULT, (SELECT id FROM groupTable WHERE groupmail=$4 LIMIT 1), (SELECT groupmail FROM groupTable WHERE groupmail=$4 LIMIT 1), (SELECT id FROM userTable WHERE email=$1), $1, $2, $3) returning *";
              _context.next = 8;
              return _index["default"].query(checkGroupQuery, [groupEmail]);

            case 8:
              _ref = _context.sent;
              rows = _ref.rows;

              if (!rows.length) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(409).send({
                status: 409,
                message: 'Group already exists'
              }));

            case 12:
              values = [groupName, groupDesc, groupEmail, req.user.id, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.next = 15;
              return _index["default"].query(groupQuery, values);

            case 15:
              _ref2 = _context.sent;
              row = _ref2.row;
              ownerValues = [req.user.id, 'admin', (0, _moment["default"])(new Date()), groupEmail];
              _context.prev = 18;
              _context.next = 21;
              return _index["default"].query(AddOwnerToGroupQuery, ownerValues);

            case 21:
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                message: 'Group created successfully'
              }));

            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](18);
              console.log(_context.t0);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request'
              }));

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[18, 24]]);
    }));

    function createGroup(_x, _x2) {
      return _createGroup.apply(this, arguments);
    }

    return createGroup;
  }(),
  getAllGroups: function () {
    var _getAllGroups = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var AllGroupsQuery, _ref3, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              AllGroupsQuery = 'SELECT * FROM groupTable WHERE ownerid=$1 ORDER BY modifieddate DESC';
              _context2.prev = 1;
              _context2.next = 4;
              return _index["default"].query(AllGroupsQuery, [req.user.id]);

            case 4:
              _ref3 = _context2.sent;
              rows = _ref3.rows;
              rowCount = _ref3.rowCount;
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                message: 'All groups retrieved successfully',
                data: {
                  rowCount: rowCount,
                  rows: rows
                }
              }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request',
                error: _context2.t0
              }));

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 10]]);
    }));

    function getAllGroups(_x3, _x4) {
      return _getAllGroups.apply(this, arguments);
    }

    return getAllGroups;
  }(),
  editGroupName: function () {
    var _editGroupName = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var findOneGroupQuery, patchOneGroupQuery, _ref4, rows, values, row;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              findOneGroupQuery = 'SELECT * FROM groupTable WHERE id=$1';
              patchOneGroupQuery = 'UPDATE groupTable SET groupname=$1,groupdesc=$2,modifieddate=$3 WHERE id=$4 returning *';
              _context3.prev = 2;
              _context3.next = 5;
              return _index["default"].query(findOneGroupQuery, [req.params.groupId]);

            case 5:
              _ref4 = _context3.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found'
              }));

            case 9:
              values = [req.body.groupname || rows[0].groupname, req.body.groupdesc || rows[0].groupdesc, (0, _moment["default"])(new Date()), req.params.groupId];
              _context3.next = 12;
              return _index["default"].query(patchOneGroupQuery, values);

            case 12:
              row = _context3.sent;
              return _context3.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Group updated successfully',
                data: row.rows[0]
              }));

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Group name could not be updated',
                error: _context3.t0
              }));

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 16]]);
    }));

    function editGroupName(_x5, _x6) {
      return _editGroupName.apply(this, arguments);
    }

    return editGroupName;
  }(),
  getSpecificGroup: function () {
    var _getSpecificGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var findOneGroupQuery, _ref5, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findOneGroupQuery = 'SELECT * FROM groupTable WHERE id=$1';
              _context4.prev = 1;
              _context4.next = 4;
              return _index["default"].query(findOneGroupQuery, [req.params.groupId]);

            case 4:
              _ref5 = _context4.sent;
              rows = _ref5.rows;

              if (rows[0]) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found'
              }));

            case 8:
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Group retrieved successfully',
                data: rows[0]
              }));

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found',
                error: _context4.t0
              }));

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 11]]);
    }));

    function getSpecificGroup(_x7, _x8) {
      return _getSpecificGroup.apply(this, arguments);
    }

    return getSpecificGroup;
  }(),
  getSpecificGroupMembers: function () {
    var _getSpecificGroupMembers = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var findOneGroupQuery, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              findOneGroupQuery = 'SELECT * FROM groupmembertable WHERE groupid=$1 AND memberemail<>$2 ';
              _context5.prev = 1;
              _context5.next = 4;
              return _index["default"].query(findOneGroupQuery, [req.params.groupId, req.user.id]);

            case 4:
              _ref6 = _context5.sent;
              rows = _ref6.rows;

              if (rows) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found'
              }));

            case 8:
              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Group retrieved successfully',
                data: rows
              }));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](1);
              return _context5.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found',
                error: _context5.t0
              }));

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 11]]);
    }));

    function getSpecificGroupMembers(_x9, _x10) {
      return _getSpecificGroupMembers.apply(this, arguments);
    }

    return getSpecificGroupMembers;
  }(),
  deleteGroup: function () {
    var _deleteGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var deleteGroupQuery, deleteUserGroupQuery, _ref7, rows;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deleteGroupQuery = 'DELETE FROM grouptable WHERE id=$1 AND ownerid=$2 returning *';
              deleteUserGroupQuery = 'DELETE FROM groupmembertable WHERE groupid=$1 returning *';
              _context6.prev = 2;
              _context6.next = 5;
              return _index["default"].query(deleteUserGroupQuery, [req.params.groupId]);

            case 5:
              _context6.next = 7;
              return _index["default"].query(deleteGroupQuery, [req.params.groupId, req.user.id]);

            case 7:
              _ref7 = _context6.sent;
              rows = _ref7.rows;

              if (rows[0]) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found'
              }));

            case 11:
              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Group deleted successfully'
              }));

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](2);
              return _context6.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found',
                error: _context6.t0
              }));

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 14]]);
    }));

    function deleteGroup(_x11, _x12) {
      return _deleteGroup.apply(this, arguments);
    }

    return deleteGroup;
  }(),
  addUserToGroup: function () {
    var _addUserToGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var _req$body2, email, role, checkUserQuery, findUserQuery, insertUserToGroupQuery, _ref8, rows, data, values, _ref9, _rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, role = _req$body2.role;

              if (_helpers["default"].isValidEmail(email)) {
                _context7.next = 3;
                break;
              }

              return _context7.abrupt("return", res.status(400).send({
                status: 400,
                error: 'Please enter a valid email address'
              }));

            case 3:
              checkUserQuery = 'SELECT * FROM userTable WHERE email=$1 LIMIT 1';
              findUserQuery = 'SELECT * FROM groupmembertable WHERE groupid=$1 AND memberemail=$2 LIMIT 1';
              insertUserToGroupQuery = "INSERT INTO groupMemberTable(id, groupid, groupemail, memberid, memberemail, role, join_date)\n      VALUES(DEFAULT, (SELECT id FROM groupTable WHERE id=$1), (SELECT groupmail FROM groupTable WHERE id=$1), (SELECT id FROM userTable WHERE email=$2), (SELECT email FROM userTable WHERE email=$2), $3, $4) returning *";
              _context7.next = 8;
              return _index["default"].query(checkUserQuery, [email]);

            case 8:
              _ref8 = _context7.sent;
              rows = _ref8.rows;

              if (rows.length) {
                _context7.next = 12;
                break;
              }

              return _context7.abrupt("return", res.status(400).send({
                status: 400,
                message: 'User does not exist, add account , and try again'
              }));

            case 12:
              _context7.next = 14;
              return _index["default"].query(findUserQuery, [req.param.groupId, email]);

            case 14:
              data = _context7.sent;

              if (!data.rows.length) {
                _context7.next = 17;
                break;
              }

              return _context7.abrupt("return", res.status(409).send({
                status: 409,
                message: 'User already exist in group'
              }));

            case 17:
              values = [req.params.groupId, email, role, (0, _moment["default"])(new Date())];
              _context7.prev = 18;
              _context7.next = 21;
              return _index["default"].query(insertUserToGroupQuery, values);

            case 21:
              _ref9 = _context7.sent;
              _rows = _ref9.rows;
              return _context7.abrupt("return", res.status(200).send({
                status: 200,
                message: 'User added to group successfully',
                data: _rows[0]
              }));

            case 26:
              _context7.prev = 26;
              _context7.t0 = _context7["catch"](18);
              console.log(_context7.t0);

              if (!(_context7.t0.routine === '_bt_check_unique')) {
                _context7.next = 31;
                break;
              }

              return _context7.abrupt("return", res.status(409).send({
                status: 409,
                message: 'User with that email already exist in group'
              }));

            case 31:
              return _context7.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group does not exits'
              }));

            case 32:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[18, 26]]);
    }));

    function addUserToGroup(_x13, _x14) {
      return _addUserToGroup.apply(this, arguments);
    }

    return addUserToGroup;
  }(),
  deleteUserGroup: function () {
    var _deleteUserGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(req, res) {
      var _req$params, groupId, userId, deleteUserGroupQuery, values, _ref10, rows;

      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _req$params = req.params, groupId = _req$params.groupId, userId = _req$params.userId;
              deleteUserGroupQuery = 'DELETE FROM groupmembertable WHERE memberid=$1 AND groupid=$2 returning *';
              values = [userId, groupId];
              _context8.prev = 3;
              _context8.next = 6;
              return _index["default"].query(deleteUserGroupQuery, values);

            case 6:
              _ref10 = _context8.sent;
              rows = _ref10.rows;

              if (rows[0]) {
                _context8.next = 10;
                break;
              }

              return _context8.abrupt("return", res.status(404).send({
                status: 404,
                message: 'User not found'
              }));

            case 10:
              return _context8.abrupt("return", res.status(200).send({
                status: 200,
                message: 'User deleted from group successfully'
              }));

            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](3);
              return _context8.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found'
              }));

            case 16:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[3, 13]]);
    }));

    function deleteUserGroup(_x15, _x16) {
      return _deleteUserGroup.apply(this, arguments);
    }

    return deleteUserGroup;
  }(),
  sendMailGroup: function () {
    var _sendMailGroup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(req, res) {
      var _req$body3, subject, message, selectMembers, sendMailGroupQuery, _ref11, rows;

      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _req$body3 = req.body, subject = _req$body3.subject, message = _req$body3.message;
              selectMembers = 'SELECT memberid FROM groupmembertable WHERE groupid=$1';
              sendMailGroupQuery = "INSERT INTO\n      messageTable(id, createon, subject, message, parentmessageid, status, senderid, receiverid, senderdelete, receiverdelete)\n      VALUES(DEFAULT,$1, $2, $3, $4, $5, (SELECT groupmail FROM groupTable WHERE id=$6), (SELECT email FROM userTable WHERE id=$7), $8, $9) returning *";
              _context9.prev = 3;
              _context9.next = 6;
              return _index["default"].query(selectMembers, [req.params.groupId]);

            case 6:
              _ref11 = _context9.sent;
              rows = _ref11.rows;

              if (rows[0]) {
                _context9.next = 10;
                break;
              }

              return _context9.abrupt("return", res.status(404).send({
                status: 404,
                message: 'Group not found'
              }));

            case 10:
              rows.forEach(function (row) {
                _index["default"].query(sendMailGroupQuery, [(0, _moment["default"])(new Date()), subject, message, 0, 'unread', req.params.groupId, row.memberid, false, false]);
              });
              return _context9.abrupt("return", res.status(200).send({
                status: 200,
                message: 'Mail sent to group successfully',
                data: rows
              }));

            case 14:
              _context9.prev = 14;
              _context9.t0 = _context9["catch"](3);

              if (!(_context9.t0.routine !== '_bt_check_unique')) {
                _context9.next = 18;
                break;
              }

              return _context9.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Receiver email does not exist'
              }));

            case 18:
              return _context9.abrupt("return", res.status(400).send({
                status: 400,
                message: 'Bad request',
                error: _context9.t0
              }));

            case 19:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[3, 14]]);
    }));

    function sendMailGroup(_x17, _x18) {
      return _sendMailGroup.apply(this, arguments);
    }

    return sendMailGroup;
  }()
};
var _default = Group;
exports["default"] = _default;