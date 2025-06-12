const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.get('/remind', reminderController.getAllReminders);
router.get('/ids/:id', reminderController.getReminderById);
router.post('/remind', reminderController.createReminder);
router.put('/update', reminderController.updateReminder);
router.delete('/delete', reminderController.deleteReminder);

module.exports = router;
