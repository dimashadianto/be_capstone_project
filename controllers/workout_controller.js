const workoutModel = require("../models/workout_model.js");

const getAllWorkoutPlans = (req, res) => {
  workoutModel.getAllWorkoutPlans((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }

    res.status(200).json(results);
  });
};

const getWorkoutPlanById = (req, res) => {
  const { id } = req.params;

  workoutModel.getWorkoutPlanById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Workout plan tidak ditemukan" });
    }

    res.status(200).json(results[0]);
  });
};

module.exports = {
  getAllWorkoutPlans,
  getWorkoutPlanById,
};
