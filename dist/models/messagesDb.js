"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var messages = [{
  id: 1,
  createdOn: new Date(),
  subject: 'Sample Message Subject',
  message: 'This is the message',
  senderId: 1,
  receiverId: 2,
  parentMessageId: [],
  rstatus: 'unread',
  isDeleted: false
}, {
  id: 2,
  createdOn: new Date(),
  subject: 'Sample Message 2 Subject',
  message: 'This is the message 2',
  senderId: 1,
  receiverId: 2,
  parentMessageId: [],
  rstatus: 'unread',
  isDeleted: false
}];
var _default = messages;
exports.default = _default;