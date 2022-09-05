package com.ondrejstrejcek.workouttracker.workout;

import com.ondrejstrejcek.workouttracker.user.Auth;
import com.ondrejstrejcek.workouttracker.user.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@AllArgsConstructor
public class WorkoutController {

    private WorkoutService workoutService;
    private AuthService authService;

    @GetMapping
    public ResponseEntity<List<Workout>> fetchAllUsersWorkouts(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Auth user = authService.checkUser(currentPrincipalName);
        List<Workout> workouts = workoutService.getUserWorkouts(user);
        return ResponseEntity.ok().body(workouts);
    }

    @PostMapping("/create")
    public ResponseEntity<Workout> createWorkout(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Auth user = authService.checkUser(currentPrincipalName);
        Workout newWorkout = workoutService.createWorkout(user);
        return ResponseEntity.ok().body(newWorkout);
    }

    @DeleteMapping(path = "{id}")
    //TODO:
    public ResponseEntity<String> deleteWorkout(@PathVariable Long id){
        return ResponseEntity.ok().body("Workout deleted");
    }

}
