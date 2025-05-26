const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user_route.js');
const cors = require('cors');
const categoryRoute = require('./routes/category_route.js'); // Import category route
const articleRoute = require('./routes/article_route.js'); // Import article route
require('dotenv').config();
var cors = require('cors')

const app = express();

const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(cors())

app.use(bodyParser.json());

app.use('/api/user', userRoute);
app.use('/api/categories', categoryRoute); // Menggunakan route kategori
app.use('/api/articles', articleRoute); // Route artikel

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
