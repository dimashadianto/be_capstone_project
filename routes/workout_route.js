const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout_controller.js");

router.get("/", workoutController.getAllWorkoutPlans);
router.get("/:id", workoutController.getWorkoutPlanById);

module.exports = router;
