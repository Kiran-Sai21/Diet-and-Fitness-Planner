package com.dietfitness.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workout_plans")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class WorkoutPlan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exercise_name", nullable = false, length = 200)
    private String exerciseName;

    @Column(nullable = false, length = 50)
    private String reps;

    @Column(nullable = false)
    @Builder.Default
    private Integer sets = 3;

    @Column(length = 100)
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "workout_level", nullable = false)
    private User.WorkoutLevel workoutLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private User.Goal goal;

    @Column(name = "day_number")
    private Integer dayNumber;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}
