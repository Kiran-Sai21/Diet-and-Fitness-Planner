package com.dietfitness.service;

import com.dietfitness.dto.*;
import com.dietfitness.entity.*;
import com.dietfitness.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final MealPlanRepository mealPlanRepository;
    private final WorkoutPlanRepository workoutPlanRepository;
    private final DailyProgressRepository dailyProgressRepository;

    private static final String[] QUOTES = {
        "The only bad workout is the one that didn't happen.",
        "Take care of your body. It's the only place you have to live.",
        "Fitness is not about being better than someone else. It's about being better than you used to be.",
        "Your body can stand almost anything. It's your mind that you have to convince.",
        "The groundwork for all happiness is good health.",
        "A healthy outside starts from the inside.",
        "Don't stop until you're proud.",
        "Sweat is just fat crying.",
        "Health is not valued till sickness comes.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "Eat clean, train dirty.",
        "Strive for progress, not perfection.",
        "Your health is an investment, not an expense.",
        "The only way to do great work is to love what you eat and how you move.",
        "Small daily improvements are the key to staggering long-term results."
    };

    public DashboardDto getDashboard(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();
        int todayDayNum = getDayNumber(user, today);
        int tomorrowDayNum = getDayNumber(user, today.plusDays(1));

        List<MealPlan> todayMeals = mealPlanRepository
                .findByDietPreferenceAndGoalAndDayNumber(user.getDietPreference(), user.getGoal(), todayDayNum);
        if (todayMeals.isEmpty()) {
            todayMeals = mealPlanRepository.findByDietPreferenceAndGoalAndDayNumber(
                    user.getDietPreference(), user.getGoal(), 1);
        }

        List<WorkoutPlan> todayWorkouts = workoutPlanRepository
                .findByWorkoutLevelAndGoalAndDayNumber(user.getWorkoutLevel(), user.getGoal(), todayDayNum);
        if (todayWorkouts.isEmpty()) {
            todayWorkouts = workoutPlanRepository.findByWorkoutLevelAndGoalAndDayNumber(
                    user.getWorkoutLevel(), user.getGoal(), 1);
        }

        List<MealPlan> tomorrowMeals = mealPlanRepository
                .findByDietPreferenceAndGoalAndDayNumber(user.getDietPreference(), user.getGoal(), tomorrowDayNum);
        if (tomorrowMeals.isEmpty()) {
            tomorrowMeals = mealPlanRepository.findByDietPreferenceAndGoalAndDayNumber(
                    user.getDietPreference(), user.getGoal(), 1);
        }

        List<WorkoutPlan> tomorrowWorkouts = workoutPlanRepository
                .findByWorkoutLevelAndGoalAndDayNumber(user.getWorkoutLevel(), user.getGoal(), tomorrowDayNum);
        if (tomorrowWorkouts.isEmpty()) {
            tomorrowWorkouts = workoutPlanRepository.findByWorkoutLevelAndGoalAndDayNumber(
                    user.getWorkoutLevel(), user.getGoal(), 1);
        }

        Optional<DailyProgress> progressOpt = dailyProgressRepository.findByUserAndProgressDate(user, today);
        Set<Long> completedMealIds = new HashSet<>();
        Set<Long> completedWorkoutIds = new HashSet<>();
        if (progressOpt.isPresent()) {
            DailyProgress p = progressOpt.get();
            if (p.getMealsCompleted() != null && !p.getMealsCompleted().isEmpty()) {
                completedMealIds = Arrays.stream(p.getMealsCompleted().split(","))
                        .map(Long::parseLong).collect(Collectors.toSet());
            }
            if (p.getWorkoutsCompleted() != null && !p.getWorkoutsCompleted().isEmpty()) {
                completedWorkoutIds = Arrays.stream(p.getWorkoutsCompleted().split(","))
                        .map(Long::parseLong).collect(Collectors.toSet());
            }
        }

        Set<Long> finalCompletedMealIds = completedMealIds;
        Set<Long> finalCompletedWorkoutIds = completedWorkoutIds;

        return DashboardDto.builder()
                .profile(toProfileDto(user))
                .todayMeals(todayMeals.stream().map(m -> toDashMeal(m, finalCompletedMealIds)).toList())
                .todayWorkouts(todayWorkouts.stream().map(w -> toDashWorkout(w, finalCompletedWorkoutIds)).toList())
                .tomorrowMeals(tomorrowMeals.stream().map(m -> toDashMeal(m, Set.of())).toList())
                .tomorrowWorkouts(tomorrowWorkouts.stream().map(w -> toDashWorkout(w, Set.of())).toList())
                .todayProgress(buildProgress(user, progressOpt.orElse(null)))
                .wellnessTips(buildWellnessTips(user))
                .quote(QUOTES[new Random().nextInt(QUOTES.length)])
                .build();
    }

    @Transactional
    public DashboardDto.ProgressDto completeTask(String username, Long taskId, String taskType) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        LocalDate today = LocalDate.now();

        DailyProgress progress = dailyProgressRepository.findByUserAndProgressDate(user, today)
                .orElse(DailyProgress.builder().user(user).progressDate(today)
                        .mealsCompleted("").workoutsCompleted("").build());

        if ("meal".equalsIgnoreCase(taskType)) {
            Set<String> ids = new HashSet<>(
                    progress.getMealsCompleted().isEmpty() ? List.of() :
                    Arrays.asList(progress.getMealsCompleted().split(",")));
            if (ids.contains(String.valueOf(taskId))) {
                throw new RuntimeException("Task already completed");
            }
            ids.add(String.valueOf(taskId));
            progress.setMealsCompleted(String.join(",", ids));
        } else {
            Set<String> ids = new HashSet<>(
                    progress.getWorkoutsCompleted().isEmpty() ? List.of() :
                    Arrays.asList(progress.getWorkoutsCompleted().split(",")));
            if (ids.contains(String.valueOf(taskId))) {
                throw new RuntimeException("Task already completed");
            }
            ids.add(String.valueOf(taskId));
            progress.setWorkoutsCompleted(String.join(",", ids));
        }

        // Check if all tasks done
        int todayDayNum = getDayNumber(user, today);
        List<MealPlan> todayMeals = mealPlanRepository
                .findByDietPreferenceAndGoalAndDayNumber(user.getDietPreference(), user.getGoal(), todayDayNum);
        if (todayMeals.isEmpty()) todayMeals = mealPlanRepository
                .findByDietPreferenceAndGoalAndDayNumber(user.getDietPreference(), user.getGoal(), 1);
        List<WorkoutPlan> todayWorkouts = workoutPlanRepository
                .findByWorkoutLevelAndGoalAndDayNumber(user.getWorkoutLevel(), user.getGoal(), todayDayNum);
        if (todayWorkouts.isEmpty()) todayWorkouts = workoutPlanRepository
                .findByWorkoutLevelAndGoalAndDayNumber(user.getWorkoutLevel(), user.getGoal(), 1);

        Set<String> completedMeals = progress.getMealsCompleted().isEmpty() ? Set.of() :
                new HashSet<>(Arrays.asList(progress.getMealsCompleted().split(",")));
        Set<String> completedWorkouts = progress.getWorkoutsCompleted().isEmpty() ? Set.of() :
                new HashSet<>(Arrays.asList(progress.getWorkoutsCompleted().split(",")));

        boolean allMealsDone = todayMeals.stream().allMatch(m -> completedMeals.contains(String.valueOf(m.getId())));
        boolean allWorkoutsDone = todayWorkouts.stream().allMatch(w -> completedWorkouts.contains(String.valueOf(w.getId())));

        if (allMealsDone && allWorkoutsDone && !progress.getAllTasksDone()) {
            progress.setAllTasksDone(true);

            // Streak logic
            LocalDate yesterday = today.minusDays(1);
            if (user.getLastCompletedDate() != null && user.getLastCompletedDate().equals(yesterday)) {
                user.setStreakCount(user.getStreakCount() + 1);
            } else if (user.getLastCompletedDate() == null || !user.getLastCompletedDate().equals(today)) {
                // Streak broken if last completed is not yesterday
                if (user.getLastCompletedDate() != null && !user.getLastCompletedDate().equals(yesterday)
                        && !user.getLastCompletedDate().equals(today)) {
                    user.setRewardPoints(Math.max(0, user.getRewardPoints() - 2));
                }
                user.setStreakCount(1);
            }

            // Points
            int pointsEarned = 1;
            if (user.getStreakCount() > 0 && user.getStreakCount() % 10 == 0) {
                pointsEarned += 5;
            }
            user.setRewardPoints(user.getRewardPoints() + pointsEarned);
            user.setLastCompletedDate(today);
            progress.setPointsEarned(pointsEarned);
            progress.setStreakAtTime(user.getStreakCount());

            userRepository.save(user);
        }

        dailyProgressRepository.save(progress);
        return buildProgress(user, progress);
    }

    public List<DashboardDto.ProgressDto> getHistory(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<DailyProgress> history = dailyProgressRepository.findTop10ByUserOrderByProgressDateDesc(user);
        return history.stream().map(p -> buildProgress(user, p)).toList();
    }

    public UserProfileDto getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toProfileDto(user);
    }

    @Transactional
    public UserProfileDto updateProfile(String username, UpdateProfileRequest req) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (req.getName() != null) user.setName(req.getName());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getAge() != null) user.setAge(req.getAge());
        if (req.getHeightCm() != null) user.setHeightCm(req.getHeightCm());
        if (req.getWeightKg() != null) user.setWeightKg(req.getWeightKg());
        if (req.getDietPreference() != null) user.setDietPreference(User.DietPreference.valueOf(req.getDietPreference()));
        if (req.getWorkoutLevel() != null) user.setWorkoutLevel(User.WorkoutLevel.valueOf(req.getWorkoutLevel()));
        if (req.getGoal() != null) user.setGoal(User.Goal.valueOf(req.getGoal()));
        userRepository.save(user);
        return toProfileDto(user);
    }

    // --- helpers ---

    private int getDayNumber(User user, LocalDate date) {
        if (user.getCreatedAt() == null) return 1;
        long daysSinceJoin = ChronoUnit.DAYS.between(user.getCreatedAt().toLocalDate(), date);
        int maxDays = 3; // cycle through 3 days so same plan repeats on day 4
        return (int) (daysSinceJoin % maxDays) + 1;
    }

    private DashboardDto.MealPlanDto toDashMeal(MealPlan m, Set<Long> completedIds) {
        return DashboardDto.MealPlanDto.builder()
                .id(m.getId()).mealType(m.getMealType().name())
                .foodItem(m.getFoodItem()).calories(m.getCalories())
                .proteins(m.getProteins()).carbs(m.getCarbs()).fats(m.getFats())
                .completed(completedIds.contains(m.getId())).build();
    }

    private DashboardDto.WorkoutPlanDto toDashWorkout(WorkoutPlan w, Set<Long> completedIds) {
        return DashboardDto.WorkoutPlanDto.builder()
                .id(w.getId()).exerciseName(w.getExerciseName())
                .reps(w.getReps()).sets(w.getSets()).category(w.getCategory())
                .completed(completedIds.contains(w.getId())).build();
    }

    private DashboardDto.ProgressDto buildProgress(User user, DailyProgress progress) {
        List<Long> mealIds = List.of();
        List<Long> workoutIds = List.of();
        if (progress != null) {
            if (progress.getMealsCompleted() != null && !progress.getMealsCompleted().isEmpty())
                mealIds = Arrays.stream(progress.getMealsCompleted().split(",")).map(Long::parseLong).toList();
            if (progress.getWorkoutsCompleted() != null && !progress.getWorkoutsCompleted().isEmpty())
                workoutIds = Arrays.stream(progress.getWorkoutsCompleted().split(",")).map(Long::parseLong).toList();
        }
        return DashboardDto.ProgressDto.builder()
                .date(progress != null ? progress.getProgressDate() : LocalDate.now())
                .completedMealIds(mealIds)
                .completedWorkoutIds(workoutIds)
                .allDone(progress != null && progress.getAllTasksDone())
                .pointsEarned(progress != null ? progress.getPointsEarned() : 0)
                .currentStreak(user.getStreakCount())
                .totalPoints(user.getRewardPoints())
                .badge(getBadge(user.getRewardPoints()))
                .build();
    }

    public static String getBadge(int points) {
        if (points > 600) return "Ultimate Fitness Champion";
        if (points > 300) return "Fitness Pro";
        if (points > 100) return "Health Enthusiast";
        return "Beginner";
    }

    private DashboardDto.WellnessTipsDto buildWellnessTips(User user) {
        double waterLiters = user.getWeightKg() * 0.033;
        String sleep = user.getAge() < 18 ? "8-10 hours" : user.getAge() < 65 ? "7-9 hours" : "7-8 hours";
        String tip;
        switch (user.getGoal()) {
            case WEIGHT_LOSS -> tip = "Avoid eating 2 hours before bedtime. Include more fiber in your diet.";
            case MUSCULAR_STRENGTH -> tip = "Consume protein within 30 minutes after your workout for best results.";
            case DIABETIC_BP_CONTROL -> tip = "Monitor your blood sugar regularly. Avoid processed and high-sodium foods.";
            default -> tip = "Stay consistent with your routine. Small progress is still progress!";
        }
        return DashboardDto.WellnessTipsDto.builder()
                .waterIntake(String.format("%.1f liters/day", waterLiters))
                .sleepRecommendation(sleep)
                .additionalTip(tip)
                .build();
    }

    private UserProfileDto toProfileDto(User user) {
        return UserProfileDto.builder()
                .id(user.getId()).name(user.getName()).phone(user.getPhone())
                .username(user.getUsername()).gender(user.getGender().name())
                .age(user.getAge()).heightCm(user.getHeightCm()).weightKg(user.getWeightKg())
                .dietPreference(user.getDietPreference().name())
                .workoutLevel(user.getWorkoutLevel().name())
                .goal(user.getGoal().name()).bmi(user.getBmi())
                .role(user.getRole().name())
                .rewardPoints(user.getRewardPoints())
                .streakCount(user.getStreakCount())
                .badge(getBadge(user.getRewardPoints()))
                .build();
    }
}
