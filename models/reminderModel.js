const db = require('../config/database');

// Get all reminders
exports.getAllReminders = (callback) => {
  db.query('SELECT * FROM reminder', callback);
};

// Get reminder by ID
exports.getReminderById = (id, callback) => {
  db.query('SELECT * FROM reminder WHERE reminder_id = ?', [id], callback);
};

// Create new reminder
exports.createReminder = (user_id, message, time, callback) => {
  db.query('INSERT INTO reminder (user_id, message, time) VALUES (?, ?, ?)', [user_id, message, time], callback);
};

// Update reminder
exports.updateReminder = (id, message, time, callback) => {
  db.query('UPDATE reminder SET message = ?, time = ? WHERE reminder_id = ?', [message, time, id], callback);
};

// Delete reminder
exports.deleteReminder = (id, callback) => {
  db.query('DELETE FROM reminder WHERE reminder_id = ?', [id], callback);
};
