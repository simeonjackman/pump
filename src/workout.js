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
    // Define which properties make up the target vector for calculating a workout
    this.targetVector = [
      this.config.cardio_vs_strength,
      this.config.muscle_usage.arms,
      this.config.muscle_usage.back,
      this.config.muscle_usage.abs,
      this.config.muscle_usage.legs,
      this.config.muscle_usage.chest,
      this.config.muscle_usage.glutes,
    ];
  }

  /**
   * Scores how well an exercise matches the workout config
   */
  scoreExercise(exercise) {
    const exerciseVector = exercise.toVector();

    const score = cosineSimilarity(this.targetVector, exerciseVector);
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

function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must have the same dimensions");
  }

  // Calculate dot product: A·B = Σ(A[i] * B[i])
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);

  // Calculate magnitudes using Math.hypot()
  const magnitudeA = Math.hypot(...vecA);
  const magnitudeB = Math.hypot(...vecB);

  // Check for zero magnitude
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  // Calculate cosine similarity: (A·B) / (|A|*|B|)
  return dotProduct / (magnitudeA * magnitudeB);
}
