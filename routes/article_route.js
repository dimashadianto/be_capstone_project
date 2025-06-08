const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller.js');

// Route untuk menampilkan semua artikel
router.get('/', articleController.getAllArticles);

// Route untuk cari artikel berdasarkan judul 
router.get('/search', articleController.searchArticles);

// Route untuk menampilkan artikel berdasarkan kategori
router.get('/category/:categoryId', articleController.getArticlesByCategory);

// Route untuk mendapatkan artikel berdasarkan ID
router.get('/:id', articleController.getArticleById);

// Route untuk menambahkan artikel baru
router.post('/add', articleController.addArticle);

// Route untuk update artikel
router.put('/update/:id', articleController.updateArticle);

// Route untuk delete artikel
router.delete('/delete/:id', articleController.deleteArticle);

module.exports = router;
