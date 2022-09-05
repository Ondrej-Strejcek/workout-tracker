package com.ondrejstrejcek.workouttracker.exercise;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ExerciseRequest {

    private Long workout;
    private Integer weight;
    private Integer reps;
    private Integer rpe;
    private Exercise exercise;

    public Long getWorkout() {
        return workout;
    }

    public Integer getWeight() {
        return weight;
    }

    public Integer getReps() {
        return reps;
    }

    public Integer getRpe() {
        return rpe;
    }

    public Exercise getExercise() {
        return exercise;
    }
}
