package com.dietfitness.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\d{10,15}$", message = "Phone must contain only digits and be 10 to 15 digits long")
    private String phone;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Gender is required")
    @Pattern(regexp = "^(MALE|FEMALE)$", message = "Gender must be MALE or FEMALE")
    private String gender;

    @NotNull(message = "Age is required")
    @Min(value = 10, message = "Age must be at least 10")
    @Max(value = 120, message = "Age must be at most 120")
    private Integer age;

    @NotNull(message = "Height is required")
    @DecimalMin(value = "50.0", message = "Height must be at least 50 cm")
    @DecimalMax(value = "300.0", message = "Height must be at most 300 cm")
    private Double heightCm;

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "20.0", message = "Weight must be at least 20 kg")
    @DecimalMax(value = "500.0", message = "Weight must be at most 500 kg")
    private Double weightKg;

    @NotBlank(message = "Diet preference is required")
    @Pattern(regexp = "^(VEG|NON_VEG)$", message = "Diet preference must be VEG or NON_VEG")
    private String dietPreference;

    @NotBlank(message = "Workout level is required")
    @Pattern(regexp = "^(BEGINNER|INTERMEDIATE|HARD)$", message = "Workout level must be BEGINNER, INTERMEDIATE, or HARD")
    private String workoutLevel;

    @NotBlank(message = "Goal is required")
    @Pattern(regexp = "^(OVERALL_HEALTH|MUSCULAR_STRENGTH|WEIGHT_LOSS|DIABETIC_BP_CONTROL)$",
             message = "Goal must be OVERALL_HEALTH, MUSCULAR_STRENGTH, WEIGHT_LOSS, or DIABETIC_BP_CONTROL")
    private String goal;
}
