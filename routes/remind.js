const express = require('express');
const router = express.Router();
const db = require('../config/database.js');



// GET all reminders
router.get('/remind', (req, res) => {
  db.query('SELECT * FROM reminder', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET reminder ID
router.get('/ids', (req, res) => {
  const {id} = req.params;
  db.query('SELECT * FROM reminder WHERE reminder_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
});

// POST create reminder
router.post('/remind', (req, res) => {
  const { user_id, message, time } = req.body;
  db.query('INSERT INTO reminder (user_id, message, time) VALUES (?, ?, ?)', [user_id, message, time], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message, time });
  });
});

// PUT update reminder
router.put('/update', (req, res) => {
  const { id } = req.query;
  const { message, time } = req.body;
db.query('UPDATE reminder SET message = ?, time = ? WHERE reminder_id = ?', [message, time, id], (err) => {
  if (err) return res.status(500).json({ error: err.message });
  res.json({ message: 'Updated successfully' });
    });
});

    // DELETE reminder
   router.delete('/delete', (req, res) => {
    const {id} = req.query;
    db.query('DELETE FROM reminder WHERE reminder_id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `Deleted reminder with ID ${id}`});
    });
});

module.exports = router;
