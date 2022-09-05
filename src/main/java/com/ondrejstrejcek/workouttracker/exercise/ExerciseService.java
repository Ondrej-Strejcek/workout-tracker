package com.ondrejstrejcek.workouttracker.exercise;

import com.ondrejstrejcek.workouttracker.user.Auth;
import com.ondrejstrejcek.workouttracker.workout.Workout;
import com.ondrejstrejcek.workouttracker.workout.WorkoutRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ExerciseService {

    private ExerciseRepository exerciseRepository;
    private ExerciseRecordRepository exerciseRecordRepository;
    private WorkoutRepository workoutRepository;

    public List<Exercise> fetchAllExercises(){
        List<Exercise> exercises = (List<Exercise>) exerciseRepository.findAll();
        return exercises;
    }

    public Exercise createExercise(String title) {
        Exercise exercise = new Exercise(title);
        Exercise created = exerciseRepository.save(exercise);
        return created;
    }

    public ExerciseRecord createExerciseRecord(ExerciseRequest req){
        ExerciseRecord exercise = new ExerciseRecord();
        Optional<Workout> workoutOptional = workoutRepository.findById(req.getWorkout());
        if(!workoutOptional.isPresent()){
            throw new IllegalStateException("Workout not found");
        }
        exercise.setWorkout(workoutOptional.get());
        exercise.setExercise(req.getExercise());
        exercise.setReps(req.getReps());
        exercise.setWeight(req.getWeight());
        exercise.setRpe(req.getRpe());
        return exerciseRecordRepository.save(exercise);
    }
    public List<ExerciseRecord> getWorkoutExercises(Workout workout){
        return exerciseRecordRepository.findAllByWorkout(workout);
    }

    @Transactional
    public ExerciseRecord editExerciseRecord(ExerciseRequest req, Auth user, Long id) {
        Optional<ExerciseRecord> exerciseRecordOptional = exerciseRecordRepository.findById(id);
        if(!exerciseRecordOptional.isPresent()){
            throw new IllegalStateException("Exercise not found");
        }
        ExerciseRecord exerciseRecord = exerciseRecordOptional.get();
        if(!exerciseRecord.getWorkout().getUser().equals(user)){
            throw new IllegalStateException("Does not have permission to edit");
        }
        exerciseRecord.setWeight(req.getWeight());
        exerciseRecord.setRpe(req.getRpe());
        exerciseRecord.setReps(req.getReps());
        return exerciseRecord;
    }

    public void deleteExerciseRecord(Auth user,Long id){
        Optional<ExerciseRecord> exerciseRecordOptional = exerciseRecordRepository.findById(id);
        if(!exerciseRecordOptional.isPresent()){
            throw new IllegalStateException("Exercise not found");
        }
        ExerciseRecord exerciseRecord = exerciseRecordOptional.get();
        if(!exerciseRecord.getWorkout().getUser().equals(user)){
            throw new IllegalStateException("Does not have permission to edit");
        }
        exerciseRecordRepository.delete(exerciseRecord);
    }
}

