const db = require('../config/database.js');

// Mendapatkan semua kategori
const getAllCategories = (callback) => {
  db.query('SELECT * FROM article_categories', callback);
};

// Menambahkan kategori baru
const addCategory = (category, callback) => {
  db.query('INSERT INTO article_categories (name) VALUES (?)', [category.name], callback);
};


// Fungsi untuk mengupdate kategori
const updateCategory = (id, name, callback) => {
  db.query(
    'UPDATE article_categories SET name = ? WHERE id = ?',
    [name, id],
    (err, result) => {
      if (err) {
        console.error('Database error:', err); 
        return callback(err);
      }
      callback(null, result); 
    }
  );
};

// Fungsi untuk menghapus kategori
const deleteCategory = (id, callback) => {
  db.query('DELETE FROM article_categories WHERE id = ?', [id], callback);
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
};
