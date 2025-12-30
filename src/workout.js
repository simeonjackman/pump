import exercisesData from "./assets/exercises.json";
import formatsData from "./assets/formats.json";

export class Workout {
  constructor(config = {}) {
    // Default configuration
    this.config = {
      cardio_vs_strength: 50,
      difficulty: 50,
      length: 50,
      muscle_usage: {
        arms: 50,
        back: 50,
        abs: 50,
        legs: 50,
        chest: 50,
        glutes: 50
      }
    };

    this.exercises = exercisesData;
    this.formats = formatsData;
  }

  /**
   * Scores how well an exercise matches the workout config
   */
  scoreExercise(exercise) {
    let score = 0;

    // Cardio vs Strength
    score -= Math.abs(
      exercise.cardio_vs_strength - this.config.cardio_vs_strength
    );

    return score;
  }

  /**
   * Selects exercises + a format and builds a workout
   */
  workoutSelector() {
    // 1. Score exercises
    const scoredExercises = this.exercises
      .map(ex => ({
        ...ex,
        score: this.scoreExercise(ex)
      }))
      .sort((a, b) => b.score - a.score);

    // 2. Select number of exercises based on length (simple mapping)
    const exerciseCount = Math.max(
      3,
      Math.round(this.config.length / 20)
    );

    const selectedExercises = scoredExercises.slice(0, exerciseCount);

    // 3. Pick a format based on workout focus
    const selectedFormat = this.formats.find(
      f =>
        Math.abs(f.cardio_vs_strength - this.config.cardio_vs_strength) < 20
    ) || this.formats[0];

    // 4. Return structured workout
    return {
      config: this.config,
      formats: selectedFormat,
      exercises: selectedExercises.map(({ score, ...ex }) => ex)
    };
  }
}