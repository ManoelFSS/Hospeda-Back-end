const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Permite requisições de qualquer origem
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
