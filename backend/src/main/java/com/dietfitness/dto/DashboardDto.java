package com.dietfitness.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DashboardDto {
    private UserProfileDto profile;
    private List<MealPlanDto> todayMeals;
    private List<WorkoutPlanDto> todayWorkouts;
    private List<MealPlanDto> tomorrowMeals;
    private List<WorkoutPlanDto> tomorrowWorkouts;
    private ProgressDto todayProgress;
    private WellnessTipsDto wellnessTips;
    private String quote;

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class MealPlanDto {
        private Long id;
        private String mealType;
        private String foodItem;
        private Integer calories;
        private Double proteins;
        private Double carbs;
        private Double fats;
        private Boolean completed;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class WorkoutPlanDto {
        private Long id;
        private String exerciseName;
        private String reps;
        private Integer sets;
        private String category;
        private Boolean completed;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class ProgressDto {
        private LocalDate date;
        private List<Long> completedMealIds;
        private List<Long> completedWorkoutIds;
        private Boolean allDone;
        private Integer pointsEarned;
        private Integer currentStreak;
        private Integer totalPoints;
        private String badge;
    }

    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class WellnessTipsDto {
        private String waterIntake;
        private String sleepRecommendation;
        private String additionalTip;
    }
}
