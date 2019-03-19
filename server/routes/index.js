import express from 'express';
import User from '../controllers/users';
import Message from '../controllers/messages';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/api/v1/auth/signup', User.createUser);
router.post('/api/v1/auth/signin', User.userLogin);
router.post('/api/v1/messages', verifyToken, Message.sendMail);
router.get('/api/v1/messages', Message.getAllMails);
router.get('/api/v1/messages/unread/:receiverId', Message.getAllUnreadMailByUser);
router.get('/api/v1/messages/sent/:senderId', Message.getAllMailsSentByUser);
router.get('/api/v1/messages/:messageId', Message.getAMailRecord);
router.delete('/api/v1/messages/:messageId', Message.deleteUserMail);
router.get('/api/v1/auth/signup', User.getAllUsers);


module.exports = router;
