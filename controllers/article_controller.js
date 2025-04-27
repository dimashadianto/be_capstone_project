// controllers/article_controller.js
const articleModel = require('../models/article_model.js');

const addArticle = (req, res) => {
  const { title, content, category_id, author_name, published_date, image_url } = req.body;

  const newArticle = { title, content, category_id, author_name, published_date, image_url };

  articleModel.createArticle(newArticle, (err, result) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    res.status(201).json({ message: 'Artikel berhasil ditambahkan' });
  });
};

const getAllArticles = (req, res) => {
  articleModel.getArticles((err, results) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    res.status(200).json({ articles: results });
  });
};

const getArticlesByCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  
  articleModel.getArticlesByCategory(categoryId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    res.status(200).json({ articles: results });
  });
};

module.exports = {
  addArticle,
  getAllArticles,
  getArticlesByCategory,
};
