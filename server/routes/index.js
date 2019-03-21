import express from 'express';
import User from '../v2/controllers/user';
import Message from '../v2/controllers/message';
import Auth from '../v2/middleware/auth';

const router = express.Router();

// Create or add user
router.post('/api/v2/auth/signup', User.signUp);

// Login user
router.post('/api/v2/auth/login', User.loginUser);

// Send or create a message
router.post('/api/v2/messages', Message.sendMail);

// Get all messages
router.get('/api/v2/messages', Message.getAllMails);

// Get all user unread messages
router.get('/api/v2/messages/unread', Message.getAllUnreadMailByUser);

// Get all user sent messages
router.get('/api/v2/messages/sent', Message.getAllMailsSentByUser);

// Get a specific mail record
router.get('/api/v2/messages/:messageId', Message.getAMailRecord);

// // Delete a specific mail record
router.delete('/api/v2/messages/:messageId', Message.deleteUserMail);


module.exports = router;
