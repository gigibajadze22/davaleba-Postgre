import express from 'express'
import { getProducts, createProducts, editProducts, deleteProducts, getCategoryStats, buyProduct } from '../controllers/productController.js'
import { auth, isAdmin, isAdminOrManager } from '../middlewares/auth.js';

const productsRouter = express.Router();

productsRouter.route('/')
  .get(auth, getProducts)
  .post(auth, isAdminOrManager, createProducts);

productsRouter.route('/:id')
  .put(auth, isAdminOrManager, editProducts)
  .delete(auth, isAdminOrManager, deleteProducts);
  

productsRouter.route('/category-stats')
  .get(auth,isAdminOrManager, getCategoryStats);

productsRouter.route('/buyProduct/:id')
  .post(auth, buyProduct);

export default productsRouter;
