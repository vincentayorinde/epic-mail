"use strict";

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _message = _interopRequireDefault(require("../controllers/message"));

var _group = _interopRequireDefault(require("../controllers/group"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Create or add user


router.post('/api/v2/auth/signup', _user["default"].signUp); // Login user

router.post('/api/v2/auth/login', _user["default"].loginUser); // Send or create a message

router.post('/api/v2/messages', _auth["default"].verifyToken, _message["default"].sendMail); // Get all messages

router.get('/api/v2/messages', _auth["default"].verifyToken, _message["default"].getAllMails); // Get all user unread messages

router.get('/api/v2/messages/unread', _auth["default"].verifyToken, _message["default"].getAllUnreadMailByUser); // Get all user sent messages

router.get('/api/v2/messages/sent', _auth["default"].verifyToken, _message["default"].sentByUser); // Get a specific mail record

router.get('/api/v2/messages/:messageId', _auth["default"].verifyToken, _message["default"].getAMailRecord); // // Delete a specific mail record

router["delete"]('/api/v2/messages/:messageId', _auth["default"].verifyToken, _message["default"].deleteUserMail); // Create or add a new group

router.post('/api/v2/groups', _auth["default"].verifyToken, _group["default"].createGroup); // Get all group

router.get('/api/v2/groups', _auth["default"].verifyToken, _group["default"].getAllGroups); // Edit the name of a specific group

router.patch('/api/v2/groups/:groupId', _auth["default"].verifyToken, _group["default"].editGroupName); // Delete a specific group

router["delete"]('/api/v2/groups/:groupId', _auth["default"].verifyToken, _group["default"].deleteGroup); // Add a user to a group

router.post('/api/v2/groups/:groupId/users', _auth["default"].verifyToken, _group["default"].addUserToGroup); // Delete a user from a specific group

router["delete"]('/api/v2/groups/:groupId/users/:userId', _auth["default"].verifyToken, _group["default"].deleteUserGroup); // Create or send an email to a group

router.post('/api/v2/groups/:groupId/messages', _auth["default"].verifyToken, _group["default"].sendMailGroup);
module.exports = router;