package com.dietfitness.repository;

import com.dietfitness.entity.WorkoutPlan;
import com.dietfitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {
    List<WorkoutPlan> findByWorkoutLevelAndGoalAndDayNumber(
            User.WorkoutLevel workoutLevel, User.Goal goal, Integer dayNumber);
    List<WorkoutPlan> findByWorkoutLevelAndGoal(User.WorkoutLevel workoutLevel, User.Goal goal);
}
