package com.ondrejstrejcek.workouttracker.workout;

import com.ondrejstrejcek.workouttracker.user.Auth;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends CrudRepository<Workout, Long> {

    List<Workout> findAllByUser(Auth user);

    Workout findOneByUserAndId(Auth user, Long id);
}
