const db = require("../config/database.js");

const getCategories = (callback) => {
  const query = "SELECT id, name FROM workout_categories";
  db.query(query, callback);
};

const getWorkoutPlansByCategory = (categoryId, callback) => {
  const query = `
    SELECT id, name, description, image_url 
    FROM workout_plans 
    WHERE category_id = ?
  `;
  db.query(query, [categoryId], callback);
};

const getExercisesByWorkoutPlan = (workoutPlanId, callback) => {
  const query = `
    SELECT 
      e.name, 
      e.description, 
      e.image_url, 
      e.muscle_group,
      wpe.sets, 
      wpe.reps, 
      wpe.rest_interval_seconds, 
      wpe.notes
    FROM workout_plan_exercises wpe
    JOIN exercises e ON wpe.exercise_id = e.id
    WHERE wpe.workout_plan_id = ?
  `;
  db.query(query, [workoutPlanId], callback);
};

module.exports = {
  getCategories,
  getWorkoutPlansByCategory,
  getExercisesByWorkoutPlan,
};
