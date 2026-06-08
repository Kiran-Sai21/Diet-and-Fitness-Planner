package com.dietfitness.repository;

import com.dietfitness.entity.MealPlan;
import com.dietfitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    List<MealPlan> findByDietPreferenceAndGoalAndDayNumber(
            User.DietPreference dietPreference, User.Goal goal, Integer dayNumber);
    List<MealPlan> findByDietPreferenceAndGoal(User.DietPreference dietPreference, User.Goal goal);
}
