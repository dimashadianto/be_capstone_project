const Reminder = require('../models/reminderModel');

exports.getAllReminders = (req, res) => {
  Reminder.getAllReminders((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getReminderById = (req, res) => {
  const { id } = req.params;
  Reminder.getReminderById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
};

exports.createReminder = (req, res) => {
  const { user_id, message, time } = req.body;
  Reminder.createReminder(user_id, message, time, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message, time });
  });
};

exports.updateReminder = (req, res) => {
  const { id } = req.query;
  const { message, time } = req.body;
  Reminder.updateReminder(id, message, time, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Updated successfully' });
  });
};

exports.deleteReminder = (req, res) => {
  const { id } = req.query;
  Reminder.deleteReminder(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Deleted reminder with ID ${id}` });
  });
};
