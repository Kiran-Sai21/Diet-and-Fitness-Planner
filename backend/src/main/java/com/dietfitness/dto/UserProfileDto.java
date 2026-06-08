package com.dietfitness.dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UserProfileDto {
    private Long id;
    private String name;
    private String phone;
    private String username;
    private String gender;
    private Integer age;
    private Double heightCm;
    private Double weightKg;
    private String dietPreference;
    private String workoutLevel;
    private String goal;
    private Double bmi;
    private String role;
    private Integer rewardPoints;
    private Integer streakCount;
    private String badge;
}
