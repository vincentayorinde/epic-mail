"use strict";

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _messages = _interopRequireDefault(require("../controllers/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/api/v1/auth/signup', _users.default.createUser);
router.post('/api/v1/auth/signin', _users.default.userLogin);
router.post('/api/v1/messages', _messages.default.sendMail);
router.get('/api/v1/messages', _messages.default.getAllMails);
router.get('/api/v1/messages/unread/:receiverId', _messages.default.getAllUnreadMailByUser);
router.get('/api/v1/messages/sent/:senderId', _messages.default.getAllMailsSentByUser);
router.get('/api/v1/messages/:messageId', _messages.default.getAMailRecord);
router.delete('/api/v1/messages/:messageId', _messages.default.deleteUserMail);
module.exports = router;