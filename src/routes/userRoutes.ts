import express from 'express';
import userController from '../controllers/UserController';
import UserAuth from '../middlewares/UserAuth';

const { signup, login } = userController;
const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', UserAuth, signup)
//login routeb
router.post('/login', login );

export default router;