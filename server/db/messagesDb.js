const messages = [
  {
    id: 1,
    createdOn: new Date(),
    subject: 'Sample Message Subject',
    message: 'This is the message',
    senderId: 1,
    receiverId: 2,
    parentMessageId: [],
    status: 'unread',
    isDeleted: false,
  },
  {
    id: 2,
    createdOn: new Date(),
    subject: 'Sample Message 2 Subject',
    message: 'This is the message 2',
    senderId: 1,
    receiverId: 2,
    parentMessageId: [],
    status: 'unread',
    isDeleted: false,
  },
];

export default messages;
