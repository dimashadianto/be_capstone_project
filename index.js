const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/user_route.js');
const categoryRoute = require('./routes/category_route.js'); 
const articleRoute = require('./routes/article_route.js');
const workoutRoute = require('./routes/workout_route.js'); 
const bmi_route = require('./routes/bmi_route.js');
const calorie_route = require('./routes/calorie_route.js');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/user', userRoute);
app.use('/api/categories', categoryRoute); 
app.use('/api/articles', articleRoute); 
app.use('/api/workouts', workoutRoute); 
app.use('/api/bmi', bmi_route);
app.use('/api/calorie', calorie_route);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
