const { z } = require('zod');

// Validação para o registro de usuário
const registerValidation = z.object({
  // name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

// Validação para o login de usuário
const loginValidation = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});

module.exports = {
  registerValidation,
  loginValidation,
};
