package com.dietfitness.service;

import com.dietfitness.dto.UserProfileDto;
import com.dietfitness.entity.*;
import com.dietfitness.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final MealPlanRepository mealPlanRepository;
    private final WorkoutPlanRepository workoutPlanRepository;

    public List<UserProfileDto> getAllUsers() {
        return userRepository.findByRole(User.Role.USER).stream()
                .map(u -> UserProfileDto.builder()
                        .id(u.getId()).name(u.getName()).username(u.getUsername())
                        .workoutLevel(u.getWorkoutLevel().name()).goal(u.getGoal().name())
                        .rewardPoints(u.getRewardPoints()).streakCount(u.getStreakCount())
                        .badge(DashboardService.getBadge(u.getRewardPoints()))
                        .build())
                .toList();
    }

    public List<MealPlan> getAllMealPlans() { return mealPlanRepository.findAll(); }
    public MealPlan saveMealPlan(MealPlan mealPlan) { return mealPlanRepository.save(mealPlan); }
    public void deleteMealPlan(Long id) { mealPlanRepository.deleteById(id); }

    public List<WorkoutPlan> getAllWorkoutPlans() { return workoutPlanRepository.findAll(); }
    public WorkoutPlan saveWorkoutPlan(WorkoutPlan workoutPlan) { return workoutPlanRepository.save(workoutPlan); }
    public void deleteWorkoutPlan(Long id) { workoutPlanRepository.deleteById(id); }
}
