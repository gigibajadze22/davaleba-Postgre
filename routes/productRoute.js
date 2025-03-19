import express from 'express'
import { getProducts, createProducts, editProducts, deleteProducts } from '../controllers/productController.js'
const productsRouter = express.Router()


productsRouter.route('/').get(getProducts).post(createProducts)
productsRouter.route('/:id').put(editProducts).delete(deleteProducts)

export default productsRouter