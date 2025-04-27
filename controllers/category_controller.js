const categoryModel = require('../models/category_models.js');

// Menampilkan semua kategori
const getAllCategories = (req, res) => {
  categoryModel.getAllCategories((err, results) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    res.status(200).json({ categories: results });
  });
};

// Menambahkan kategori baru
const addCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Nama kategori harus diisi' });
  }

  const newCategory = { name };
  categoryModel.addCategory(newCategory, (err, result) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    res.status(201).json({ message: 'Kategori berhasil ditambahkan' });
  });
};

module.exports = {
  getAllCategories,
  addCategory
};
