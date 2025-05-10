const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user_route.js');
const Remind = require('./routes/remind.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/api/user', userRoute);
app.use('/api/reminder', Remind);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});