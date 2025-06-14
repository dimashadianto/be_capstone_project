const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout_controller.js");
const { authenticateToken } = require("../middlewares/user_middleware.js");

router.get("/categories", authenticateToken, workoutController.getCategories);
router.get("/plans/:categoryId", authenticateToken, workoutController.getWorkoutPlansByCategory);
router.get(
  "/exercises/:workoutPlanId", authenticateToken,
  workoutController.getExercisesByWorkoutPlan
);

module.exports = router;
