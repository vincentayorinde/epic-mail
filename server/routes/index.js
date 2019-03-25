import express from 'express';
import User from '../controllers/user';
import Message from '../controllers/message';
import Group from '../controllers/group';
import Auth from '../middleware/auth';

const router = express.Router();

// Create or add user
router.post('/api/v2/auth/signup', User.signUp);

// Login user
router.post('/api/v2/auth/login', User.loginUser);

// Forgot password user
router.post('/forgot', User.forgotPassword);

// Reset password link
router.put('/reset-password/:token', Auth.verify, User.resetPassword);

// Reset password link
router.post('/profile', User.profilePic);

// Send or create a message
router.post('/api/v2/messages', Auth.verifyToken, Message.sendMail);

// Get all messages
router.get('/api/v2/messages', Auth.verifyToken, Message.getAllMails);

// Get all user unread messages
router.get('/api/v2/messages/unread', Auth.verifyToken, Message.getAllUnreadMailByUser);

// Get all user sent messages
router.get('/api/v2/messages/sent', Auth.verifyToken, Message.sentByUser);

// Get all user sent messages
router.get('/api/v2/messages/draft', Auth.verifyToken, Message.draftByUser);

//  draft message
router.put('/api/v2/messages/draft/:messageId', Auth.verifyToken, Message.sendDraft);

// Get all user sent messages
router.get('/api/v2/messages/draft/:messageId', Auth.verifyToken, Message.getADraftRecord);

// Get a specific mail record
router.get('/api/v2/messages/:messageId', Auth.verifyToken, Message.getAMailRecord);

// Get a specific mail record
router.get('/api/v2/messages/sent/:messageId', Auth.verifyToken, Message.getASentMailRecord);

// // Delete a specific mail record
router.delete('/api/v2/messages/:messageId', Auth.verifyToken, Message.deleteUserMail);

// Create or add a new group
router.post('/api/v2/groups', Auth.verifyToken, Group.createGroup);

// Get all group
router.get('/api/v2/groups', Auth.verifyToken, Group.getAllGroups);

// Edit the name of a specific group
router.patch('/api/v2/groups/:groupId', Auth.verifyToken, Group.editGroupName);

// Get a specific group
router.get('/api/v2/groups/:groupId', Auth.verifyToken, Group.getSpecificGroup);

// Get a specific group members
router.get('/api/v2/groups/:groupId/members', Auth.verifyToken, Group.getSpecificGroupMembers);

// Delete a specific group
router.delete('/api/v2/groups/:groupId', Auth.verifyToken, Group.deleteGroup);

// Add a user to a group
router.post('/api/v2/groups/:groupId/users', Auth.verifyToken, Group.addUserToGroup);

// Delete a user from a specific group
router.delete('/api/v2/groups/:groupId/users/:userId', Auth.verifyToken, Group.deleteUserGroup);

// Create or send an email to a group
router.post('/api/v2/groups/:groupId/messages', Auth.verifyToken, Group.sendMailGroup);

module.exports = router;
