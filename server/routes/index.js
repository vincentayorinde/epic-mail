import express from 'express';
import userController from '../controllers/users';

const router = express.Router();

router.post('/api/v1/auth/signup', userController.creatUser);
router.post('/api/v1/auth/signin', userController.userLogin);

module.exports = router;
