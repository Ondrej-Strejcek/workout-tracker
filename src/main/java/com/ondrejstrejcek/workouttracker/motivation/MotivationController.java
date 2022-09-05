package com.ondrejstrejcek.workouttracker.motivation;


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@RestController
@RequestMapping("/api/motivation")
@Slf4j
public class MotivationController {

    @GetMapping
    public ResponseEntity<?> getMotivationQuotes(){
        try {
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://bodybuilding-quotes1.p.rapidapi.com/quotes?page=1"))
                .header("X-RapidAPI-Key", "2228e9c323mshf37fa6cfdc4b6c0p1fb73cjsnccff500ba103")
                .header("X-RapidAPI-Host", "bodybuilding-quotes1.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            return ResponseEntity.ok().body(response.body());
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
