const { z } = require('zod');

// Validação para o registro de usuário
const registerValidation = z.object({
  name: z.string().min(2, { message: "O nome é obrigatório." }),
  phone: z.string().min(14, { message: "O número de celular deve ter no mínimo 10 dígitos." }),
  dataNasc: z.string().min(10, { message: "A data de nascimento é obrigatória." }),
  rg: z.string().min(9, { message: "O RG deve ter no mínimo 9 caracteres." }),
  cpf: z.string().min(11, { message: "O CPF deve ter no mínimo 11 caracteres." }),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  empresa: z.string().min(3, 'Nome da empresa é obrigatório'), // Validação para o nome da empresa
  cnpj: z.string().length(18, 'CNPJ deve ter 18 caracteres').optional() // Validação para o CNPJ, ajustado para 14 caracteres
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
