"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _messagesDb = _interopRequireDefault(require("../db/messagesDb"));

var _validateMessage2 = _interopRequireDefault(require("../helpers/validateMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Message =
/*#__PURE__*/
function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, null, [{
    key: "sendMail",

    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} message object
     */
    value: function sendMail(req, res) {
      var _validateMessage = (0, _validateMessage2.default)(req.body),
          errors = _validateMessage.errors,
          isValid = _validateMessage.isValid;

      if (!isValid) {
        return this.res.status(400).send({
          status: 400,
          errors: errors
        });
      }

      var message = [];
      message = {
        id: _messagesDb.default.length + 1,
        createdOn: new Date(),
        subject: req.body.subject,
        message: req.body.message,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        parentMessageId: [],
        status: 'unread',
        isDeleted: false
      };

      _messagesDb.default.push(message);

      return res.status(201).send({
        status: 201,
        message: 'Message sent successfully',
        data: message
      });
    }
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} message object
     */

  }, {
    key: "getAllMails",
    value: function getAllMails(req, res) {
      return res.status(200).send({
        status: 200,
        message: 'All received emails',
        data: _messagesDb.default
      });
    }
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} message object
     */

  }, {
    key: "getAllUnreadMailByUser",
    value: function getAllUnreadMailByUser(req, res) {
      var result = _messagesDb.default.filter(function (val) {
        return val.receiverId === Number(req.params.id) && val.rstatus === 'unread';
      });

      if (result) {
        return res.status(200).send({
          status: 200,
          message: 'All unread received emails by specified user',
          data: result
        });
      }

      return res.status(400).send({
        status: 400,
        message: 'No unread emails by specified user'
      });
    }
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} message object
     */

  }, {
    key: "getAllMailsSentByUser",
    value: function getAllMailsSentByUser(req, res) {
      var result = _messagesDb.default.filter(function (val) {
        return val.senderId === Number(req.params.id);
      });

      if (result) {
        return res.status(200).send({
          status: 200,
          message: 'All emails sent by specified user',
          data: result
        });
      }

      return res.status(400).send({
        status: 400,
        message: 'No emails sent by specified user'
      });
    }
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} message object
     */

  }, {
    key: "getAMailRecord",
    value: function getAMailRecord(req, res) {
      var result = _messagesDb.default.find(function (dbMail) {
        return dbMail.id === Number(req.params.id);
      });

      if (result) {
        return res.status(200).send({
          status: 200,
          message: 'Email record retrieved successfully',
          data: result
        });
      }

      return res.status(404).send({
        status: 404,
        message: 'Email does not exist'
      });
    }
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} message object
     */

  }, {
    key: "deleteUserMail",
    value: function deleteUserMail(req, res) {
      var result = _messagesDb.default.find(function (dbMail) {
        return dbMail.id === Number(req.params.id);
      });

      result.isDeleted = true;

      if (result) {
        return res.status(200).send({
          status: 200,
          message: 'Email record deleted successfully',
          data: result
        });
      }

      return res.status(404).send({
        status: 404,
        message: 'Email does not exist'
      });
    }
  }]);

  return Message;
}();

var _default = Message;
exports.default = _default;