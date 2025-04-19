const db = require("../config/database.js");

const getAllWorkoutPlans = (callback) => {
  const query = `
        SELECT wp.*, 
               JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'id', wpe.id,
                       'exercise_id', e.id,
                       'exercise_name', e.name,
                       'exercise_description', e.description,
                       'muscle_group', e.muscle_group,
                       'sets', wpe.sets,
                       'reps', wpe.reps,
                       'rest_interval', wpe.rest_interval_seconds,
                       'notes', wpe.notes
                   )
               ) as exercises
        FROM workout_plans wp
        LEFT JOIN workout_plan_exercises wpe ON wp.id = wpe.workout_plan_id
        LEFT JOIN exercises e ON wpe.exercise_id = e.id
        GROUP BY wp.id
    `;
  db.query(query, callback);
};

const getWorkoutPlanById = (id, callback) => {
  const query = `
        SELECT wp.*, 
               JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'id', wpe.id,
                       'exercise_id', e.id,
                       'exercise_name', e.name,
                       'exercise_description', e.description,
                       'muscle_group', e.muscle_group,
                       'sets', wpe.sets,
                       'reps', wpe.reps,
                       'rest_interval', wpe.rest_interval_seconds,
                       'notes', wpe.notes
                   )
               ) as exercises
        FROM workout_plans wp
        LEFT JOIN workout_plan_exercises wpe ON wp.id = wpe.workout_plan_id
        LEFT JOIN exercises e ON wpe.exercise_id = e.id
        WHERE wp.id = ?
        GROUP BY wp.id
    `;
  db.query(query, [id], callback);
};

module.exports = {
  getAllWorkoutPlans,
  getWorkoutPlanById,
};
