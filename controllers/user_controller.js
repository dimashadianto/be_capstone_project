const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user_model.js');

require('dotenv').config();

const register = (req, res) => {
    const { name, email, phone, password } = req.body;
    
    userModel.findUserByEmail(email, async (err, results) => {
        if (results.length) {
            return res.status(400).json({ message: 'Email yang digunakan sudah terdaftar' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, phone, password: hashedPassword };
        
        userModel.createUser(newUser, (err, result) => {
            if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            res.status(201).json({ message: 'Registrasi berhasil' });
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;
    
    userModel.findUserByEmail(email, async (err, results) => {
        if (!results.length) {
            return res.status(401).json({ message: 'Email atau kata sandi salah' });
        }
        
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Email atau kata sandi salah' });
        
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login berhasil', token });
    });
};

const resetPassword = async (req, res) => {
    const { email, password } = req.body;

    userModel.findUserByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });

        if (!results.length) {
            return res.status(400).json({ message: 'Email tidak ditemukan' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const updateUser = { email, password: hashedPassword };

        userModel.resetPassword(updateUser, (err, result) => {
            if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
            res.status(200).json({ message: 'Kata sandi berhasil diubah' });
        });
    });
};

module.exports = {
    register,
    login,
    resetPassword
};