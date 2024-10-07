const { z } = require('zod');

// Validação para o registro de usuário
const registerValidation = z.object({
  name: z.string().min(3, 'Nome é obrigatório'),
  phone: z.string().optional(), // Adicione aqui, se necessário
  dataNasc: z.date().optional(), // Exemplo para data de nascimento
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  empresa: z.string().min(3, 'Nome da empresa é obrigatório'), // Validação para o nome da empresa
  cnpj: z.string().length(14, 'CNPJ deve ter 14 caracteres') // Validação para o CNPJ, ajustado para 14 caracteres
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
