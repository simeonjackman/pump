export class Exercise {
  constructor(json) {
    if (!json || typeof json !== "object") {
      throw new Error("Invalid exercise data");
    }

    this.name = json.name ?? "";
    this.description = json.description ?? "";
    this.cardio_vs_strength = Number(json.cardio_vs_strength ?? 50);
    this.rep_length = Number(json.rep_length ?? 0);
    this.difficulty = Number(json.difficulty ?? 50);

    this.muscle_usage = {
      arms: Number(json.muscle_usage?.arms ?? 0),
      back: Number(json.muscle_usage?.back ?? 0),
      abs: Number(json.muscle_usage?.abs ?? 0),
      legs: Number(json.muscle_usage?.legs ?? 0),
      chest: Number(json.muscle_usage?.chest ?? 0),
      glutes: Number(json.muscle_usage?.glutes ?? 0)
    };
  }

  /* -----------------------------
     Utility helpers
  ----------------------------- */

  toVector() {
  return [
    this.cardio_vs_strength,
    this.muscle_usage.arms,
    this.muscle_usage.back,
    this.muscle_usage.abs,
    this.muscle_usage.legs,
    this.muscle_usage.chest,
    this.muscle_usage.glutes
  ];
}

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      cardio_vs_strength: this.cardio_vs_strength,
      rep_length: this.rep_length,
      difficulty: this.difficulty,
      muscle_usage: { ...this.muscle_usage }
    };
  }
}