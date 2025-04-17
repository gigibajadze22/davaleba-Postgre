import express from 'express'
import { getProducts, createProducts, editProducts, deleteProducts, getCategoryStats, buyProduct,uploadProductsExel} from '../controllers/productController.js'
import { auth, isAdmin, isAdminOrManager } from '../middlewares/auth.js';
import upload from '../middlewares/uploadFile.js';

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


productsRouter.route('/upload-products-excel')
  .post(upload.single('products'),uploadProductsExel)

export default productsRouter;
