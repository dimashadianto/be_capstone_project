const db = require('../config/database.js');

const findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

const createUser = (user, callback) => {
    db.query('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)', [user.name, user.email, user.phone, user.password], callback);
};

const resetPassword = (user, callback) => {
    db.query('UPDATE users SET password = ? WHERE email = ?', [user.password, user.email], callback);
};

const saveOrUpdateRefreshToken = (userId, token, callback) => {
    const sql = 'INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE token = VALUES(token)';
    db.query(sql, [userId, token], callback);
};


const findByRefreshToken = (refreshToken, callback) => {
    db.query('SELECT * FROM refresh_tokens WHERE token = ?', [refreshToken], callback);
};

const deleteRefreshTokenByUserId = (userId, callback) => {
    db.query('UPDATE refresh_tokens SET token = NULL WHERE user_id = ?', [userId], callback);
};

module.exports = {
    findUserByEmail,
    createUser,
    resetPassword,
    saveOrUpdateRefreshToken,
    findByRefreshToken,
    deleteRefreshTokenByUserId,
};