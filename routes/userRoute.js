import express from 'express';
import { getUsers, createUser, editUser, deleteUser, signup,signin,getUserInfo, forgotPassword, resetPassword} from '../controllers/userController.js';
import { auth, isAdmin } from '../middlewares/auth.js';
const usersRouter = express.Router();

usersRouter.route('/').get(auth, isAdmin,getUsers).post(auth,isAdmin,createUser);
usersRouter.route('/:id').put(auth,isAdmin,editUser).delete(auth, isAdmin,deleteUser);
usersRouter.route('/signup').post(signup)
usersRouter.route('/signin').post(signin)
usersRouter.route('/profile').get(auth , getUserInfo);
usersRouter.route('/forgot-password').post(forgotPassword)
usersRouter.route('/reset-password').post(resetPassword)
export default usersRouter;
