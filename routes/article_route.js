// routes/article_route.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller.js');

// Route untuk menampilkan semua artikel
router.get('/', articleController.getAllArticles);

//// Route untuk mendapatkan artikel berdasarkan ID
router.get('/:id', articleController.getArticleById);

// Route untuk menampilkan artikel berdasarkan kategori
router.get('/category/:categoryId', articleController.getArticlesByCategory);

// Route untuk menambahkan artikel baru
router.post('/add', articleController.addArticle);

//Route update article
router.put('/update/:id', articleController.updateArticle);

// Route untuk delete artikel
router.delete('/delete/:id', articleController.deleteArticle);

module.exports = router;
