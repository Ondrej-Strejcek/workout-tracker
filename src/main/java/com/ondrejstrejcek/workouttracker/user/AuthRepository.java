package com.ondrejstrejcek.workouttracker.user;

import org.springframework.data.repository.CrudRepository;

public interface AuthRepository extends CrudRepository<Auth, Long> {

    Auth findByUsername(String username);
}
