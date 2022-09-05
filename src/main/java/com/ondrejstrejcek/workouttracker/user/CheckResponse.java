package com.ondrejstrejcek.workouttracker.user;

public class CheckResponse {
    private Boolean isAuthenticated;
    private Boolean isSuperUser;
    private String email;

    public CheckResponse(Boolean isAuthenticated, Boolean isSuperUser, String email) {
        this.isAuthenticated = isAuthenticated;
        this.isSuperUser = isSuperUser;
        this.email = email;
    }

    public Boolean getAuthenticated() {
        return isAuthenticated;
    }

    public Boolean getSuperUser() {
        return isSuperUser;
    }

    public String getEmail() {
        return email;
    }
}
