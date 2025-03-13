const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 */
router.post('/login', loginUser);

module.exports = router;
