const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user_route.js');
const categoryRoute = require('./routes/category_route.js'); // Import category route
const articleRoute = require('./routes/article_route.js'); // Import article route
const workoutRoute = require("./routes/workout_route.js");
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use('/api/user', userRoute);
app.use('/api/categories', categoryRoute); // Menggunakan route kategori
app.use('/api/articles', articleRoute); // Route artikel
app.use("/api/workouts", workoutRoute);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
