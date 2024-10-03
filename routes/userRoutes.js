const express = require('express');
const { registerUser, loginUser, updateUser, deleteUser, verifyToken } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para registro de usuário
router.post('/register', registerUser);

// Rota para login
router.post('/login', loginUser);

// Rota para verificar o token
router.get('/verify-token', verifyToken); // Adiciona esta linha

// Rotas protegidas para atualizar e deletar
router.put('/:id', protect, updateUser);

router.delete('/:id', protect, deleteUser);

module.exports = router;
