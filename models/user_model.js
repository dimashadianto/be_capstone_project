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

module.exports = {
    findUserByEmail,
    createUser,
    resetPassword
};