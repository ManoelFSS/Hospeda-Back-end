const { z } = require('zod');

// Validação para o registro de usuário
const registerValidation = z.object({
  name: z.string().min(2, { message: "O nome é obrigatório. Deve conter pelo menos 2 caracteres ex: Jó " }),
  phone: z.string().min(14, { message: "O número de celular deve ter no mínimo 10 dígitos." }),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
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
