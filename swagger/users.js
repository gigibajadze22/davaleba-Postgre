/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the user
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         firstname:
 *           type: string
 *           description: The first name of the user
 *         lastname:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email address of the user
 * 
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       "200":
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: User created successfully
 *       "400":
 *         description: Invalid input
 * /api/users/{id}:
 *   put:
 *     summary: Edit an existing user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "200":
 *         description: User updated successfully
 *       "404":
 *         description: User not found
 * 
 *   delete:
 *     summary: Delete an existing user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: User deleted successfully
 *       "404":
 *         description: User not found
 * 
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *        - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: User registered successfully
 *       "400":
 *         description: Invalid input
 * 
 * /api/users/signin:
 *   post:
 *     summary: User sign-in
 *     description: Authenticates a user with email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 * /api/users/profile:
 *   get:
 *     summary: Get user profile information
 *     description: Fetches the authenticated user's profile information.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier for the user
 *                 firstname:
 *                   type: string
 *                   description: The first name of the user
 *                 lastname:
 *                   type: string
 *                   description: The last name of the user
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the user
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */