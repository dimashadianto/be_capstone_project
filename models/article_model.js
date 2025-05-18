// models/article_model.js
const db = require('../config/database.js');

const createArticle = (article, callback) => {
  db.query(
    'INSERT INTO article (title, content, category_id, author_name, published_date, image_url) VALUES (?, ?, ?, ?, ?, ?)',
    [article.title, article.content, article.category_id, article.author_name, article.published_date, article.image_url],
    callback
  );
};

const getArticles = (callback) => {
  db.query('SELECT * FROM article', callback);
};

const getArticleById = (id, callback) => {
  db.query('SELECT * FROM article WHERE id = ?', [id], callback);
};


const getArticlesByCategory = (categoryId, callback) => {
  db.query('SELECT * FROM article WHERE category_id = ?', [categoryId], callback);
};

const updateArticle = (id, article, callback) => {
  db.query(
    'UPDATE article SET title = ?, content = ?, category_id = ?, author_name = ?, published_date = ?, image_url = ? WHERE id = ?',
    [article.title, article.content, article.category_id, article.author_name, article.published_date, article.image_url, id],
    callback
  );
};

const deleteArticle = (id, callback) => {
  db.query('DELETE FROM article WHERE id = ?', [id], callback);
};


module.exports = {
  createArticle,
  getArticles,
  getArticlesByCategory,
  updateArticle,
  deleteArticle,
  getArticleById 
};
