// controllers/userControllers/userController.js
const { User, Hotel } = require('../../models/userModel');
const { registerValidation } = require('../../validations/userValidation');

// Registrar novo usuário
const registerUser = async (req, res) => {
    const { name, phone, email, password } = req.body;

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
        const user = await User.create({ name, phone, email, password });

        // Cria um novo documento na coleção de empresas
        const newHotel = await Hotel.create({
        name: "",
        cnpj: "",
        address: "",
        number: "",
        city: "",
        state: "",
        cep: "",
        user_id: user._id,
        });

        res.status(201).json({
        _id: user._id,
        email: user.email,
        Hotel: newHotel,
        });

    } catch (error) {
        console.error("Erro ao registrar usuário ou empresa:", error);
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

module.exports = {
    registerUser,
    updateUser,
    deleteUser,
};
