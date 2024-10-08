const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  dataNasc: { type: Date },
  rg: { type: String },
  cpf: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  empresa: { type: String },
  cnpj: { type: String },
  createdAt: { type: Date, default: Date.now }, // Data de criação
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }, // Referência ao modelo de usuários
});

const Hotel = mongoose.model('Hoteis', companySchema);

// Método para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar senhas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('Users', userSchema);

module.exports = {User, Hotel};
