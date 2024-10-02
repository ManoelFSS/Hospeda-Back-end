const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validations/userValidation');

// Gera o token JWT
const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Registrar novo usuário
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validação do input
    const validation = registerValidation.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já registrado' });
    }

    // Cria um novo usuário
    const user = await User.create({ email, password });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login de usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validação do input
    const validation = loginValidation.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar usuário
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deletar usuário
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json({ message: 'Usuário deletado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verifica o token JWT
const verifyToken =  (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtém o token do cabeçalho
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Erro ao verificar token:', err);
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    // Caso o token seja válido, você pode retornar mais informações do usuário
    res.status(200).json({
      message: 'Token válido',
      email: decoded.email,
      userId: decoded.userId, // Se tiver um userId ou outro dado no token
      nome: decoded.nome, // Se o nome do usuário estiver no token, por exemplo
      token: token,
    });
  });
};



module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  verifyToken,
};
