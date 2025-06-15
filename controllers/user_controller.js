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
            res.status(201).json({ message: 'Pendaftaran akun berhasil' });
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

        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '5h',
        });

        userModel.saveOrUpdateRefreshToken(user.id, refreshToken, (err, result) => {
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                maxAge: 60 * 1000,
            });

            res.status(200).json({ 
                message: 'Berhasil masuk ke akun anda', 
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    phone: user.phone,
                    birth_date: user.birth_date,
                    city: user.city,
                    occupation: user.occupation,
                    email: user.email,
                },
            });
        });
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

const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token tidak ditemukan' });

    userModel.findByRefreshToken(refreshToken, (err, results) => {
        if (err || !results.length) return res.status(403).json({ message: 'Refresh token tidak valid' });

        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Refresh token tidak valid' });

            const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
                expiresIn: '20s',
            });

            res.status(200).json({ accessToken: newAccessToken });
        });
    });
};

const logout = (req, res) => {
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: 'User tidak ditemukan' });

  userModel.deleteRefreshTokenByUserId(userId, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal logout' });
    res.status(200).json({ message: 'Berhasil logout' });
  });
};

module.exports = {
    register,
    login,
    resetPassword,
    refreshToken,
    logout,
};