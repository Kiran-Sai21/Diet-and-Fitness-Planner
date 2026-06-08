package com.dietfitness.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 15)
    private String phone;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = false)
    private Integer age;

    @Column(name = "height_cm", nullable = false)
    private Double heightCm;

    @Column(name = "weight_kg", nullable = false)
    private Double weightKg;

    @Enumerated(EnumType.STRING)
    @Column(name = "diet_preference", nullable = false)
    private DietPreference dietPreference;

    @Enumerated(EnumType.STRING)
    @Column(name = "workout_level", nullable = false)
    private WorkoutLevel workoutLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Goal goal;

    private Double bmi;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.USER;

    @Column(name = "reward_points")
    @Builder.Default
    private Integer rewardPoints = 0;

    @Column(name = "streak_count")
    @Builder.Default
    private Integer streakCount = 0;

    @Column(name = "last_completed_date")
    private LocalDate lastCompletedDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        calculateBmi();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        calculateBmi();
    }

    public void calculateBmi() {
        if (heightCm != null && weightKg != null && heightCm > 0) {
            double heightM = heightCm / 100.0;
            double rawBmi = weightKg / (heightM * heightM);
            // Gender-specific adjustment
            if (gender == Gender.FEMALE) {
                rawBmi = rawBmi * 1.0; // WHO uses same formula; display context differs
            }
            this.bmi = Math.round(rawBmi * 100.0) / 100.0;
        }
    }

    public enum Gender { MALE, FEMALE }
    public enum DietPreference { VEG, NON_VEG }
    public enum WorkoutLevel { BEGINNER, INTERMEDIATE, HARD }
    public enum Goal { OVERALL_HEALTH, MUSCULAR_STRENGTH, WEIGHT_LOSS, DIABETIC_BP_CONTROL }
    public enum Role { USER, ADMIN }
}
