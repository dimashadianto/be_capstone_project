const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js');
const userValidation = require('../middlewares/validations/user_validation.js');

router.post('/register', userValidation.validateFields, 
    userValidation.validateEmail, 
    userValidation.validatePhoneNumber,
    userValidation.validatePassword,
    userController.register);
router.post('/login', userController.login);
router.post('/reset-password', userValidation.validateEmail, 
    userValidation.validatePassword,
    userController.resetPassword);

module.exports = router;