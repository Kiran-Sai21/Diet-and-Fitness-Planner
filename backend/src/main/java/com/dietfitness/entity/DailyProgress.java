package com.dietfitness.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_progress", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "progress_date"}))
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DailyProgress {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "progress_date", nullable = false)
    private LocalDate progressDate;

    @Column(name = "meals_completed", columnDefinition = "TEXT")
    private String mealsCompleted; // comma-separated meal plan IDs

    @Column(name = "workouts_completed", columnDefinition = "TEXT")
    private String workoutsCompleted; // comma-separated workout plan IDs

    @Column(name = "all_tasks_done")
    @Builder.Default
    private Boolean allTasksDone = false;

    @Column(name = "points_earned")
    @Builder.Default
    private Integer pointsEarned = 0;

    @Column(name = "streak_at_time")
    @Builder.Default
    private Integer streakAtTime = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}
