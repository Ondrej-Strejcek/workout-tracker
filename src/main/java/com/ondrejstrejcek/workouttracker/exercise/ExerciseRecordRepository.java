package com.ondrejstrejcek.workouttracker.exercise;

import com.ondrejstrejcek.workouttracker.workout.Workout;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ExerciseRecordRepository extends CrudRepository<ExerciseRecord, Long> {

    List<ExerciseRecord> findAllByWorkout(Workout workout);
}
