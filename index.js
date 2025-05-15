const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user_route.js');
require('dotenv').config();
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())

app.use(bodyParser.json());

app.use('/api/user', userRoute);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});