const express = require('express');
const router = express.Router();
const bmiController = require('../controllers/bmi_controller');

router.post('/', bmiController.calculateBMI);

module.exports = router;