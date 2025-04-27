const db = require('../config/database.js');

// Mendapatkan semua kategori
const getAllCategories = (callback) => {
  db.query('SELECT * FROM article_categories', callback);
};

// Menambahkan kategori baru
const addCategory = (category, callback) => {
  db.query('INSERT INTO article_categories (name) VALUES (?)', [category.name], callback);
};

module.exports = {
  getAllCategories,
  addCategory
};
