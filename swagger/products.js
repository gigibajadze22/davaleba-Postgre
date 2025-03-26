/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           type: string
 *           description: The category of the product
 *         stock:
 *           type: integer
 *           description: The stock quantity of the product
 *         archived:
 *           type: boolean
 *           description: Whether the product is archived
 * 
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       "200":
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "201":
 *         description: Product created successfully
 *       "400":
 *         description: Invalid input
 * 
 * /api/products/{id}:
 *   put:
 *     summary: Edit an existing product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       "200":
 *         description: Product updated successfully
 *       "404":
 *         description: Product not found
 * 
 *   delete:
 *     summary: Delete an existing product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: Product deleted successfully
 *       "404":
 *         description: Product not found
 * 
 * /api/products/category-stats:
 *   get:
 *     summary: Get product count per category
 *     tags: [Products]
 *     responses:
 *       "200":
 *         description: Category stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                     description: The product category
 *                   count:
 *                     type: integer
 *                     description: Number of products in the category
 * 
 * /api/products/buyProduct/{id}:
 *   post:
 *     summary: Buy a product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to buy
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user making the purchase
 *                 example: 1
 *     responses:
 *       "200":
 *         description: Product purchased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the product was purchased
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       "400":
 *         description: Product is out of stock
 *       "404":
 *         description: Product not found
 */
