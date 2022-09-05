package com.ondrejstrejcek.workouttracker.exercise;

import com.ondrejstrejcek.workouttracker.user.Auth;
import com.ondrejstrejcek.workouttracker.user.AuthService;
import com.ondrejstrejcek.workouttracker.workout.Workout;
import com.ondrejstrejcek.workouttracker.workout.WorkoutService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@AllArgsConstructor
@Slf4j
public class ExerciseController {

    private ExerciseService exerciseService;
    private AuthService authService;
    private WorkoutService workoutService;

    @GetMapping
    public ResponseEntity<List<Exercise>> fetchAllExercises(){
        List<Exercise> exercises = exerciseService.fetchAllExercises();
        return ResponseEntity.ok().body(exercises);
    }

    @PostMapping("/create")
    public ResponseEntity<ExerciseRecord> createExerciseRecord(@RequestBody ExerciseRequest req){
        ExerciseRecord exercise = exerciseService.createExerciseRecord(req);
        return ResponseEntity.ok().body(exercise);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExerciseRecord> editExerciseRecord(@PathVariable Long id,@RequestBody ExerciseRequest req){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Auth user = authService.checkUser(currentPrincipalName);
        ExerciseRecord exercise = exerciseService.editExerciseRecord(req, user, id);
        return ResponseEntity.ok().body(exercise);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> editExerciseRecord(@PathVariable Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Auth user = authService.checkUser(currentPrincipalName);
        exerciseService.deleteExerciseRecord(user, id);
        return ResponseEntity.ok().body("Exercise deleted successfully");
    }

    @PostMapping("/admin/create")
    public ResponseEntity<Exercise> adminCreateExercise(@RequestBody Exercise req){
       Exercise exercise = exerciseService.createExercise(req.getTitle());
       return ResponseEntity.ok().body(exercise);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<List<ExerciseRecord>> fetchWorkoutExercises(@PathVariable Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Auth user = authService.checkUser(currentPrincipalName);
        Workout workout = workoutService.getWorkoutByUserAndId(user, id);
        List<ExerciseRecord> exercises = exerciseService.getWorkoutExercises(workout);
        return ResponseEntity.ok().body(exercises);
    }


}
