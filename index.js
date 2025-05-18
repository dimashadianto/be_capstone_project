const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user_route.js');
require('dotenv').config();
var cors = require('cors')
import bmi_route from './routes/bmi_route.js';
import calorie_route from './routes/calorie_route.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())

app.use(bodyParser.json());

app.use('/api/user', userRoute);

app.use('/api/bmi, bmi_route');
app.use('/api/calorie, calorie_route');

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});