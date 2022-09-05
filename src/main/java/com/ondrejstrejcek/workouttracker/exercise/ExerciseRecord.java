package com.ondrejstrejcek.workouttracker.exercise;

import com.ondrejstrejcek.workouttracker.workout.Workout;

import javax.persistence.*;

@Entity
@Table
public class ExerciseRecord {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private Exercise exercise;

    private Integer rpe;
    private Integer weight;
    private Integer reps;

    @ManyToOne(cascade = CascadeType.DETACH)
    private Workout workout;


    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public Workout getWorkout() {
        return workout;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public Long getId() {
        return id;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Integer getRpe() {
        return rpe;
    }

    public void setRpe(Integer rpe) {
        this.rpe = rpe;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getReps() {
        return reps;
    }

    public void setReps(Integer reps) {
        this.reps = reps;
    }
}
