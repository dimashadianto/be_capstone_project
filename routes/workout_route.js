const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout_controller.js");

router.get("/categories", workoutController.getCategories);
router.get("/plans/:categoryId", workoutController.getWorkoutPlansByCategory);
router.get(
  "/exercises/:workoutPlanId",
  workoutController.getExercisesByWorkoutPlan
);

module.exports = router;
