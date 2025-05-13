const workoutModel = require("../models/workout_model.js");

const getCategories = (req, res) => {
  workoutModel.getCategories((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
    res.status(200).json(results);
  });
};

const getWorkoutPlansByCategory = (req, res) => {
  const { categoryId } = req.params;

  workoutModel.getWorkoutPlansByCategory(categoryId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
    res.status(200).json(results);
  });
};

const getExercisesByWorkoutPlan = (req, res) => {
  const { workoutPlanId } = req.params;

  workoutModel.getExercisesByWorkoutPlan(workoutPlanId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  getCategories,
  getWorkoutPlansByCategory,
  getExercisesByWorkoutPlan,
};
