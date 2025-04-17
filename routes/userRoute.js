import express from 'express';
import upload from '../middlewares/uploadFile.js'
import { getUsers, createUser, editUser, deleteUser, signup,signin,getUserInfo, forgotPassword, resetPassword, uploadPicture} from '../controllers/userController.js';
import { auth, isAdmin } from '../middlewares/auth.js';
const usersRouter = express.Router();

usersRouter.route('/').get(auth, isAdmin,getUsers).post(auth,isAdmin,createUser);
usersRouter.route('/:id').put(auth,isAdmin,editUser).delete(auth, isAdmin,deleteUser);
usersRouter.route('/signup').post(signup)
usersRouter.route('/signin').post(signin)
usersRouter.route('/profile').get(auth , getUserInfo);
usersRouter.route('/forgot-password').post(forgotPassword)
usersRouter.route('/reset-password').post(resetPassword)
usersRouter.route('/upload-picture').post(auth,upload.single('profilePicture'),uploadPicture)
export default usersRouter;
