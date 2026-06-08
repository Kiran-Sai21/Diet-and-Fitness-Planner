package com.dietfitness.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "meal_plans")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class MealPlan {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Column(name = "food_item", nullable = false, length = 200)
    private String foodItem;

    @Column(nullable = false)
    private Integer calories;

    @Column(nullable = false)
    private Double proteins;

    @Column(nullable = false)
    private Double carbs;

    @Column(nullable = false)
    private Double fats;

    @Enumerated(EnumType.STRING)
    @Column(name = "diet_preference", nullable = false)
    private User.DietPreference dietPreference;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private User.Goal goal;

    @Column(name = "day_number")
    private Integer dayNumber;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }

    public enum MealType { BREAKFAST, LUNCH, SNACK, DINNER }
}
