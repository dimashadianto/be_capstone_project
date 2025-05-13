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

// Fungsi untuk mengupdate kategori
const updateCategory = (req, res) => {
  const { id } = req.params; // Mengambil id kategori dari URL
  const { name } = req.body; // Mengambil nama kategori dari body request

  categoryModel.updateCategory(id, name, (err, result) => {
    if (err) {
      console.error('Error updating category:', err); // Menambahkan log error
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    res.status(200).json({ message: 'Kategori berhasil diperbarui' });
  });
};


// Fungsi untuk menghapus kategori
const deleteCategory = (req, res) => {
  const { id } = req.params;

  categoryModel.deleteCategory(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    res.status(200).json({ message: 'Kategori berhasil dihapus' });
  });
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
};
