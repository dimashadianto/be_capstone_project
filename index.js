const express = require('express');
const cors = require('cors');
const app = express();
const remindRoutes = require('./routes/remind');
const userRoutes = require('./routes/user_route');
const PORT = process.env.PORT || 8080;

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api', remindRoutes);     
app.use('/api/user', userRoutes);  

app.listen(PORT, () => {

  console.log(`Server running at http://localhost:${PORT}`);

});

 