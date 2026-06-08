package com.dietfitness.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UpdateProfileRequest {

    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @Pattern(regexp = "^\\d{10,15}$", message = "Phone must contain only digits and be 10 to 15 digits long")
    private String phone;

    @Min(value = 10, message = "Age must be at least 10")
    @Max(value = 120, message = "Age must be at most 120")
    private Integer age;

    @DecimalMin(value = "50.0", message = "Height must be at least 50 cm")
    @DecimalMax(value = "300.0", message = "Height must be at most 300 cm")
    private Double heightCm;

    @DecimalMin(value = "20.0", message = "Weight must be at least 20 kg")
    @DecimalMax(value = "500.0", message = "Weight must be at most 500 kg")
    private Double weightKg;

    @Pattern(regexp = "^(VEG|NON_VEG)$", message = "Diet preference must be VEG or NON_VEG")
    private String dietPreference;

    @Pattern(regexp = "^(BEGINNER|INTERMEDIATE|HARD)$", message = "Workout level must be BEGINNER, INTERMEDIATE, or HARD")
    private String workoutLevel;

    @Pattern(regexp = "^(OVERALL_HEALTH|MUSCULAR_STRENGTH|WEIGHT_LOSS|DIABETIC_BP_CONTROL)$",
             message = "Goal must be OVERALL_HEALTH, MUSCULAR_STRENGTH, WEIGHT_LOSS, or DIABETIC_BP_CONTROL")
    private String goal;
}
