const validateCategory = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ message: 'Nama kategori harus diisi' });
    }
  
    next();
  };
  
  module.exports = {
    validateCategory
  };
  