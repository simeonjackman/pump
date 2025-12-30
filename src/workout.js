import exercisesData from "./assets/exercises.json";
import formatsData from "./assets/formats.json";
import { Exercise } from "./exercise.js";

export class Workout {
  constructor(config = {}) {
    // Default configuration
    this.config = config;
    this.exercises = exercisesData.map(
      (exerciseJson) => new Exercise(exerciseJson)
    );
    this.formats = formatsData;
  }

  /**
   * Scores how well an exercise matches the workout config
   */
  scoreExercise(exercise) {
    const targetVector = [
      this.config.cardio_vs_strength,
      this.config.muscle_usage.arms,
      this.config.muscle_usage.back,
      this.config.muscle_usage.abs,
      this.config.muscle_usage.legs,
      this.config.muscle_usage.chest,
      this.config.muscle_usage.glutes,
    ];

    const exerciseVector = exercise.toVector();

    let score = 0;
    for (let i = 0; i < targetVector.length; i++) {
      score -= Math.abs(targetVector[i] - exerciseVector[i]);
    }
    return score;
  }

  /**
   * Selects exercises + a format and builds a workout
   */
  workoutSelector() {
    // 1. Score exercises
    const scoredExercises = this.exercises
      .map((ex) => ({
        ...ex,
        score: this.scoreExercise(ex),
      }))
      .sort((a, b) => b.score - a.score);

    // 2. Select number of exercises based on length (simple mapping)
    const exerciseCount = Math.max(3, Math.round(this.config.length / 20));

    const selectedExercises = scoredExercises.slice(0, exerciseCount);

    // 3. Pick a format based on workout focus
    const selectedFormat =
      this.formats.find(
        (f) =>
          Math.abs(f.cardio_vs_strength - this.config.cardio_vs_strength) < 20
      ) || this.formats[0];

    // 4. Return structured workout
    return {
      config: this.config,
      formats: selectedFormat,
      exercises: selectedExercises.map(({ score, ...ex }) => ex),
    };
  }
}
