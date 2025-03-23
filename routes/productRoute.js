import express from 'express'
import { getProducts, createProducts, editProducts, deleteProducts,getCategoryStats } from '../controllers/productController.js'
const productsRouter = express.Router()


productsRouter.route('/').get(getProducts).post(createProducts)
productsRouter.route('/:id').put(editProducts).delete(deleteProducts)
productsRouter.route('/category-stats').get(getCategoryStats)

export default productsRouter