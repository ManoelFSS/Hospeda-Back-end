const express = require('express');
const { registerUser, updateUser, deleteUser,} = require('../controllers/userControllers/userDatabaseController');
const { loginUser, verifyToken, refreshToken } = require('../controllers/userControllers/authController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para registro de usuário
router.post('/register', registerUser);

// Rota para login
router.post('/login', loginUser);

// Rota para verificar o token
router.get('/verify-token', verifyToken); // Adiciona esta linha

// Rota para renovar token
router.post('/refresh-token', refreshToken);


// Rotas protegidas para atualizar e deletar
router.put('/:id', protect, updateUser);

router.delete('/:id', protect, deleteUser);

module.exports = router;
