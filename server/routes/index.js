import express from 'express';
import userController from '../controllers/users';

const router = express.Router();

router.post('/api/v1/auth/signup', userController.creatUser);

module.exports = router;
