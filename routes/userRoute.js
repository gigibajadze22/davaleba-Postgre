import express from 'express';
import { getUsers, createUser, editUser, deleteUser, signup,signin,getUserInfo} from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
const usersRouter = express.Router();

usersRouter.route('/').get(getUsers).post(createUser);
usersRouter.route('/:id').put(editUser).delete(deleteUser);
usersRouter.route('/signup').post(signup)
usersRouter.route('/signin').post(signin)
usersRouter.route('/profile').get(auth, getUserInfo);
export default usersRouter;
