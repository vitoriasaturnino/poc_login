//importing modules
import express from 'express';
import userController from '../controllers/UserController';
import userAuth from '../middlewares/UserAuth';

const { signup, login } = userController;
const router = express.Router();

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup);

//login route
router.post('/login', login );

export default router;