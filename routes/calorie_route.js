const express = require('express');
const router = express.Router();
const calorieController = require('../controllers/calorie_controller');

router.post('/', calorieController.calculateCalorie);

module.exports = router;