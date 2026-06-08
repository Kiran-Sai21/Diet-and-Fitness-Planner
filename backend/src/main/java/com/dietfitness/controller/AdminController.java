package com.dietfitness.controller;

import com.dietfitness.dto.UserProfileDto;
import com.dietfitness.entity.*;
import com.dietfitness.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<UserProfileDto>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/meals")
    public ResponseEntity<List<MealPlan>> getAllMealPlans() {
        return ResponseEntity.ok(adminService.getAllMealPlans());
    }

    @PostMapping("/meals")
    public ResponseEntity<MealPlan> saveMealPlan(@RequestBody MealPlan mealPlan) {
        return ResponseEntity.ok(adminService.saveMealPlan(mealPlan));
    }

    @PutMapping("/meals/{id}")
    public ResponseEntity<MealPlan> updateMealPlan(@PathVariable Long id, @RequestBody MealPlan mealPlan) {
        mealPlan.setId(id);
        return ResponseEntity.ok(adminService.saveMealPlan(mealPlan));
    }

    @DeleteMapping("/meals/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable Long id) {
        adminService.deleteMealPlan(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/workouts")
    public ResponseEntity<List<WorkoutPlan>> getAllWorkoutPlans() {
        return ResponseEntity.ok(adminService.getAllWorkoutPlans());
    }

    @PostMapping("/workouts")
    public ResponseEntity<WorkoutPlan> saveWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        return ResponseEntity.ok(adminService.saveWorkoutPlan(workoutPlan));
    }

    @PutMapping("/workouts/{id}")
    public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@PathVariable Long id, @RequestBody WorkoutPlan workoutPlan) {
        workoutPlan.setId(id);
        return ResponseEntity.ok(adminService.saveWorkoutPlan(workoutPlan));
    }

    @DeleteMapping("/workouts/{id}")
    public ResponseEntity<Void> deleteWorkoutPlan(@PathVariable Long id) {
        adminService.deleteWorkoutPlan(id);
        return ResponseEntity.ok().build();
    }
}
