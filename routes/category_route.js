const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category_controller.js');
const categoryValidation = require('../middlewares/validations/category_validations.js');

// Route untuk menampilkan semua kategori
router.get('/', categoryController.getAllCategories);

// Route untuk menambahkan kategori baru
router.post('/add', categoryValidation.validateCategory, categoryController.addCategory);

// Route untuk mengupdate kategori
router.put('/update/:id', categoryController.updateCategory);

// Route untuk menghapus kategori
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;
