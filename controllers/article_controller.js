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

const getArticleById = (req, res) => {
  const { id } = req.params;

  articleModel.getArticleById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    res.status(200).json({ article: result[0] });
  });
};

const getArticlesByCategory = (req, res) => {
  const categoryId = req.params.categoryId;
  
  articleModel.getArticlesByCategory(categoryId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    res.status(200).json({ articles: results });
  });
};

const updateArticle = (req, res) => {
  const { id } = req.params;
  const { title, content, category_id, author_name, published_date, image_url } = req.body;

  const updatedArticle = { title, content, category_id, author_name, published_date, image_url };

  articleModel.updateArticle(id, updatedArticle, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    res.status(200).json({ message: 'Artikel berhasil diperbarui' });
  });
};

const deleteArticle = (req, res) => {
  const { id } = req.params;

  articleModel.deleteArticle(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    res.status(200).json({ message: 'Artikel berhasil dihapus' });
  });
};

const searchArticles = (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword tidak boleh kosong' });
  }

  articleModel.searchArticles(keyword, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }

    res.status(200).json({ articles: results });
  });
};

module.exports = {
  addArticle,
  getAllArticles,
  getArticlesByCategory,
  updateArticle,
  deleteArticle,
  getArticleById,
  searchArticles
};
