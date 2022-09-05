package com.ondrejstrejcek.workouttracker.workout;

import com.ondrejstrejcek.workouttracker.user.Auth;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class WorkoutService {

    private WorkoutRepository workoutRepository;

    public Workout createWorkout(Auth user){
       Workout workout = new Workout();
       LocalDate now = LocalDate.now();
       workout.setDate(now);
       workout.setUser(user);
       workoutRepository.save(workout);
       return workout;
    }

    public List<Workout> getUserWorkouts(Auth user){
        List<Workout> workout = workoutRepository.findAllByUser(user);
        return workout;
    }

    public Workout getWorkoutByUserAndId(Auth user, Long id) {
        Workout workout = workoutRepository.findOneByUserAndId(user,id);
        return workout;
    }
}
