// controllers/userControllers/authController.js
const jwt = require('jsonwebtoken');
const { User } = require('../../models/userModel');
const { loginValidation } = require('../../validations/userValidation');

// Gera o token JWT
const generateToken = (id, email) => {
    return jwt.sign({ _id: id, email }, process.env.JWT_SECRET, { expiresIn: '1m' });
};

const generateRefreshToken = (id, email) => {
    return jwt.sign({ _id: id, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2m' }); // Expira em 2h dias
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
            const accessToken = generateToken(user._id, user.email);  // Gera o access token
            const refreshToken = generateRefreshToken(user._id, user.email);  // Gera o refresh token

            return res.json({
                _id: user._id,
                email: user.email,
                token: accessToken,           // Retorna o access token
                refreshToken: refreshToken,   // Retorna o refresh token
            });
        }

        res.status(401).json({ message: 'Credenciais inválidas' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Verifica o token JWT
const verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expirado', canRenew: true });
        }
        return res.status(401).json({ message: 'Token inválido' });
        }

        res.status(200).json({
        message: 'Token válido',
        email: decoded.email,
        userId: decoded._id,
        });
    });
};

// Função para renovar o token
const refreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(403).json({ message: 'Refresh token não fornecido' });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Refresh token inválido' });
        }

        const newAccessToken = generateToken(decoded._id, decoded.email);  // Gera um novo access token
        res.status(200).json({ accessToken: newAccessToken });
    });
};


module.exports = {
    loginUser,
    verifyToken,
    refreshToken,
};
