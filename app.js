const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();

// Permite requisições de qualquer origem
app.use(cors({
    origin: 'https://hospedaplus.com.br', // Permite requisições somente dessa origem
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    credentials: true // Permite o uso de cookies e credenciais
})); 

app.use(express.json());


// Usando as rotas de usuários na URL base /api
app.use('/api', userRoutes);
// app.use('/api/users', userRoutes);

// Rota inicial
app.get('/', (req, res) => {
    res.send('API rodando...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
