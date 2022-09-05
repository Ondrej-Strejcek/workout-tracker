package com.ondrejstrejcek.workouttracker.exercise;


import com.ondrejstrejcek.workouttracker.workout.Workout;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name="exercise")
@NoArgsConstructor
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;

    public Exercise(String title){
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
