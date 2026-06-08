-- Diet & Fitness Planner - Database Schema
-- MySQL 8.x

CREATE DATABASE IF NOT EXISTS diet_fitness_planner;
USE diet_fitness_planner;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender ENUM('MALE', 'FEMALE') NOT NULL,
    age INT NOT NULL,
    height_cm DOUBLE NOT NULL,
    weight_kg DOUBLE NOT NULL,
    diet_preference ENUM('VEG', 'NON_VEG') NOT NULL,
    workout_level ENUM('BEGINNER', 'INTERMEDIATE', 'HARD') NOT NULL,
    goal ENUM('OVERALL_HEALTH', 'MUSCULAR_STRENGTH', 'WEIGHT_LOSS', 'DIABETIC_BP_CONTROL') NOT NULL,
    bmi DOUBLE,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    reward_points INT NOT NULL DEFAULT 0,
    streak_count INT NOT NULL DEFAULT 0,
    last_completed_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- MEAL PLANS TABLE
-- ============================================
CREATE TABLE meal_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    meal_type ENUM('BREAKFAST', 'LUNCH', 'SNACK', 'DINNER') NOT NULL,
    food_item VARCHAR(200) NOT NULL,
    calories INT NOT NULL,
    proteins DOUBLE NOT NULL,
    carbs DOUBLE NOT NULL,
    fats DOUBLE NOT NULL,
    diet_preference ENUM('VEG', 'NON_VEG') NOT NULL,
    goal ENUM('OVERALL_HEALTH', 'MUSCULAR_STRENGTH', 'WEIGHT_LOSS', 'DIABETIC_BP_CONTROL') NOT NULL,
    day_number INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- WORKOUT PLANS TABLE
-- ============================================
CREATE TABLE workout_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(200) NOT NULL,
    reps VARCHAR(50) NOT NULL,
    sets INT NOT NULL DEFAULT 3,
    category VARCHAR(100),
    workout_level ENUM('BEGINNER', 'INTERMEDIATE', 'HARD') NOT NULL,
    goal ENUM('OVERALL_HEALTH', 'MUSCULAR_STRENGTH', 'WEIGHT_LOSS', 'DIABETIC_BP_CONTROL') NOT NULL,
    day_number INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- DAILY PROGRESS TABLE
-- ============================================
CREATE TABLE daily_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    progress_date DATE NOT NULL,
    meals_completed TEXT,
    workouts_completed TEXT,
    all_tasks_done BOOLEAN NOT NULL DEFAULT FALSE,
    points_earned INT NOT NULL DEFAULT 0,
    streak_at_time INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_date (user_id, progress_date)
);

-- ============================================
-- SEED DATA: Admin User (password: admin123)
-- ============================================
INSERT INTO users (name, phone, username, password, gender, age, height_cm, weight_kg, diet_preference, workout_level, goal, role)
VALUES ('Admin', '0000000000', 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'MALE', 30, 175, 70, 'VEG', 'INTERMEDIATE', 'OVERALL_HEALTH', 'ADMIN')
ON DUPLICATE KEY UPDATE name = name;

-- ============================================
-- SEED DATA: Meal Plans
-- ============================================
-- VEG - Overall Health
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Oatmeal with Fruits & Nuts', 350, 12, 55, 8, 'VEG', 'OVERALL_HEALTH', 1),
('LUNCH', 'Brown Rice, Dal, Mixed Veg Curry, Salad', 550, 18, 75, 12, 'VEG', 'OVERALL_HEALTH', 1),
('SNACK', 'Greek Yogurt with Honey', 200, 10, 25, 5, 'VEG', 'OVERALL_HEALTH', 1),
('DINNER', 'Chapati, Paneer Bhurji, Cucumber Raita', 450, 20, 45, 15, 'VEG', 'OVERALL_HEALTH', 1),
('BREAKFAST', 'Poha with Peanuts & Lemon', 300, 8, 50, 7, 'VEG', 'OVERALL_HEALTH', 2),
('LUNCH', 'Quinoa Bowl with Chickpeas & Veggies', 500, 20, 65, 10, 'VEG', 'OVERALL_HEALTH', 2),
('SNACK', 'Mixed Nuts & Dried Fruits', 250, 7, 20, 15, 'VEG', 'OVERALL_HEALTH', 2),
('DINNER', 'Vegetable Soup with Whole Wheat Bread', 400, 12, 55, 8, 'VEG', 'OVERALL_HEALTH', 2);

-- NON_VEG - Overall Health - Day 1
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Egg White Omelette with Toast', 320, 22, 30, 8, 'NON_VEG', 'OVERALL_HEALTH', 1),
('LUNCH', 'Grilled Chicken with Brown Rice & Salad', 600, 35, 60, 12, 'NON_VEG', 'OVERALL_HEALTH', 1),
('SNACK', 'Protein Smoothie with Banana', 250, 20, 30, 5, 'NON_VEG', 'OVERALL_HEALTH', 1),
('DINNER', 'Baked Fish with Steamed Vegetables', 450, 30, 25, 15, 'NON_VEG', 'OVERALL_HEALTH', 1);

-- NON_VEG - Overall Health - Day 2
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Chicken Oats Porridge with Boiled Egg', 360, 25, 40, 10, 'NON_VEG', 'OVERALL_HEALTH', 2),
('LUNCH', 'Tuna Wrap with Whole Wheat Tortilla & Salad', 520, 38, 45, 14, 'NON_VEG', 'OVERALL_HEALTH', 2),
('SNACK', 'Boiled Eggs with Mixed Nuts', 220, 18, 6, 14, 'NON_VEG', 'OVERALL_HEALTH', 2),
('DINNER', 'Grilled Prawns with Quinoa & Garden Salad', 480, 32, 38, 14, 'NON_VEG', 'OVERALL_HEALTH', 2);

-- VEG - Weight Loss - Day 1
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Green Smoothie (Spinach, Banana, Almond Milk)', 220, 8, 35, 5, 'VEG', 'WEIGHT_LOSS', 1),
('LUNCH', 'Grilled Veggie Salad with Quinoa', 380, 15, 45, 8, 'VEG', 'WEIGHT_LOSS', 1),
('SNACK', 'Apple Slices with Peanut Butter', 180, 5, 22, 8, 'VEG', 'WEIGHT_LOSS', 1),
('DINNER', 'Soup with Sprouts & Light Chapati', 320, 14, 40, 6, 'VEG', 'WEIGHT_LOSS', 1);

-- VEG - Weight Loss - Day 2
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Moong Dal Cheela with Mint Chutney', 240, 14, 28, 5, 'VEG', 'WEIGHT_LOSS', 2),
('LUNCH', 'Veg Minestrone Soup with Multigrain Toast', 320, 12, 38, 7, 'VEG', 'WEIGHT_LOSS', 2),
('SNACK', 'Roasted Makhana (Fox Nuts)', 150, 5, 20, 3, 'VEG', 'WEIGHT_LOSS', 2),
('DINNER', 'Palak Tofu Stir-Fry with Cauliflower Rice', 300, 18, 22, 8, 'VEG', 'WEIGHT_LOSS', 2);

-- VEG - Muscular Strength - Day 1
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Paneer Paratha with Curd', 450, 22, 45, 18, 'VEG', 'MUSCULAR_STRENGTH', 1),
('LUNCH', 'Rajma Chawal with Salad & Buttermilk', 650, 25, 80, 12, 'VEG', 'MUSCULAR_STRENGTH', 1),
('SNACK', 'Protein Shake with Banana & Oats', 350, 25, 40, 8, 'VEG', 'MUSCULAR_STRENGTH', 1),
('DINNER', 'Tofu Stir Fry with Brown Rice', 500, 28, 50, 14, 'VEG', 'MUSCULAR_STRENGTH', 1);

-- VEG - Muscular Strength - Day 2
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Soya Chunk Upma with Peanuts', 420, 28, 42, 12, 'VEG', 'MUSCULAR_STRENGTH', 2),
('LUNCH', 'Chole with Basmati Rice & Fresh Salad', 620, 24, 78, 14, 'VEG', 'MUSCULAR_STRENGTH', 2),
('SNACK', 'Peanut Butter on Whole Wheat with Milk', 380, 20, 38, 16, 'VEG', 'MUSCULAR_STRENGTH', 2),
('DINNER', 'Palak Paneer with Roti & Dal', 530, 30, 48, 16, 'VEG', 'MUSCULAR_STRENGTH', 2);

-- NON_VEG - Muscular Strength - Day 1
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Egg Bhurji with Multigrain Toast', 420, 28, 35, 16, 'NON_VEG', 'MUSCULAR_STRENGTH', 1),
('LUNCH', 'Chicken Breast with Sweet Potato & Broccoli', 700, 45, 65, 14, 'NON_VEG', 'MUSCULAR_STRENGTH', 1),
('SNACK', 'Boiled Eggs with Nuts', 300, 22, 8, 20, 'NON_VEG', 'MUSCULAR_STRENGTH', 1),
('DINNER', 'Grilled Salmon with Quinoa & Asparagus', 550, 38, 40, 18, 'NON_VEG', 'MUSCULAR_STRENGTH', 1);

-- NON_VEG - Muscular Strength - Day 2
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Greek Yogurt with Whey Protein & Berries', 380, 35, 30, 8, 'NON_VEG', 'MUSCULAR_STRENGTH', 2),
('LUNCH', 'Lean Beef Bowl with Brown Rice & Salad', 720, 48, 60, 16, 'NON_VEG', 'MUSCULAR_STRENGTH', 2),
('SNACK', 'Chicken Strips with Hummus', 280, 28, 12, 10, 'NON_VEG', 'MUSCULAR_STRENGTH', 2),
('DINNER', 'Baked Chicken Thighs with Roasted Veggies', 580, 42, 35, 18, 'NON_VEG', 'MUSCULAR_STRENGTH', 2);

-- VEG - Diabetic/BP Control - Day 1
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Moong Dal Chilla with Mint Chutney', 250, 14, 30, 6, 'VEG', 'DIABETIC_BP_CONTROL', 1),
('LUNCH', 'Millets Khichdi with Raita & Salad', 400, 16, 55, 8, 'VEG', 'DIABETIC_BP_CONTROL', 1),
('SNACK', 'Roasted Chana with Cucumber', 150, 8, 20, 3, 'VEG', 'DIABETIC_BP_CONTROL', 1),
('DINNER', 'Lauki Sabzi with Roti & Dal Soup', 350, 12, 45, 7, 'VEG', 'DIABETIC_BP_CONTROL', 1);

-- VEG - Diabetic/BP Control - Day 2
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Oats with Cinnamon & Chia Seeds (No Sugar)', 230, 10, 32, 5, 'VEG', 'DIABETIC_BP_CONTROL', 2),
('LUNCH', 'Barley Soup with Low-Glycemic Stir-fried Veggies', 370, 14, 48, 7, 'VEG', 'DIABETIC_BP_CONTROL', 2),
('SNACK', 'Handful of Walnuts & Flax Seeds', 160, 5, 8, 12, 'VEG', 'DIABETIC_BP_CONTROL', 2),
('DINNER', 'Bitter Gourd Sabzi with Bajra Roti', 330, 11, 42, 8, 'VEG', 'DIABETIC_BP_CONTROL', 2);

-- ============================================
-- SEED DATA: Workout Plans
-- ============================================
-- Beginner - Overall Health - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Brisk Walking', '20 mins', 1, 'Cardio', 'BEGINNER', 'OVERALL_HEALTH', 1),
('Bodyweight Squats', '12', 3, 'Lower Body', 'BEGINNER', 'OVERALL_HEALTH', 1),
('Push-ups (Knee)', '10', 3, 'Upper Body', 'BEGINNER', 'OVERALL_HEALTH', 1),
('Plank Hold', '20 sec', 3, 'Core', 'BEGINNER', 'OVERALL_HEALTH', 1),
('Stretching', '10 mins', 1, 'Flexibility', 'BEGINNER', 'OVERALL_HEALTH', 1);

-- Beginner - Overall Health - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Slow Cycling / Walking', '25 mins', 1, 'Cardio', 'BEGINNER', 'OVERALL_HEALTH', 2),
('Step-ups', '10', 3, 'Lower Body', 'BEGINNER', 'OVERALL_HEALTH', 2),
('Wall Push-ups', '12', 3, 'Upper Body', 'BEGINNER', 'OVERALL_HEALTH', 2),
('Cat-Cow Stretch', '10', 2, 'Flexibility', 'BEGINNER', 'OVERALL_HEALTH', 2),
('Seated Leg Raises', '12', 3, 'Core', 'BEGINNER', 'OVERALL_HEALTH', 2);

-- Intermediate - Overall Health - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Jogging', '25 mins', 1, 'Cardio', 'INTERMEDIATE', 'OVERALL_HEALTH', 1),
('Lunges', '15', 3, 'Lower Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 1),
('Push-ups', '15', 3, 'Upper Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 1),
('Mountain Climbers', '20', 3, 'Core', 'INTERMEDIATE', 'OVERALL_HEALTH', 1),
('Burpees', '10', 3, 'Full Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 1);

-- Intermediate - Overall Health - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Cycling', '30 mins', 1, 'Cardio', 'INTERMEDIATE', 'OVERALL_HEALTH', 2),
('Jump Squats', '12', 3, 'Lower Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 2),
('Dumbbell Rows', '12', 3, 'Upper Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 2),
('Russian Twists', '20', 3, 'Core', 'INTERMEDIATE', 'OVERALL_HEALTH', 2),
('Box Jumps', '10', 3, 'Full Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 2);

-- Hard - Muscular Strength - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Deadlifts', '8', 4, 'Full Body', 'HARD', 'MUSCULAR_STRENGTH', 1),
('Bench Press', '10', 4, 'Upper Body', 'HARD', 'MUSCULAR_STRENGTH', 1),
('Barbell Squats', '10', 4, 'Lower Body', 'HARD', 'MUSCULAR_STRENGTH', 1),
('Pull-ups', '8', 4, 'Upper Body', 'HARD', 'MUSCULAR_STRENGTH', 1),
('Plank', '60 sec', 3, 'Core', 'HARD', 'MUSCULAR_STRENGTH', 1);

-- Hard - Muscular Strength - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Weighted Pull-ups', '8', 4, 'Upper Body', 'HARD', 'MUSCULAR_STRENGTH', 2),
('Hack Squats', '10', 4, 'Lower Body', 'HARD', 'MUSCULAR_STRENGTH', 2),
('Incline Barbell Press', '10', 4, 'Upper Body', 'HARD', 'MUSCULAR_STRENGTH', 2),
('Pendlay Rows', '8', 4, 'Upper Body', 'HARD', 'MUSCULAR_STRENGTH', 2),
('Hanging Leg Raises', '12', 3, 'Core', 'HARD', 'MUSCULAR_STRENGTH', 2);

-- Beginner - Weight Loss - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Brisk Walking', '30 mins', 1, 'Cardio', 'BEGINNER', 'WEIGHT_LOSS', 1),
('Jumping Jacks', '20', 3, 'Cardio', 'BEGINNER', 'WEIGHT_LOSS', 1),
('High Knees', '15', 3, 'Cardio', 'BEGINNER', 'WEIGHT_LOSS', 1),
('Bicycle Crunches', '15', 3, 'Core', 'BEGINNER', 'WEIGHT_LOSS', 1),
('Spot Jogging', '5 mins', 3, 'Cardio', 'BEGINNER', 'WEIGHT_LOSS', 1);

-- Beginner - Weight Loss - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Swimming / Water Walking', '20 mins', 1, 'Cardio', 'BEGINNER', 'WEIGHT_LOSS', 2),
('Step-ups', '15', 3, 'Lower Body', 'BEGINNER', 'WEIGHT_LOSS', 2),
('Standing Side Crunches', '15', 3, 'Core', 'BEGINNER', 'WEIGHT_LOSS', 2),
('Heel Touches', '20', 3, 'Core', 'BEGINNER', 'WEIGHT_LOSS', 2),
('Arm Swings', '3 mins', 2, 'Cardio', 'BEGINNER', 'WEIGHT_LOSS', 2);

-- Intermediate - Weight Loss - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Running', '30 mins', 1, 'Cardio', 'INTERMEDIATE', 'WEIGHT_LOSS', 1),
('Burpees', '15', 3, 'Full Body', 'INTERMEDIATE', 'WEIGHT_LOSS', 1),
('Jump Squats', '15', 3, 'Lower Body', 'INTERMEDIATE', 'WEIGHT_LOSS', 1),
('Mountain Climbers', '20', 3, 'Core', 'INTERMEDIATE', 'WEIGHT_LOSS', 1),
('Box Jumps', '12', 3, 'Lower Body', 'INTERMEDIATE', 'WEIGHT_LOSS', 1);

-- Intermediate - Weight Loss - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Cycling HIIT', '25 mins', 1, 'Cardio', 'INTERMEDIATE', 'WEIGHT_LOSS', 2),
('Squat to Overhead Press', '12', 3, 'Full Body', 'INTERMEDIATE', 'WEIGHT_LOSS', 2),
('Plank to Push-up', '10', 3, 'Full Body', 'INTERMEDIATE', 'WEIGHT_LOSS', 2),
('Lateral Shuffles', '20', 3, 'Cardio', 'INTERMEDIATE', 'WEIGHT_LOSS', 2),
('Russian Twists', '20', 3, 'Core', 'INTERMEDIATE', 'WEIGHT_LOSS', 2);

-- Beginner - Diabetic/BP Control - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Slow Walking', '20 mins', 1, 'Cardio', 'BEGINNER', 'DIABETIC_BP_CONTROL', 1),
('Chair Squats', '10', 2, 'Lower Body', 'BEGINNER', 'DIABETIC_BP_CONTROL', 1),
('Arm Circles', '15', 2, 'Upper Body', 'BEGINNER', 'DIABETIC_BP_CONTROL', 1),
('Deep Breathing', '5 mins', 1, 'Relaxation', 'BEGINNER', 'DIABETIC_BP_CONTROL', 1),
('Gentle Stretching', '10 mins', 1, 'Flexibility', 'BEGINNER', 'DIABETIC_BP_CONTROL', 1);

-- Beginner - Diabetic/BP Control - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Seated March in Place', '10 mins', 1, 'Cardio', 'BEGINNER', 'DIABETIC_BP_CONTROL', 2),
('Calf Raises', '12', 2, 'Lower Body', 'BEGINNER', 'DIABETIC_BP_CONTROL', 2),
('Shoulder Rolls', '10', 2, 'Upper Body', 'BEGINNER', 'DIABETIC_BP_CONTROL', 2),
('Pranayama Breathing', '5 mins', 1, 'Relaxation', 'BEGINNER', 'DIABETIC_BP_CONTROL', 2),
('Ankle Circles', '10', 2, 'Flexibility', 'BEGINNER', 'DIABETIC_BP_CONTROL', 2);

-- Hard - Overall Health - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Running Intervals', '30 mins', 1, 'Cardio', 'HARD', 'OVERALL_HEALTH', 1),
('Weighted Lunges', '12', 4, 'Lower Body', 'HARD', 'OVERALL_HEALTH', 1),
('Pull-ups', '10', 4, 'Upper Body', 'HARD', 'OVERALL_HEALTH', 1),
('Plank with Shoulder Tap', '45 sec', 3, 'Core', 'HARD', 'OVERALL_HEALTH', 1),
('Burpees', '15', 3, 'Full Body', 'HARD', 'OVERALL_HEALTH', 1);

-- Hard - Overall Health - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Stair Climbing', '20 mins', 1, 'Cardio', 'HARD', 'OVERALL_HEALTH', 2),
('Barbell Squats', '10', 4, 'Lower Body', 'HARD', 'OVERALL_HEALTH', 2),
('Decline Push-ups', '12', 4, 'Upper Body', 'HARD', 'OVERALL_HEALTH', 2),
('Hanging Leg Raises', '12', 3, 'Core', 'HARD', 'OVERALL_HEALTH', 2),
('Clean and Press', '8', 3, 'Full Body', 'HARD', 'OVERALL_HEALTH', 2);

-- Beginner - Muscular Strength - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Knee Push-ups', '10', 3, 'Upper Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 1),
('Bodyweight Squats', '12', 3, 'Lower Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 1),
('Dumbbell Bicep Curls (Light)', '12', 3, 'Upper Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 1),
('Plank Hold', '20 sec', 3, 'Core', 'BEGINNER', 'MUSCULAR_STRENGTH', 1),
('Wall Shoulder Press', '12', 3, 'Upper Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 1);

-- Beginner - Muscular Strength - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Wall Push-ups', '12', 3, 'Upper Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 2),
('Glute Bridges', '15', 3, 'Lower Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 2),
('Dumbbell Lateral Raises (Light)', '12', 3, 'Upper Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 2),
('Dead Bug', '10', 3, 'Core', 'BEGINNER', 'MUSCULAR_STRENGTH', 2),
('Resistance Band Pull Apart', '15', 3, 'Upper Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 2);

-- Intermediate - Muscular Strength - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Dumbbell Bench Press', '12', 3, 'Upper Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 1),
('Goblet Squats', '12', 3, 'Lower Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 1),
('Dumbbell Bent-over Rows', '12', 3, 'Upper Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 1),
('Romanian Deadlifts', '10', 3, 'Full Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 1),
('Plank', '40 sec', 3, 'Core', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 1);

-- Intermediate - Muscular Strength - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Incline Dumbbell Press', '12', 3, 'Upper Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 2),
('Bulgarian Split Squats', '10', 3, 'Lower Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 2),
('Cable Lat Pulldown', '12', 3, 'Upper Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 2),
('Dumbbell Shoulder Press', '12', 3, 'Upper Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 2),
('Bicycle Crunches', '20', 3, 'Core', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 2);

-- Hard - Weight Loss - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('HIIT Sprints', '30 mins', 1, 'Cardio', 'HARD', 'WEIGHT_LOSS', 1),
('Barbell Thrusters', '12', 4, 'Full Body', 'HARD', 'WEIGHT_LOSS', 1),
('Kettlebell Swings', '20', 3, 'Full Body', 'HARD', 'WEIGHT_LOSS', 1),
('Jump Lunges', '15', 3, 'Lower Body', 'HARD', 'WEIGHT_LOSS', 1),
('Battle Rope Waves', '30 sec', 3, 'Cardio', 'HARD', 'WEIGHT_LOSS', 1);

-- Hard - Weight Loss - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Treadmill Sprint Intervals', '25 mins', 1, 'Cardio', 'HARD', 'WEIGHT_LOSS', 2),
('Dumbbell Clean & Press', '10', 4, 'Full Body', 'HARD', 'WEIGHT_LOSS', 2),
('Plyometric Squats', '15', 3, 'Lower Body', 'HARD', 'WEIGHT_LOSS', 2),
('Medicine Ball Slams', '15', 3, 'Full Body', 'HARD', 'WEIGHT_LOSS', 2),
('Burpee to Box Jump', '10', 3, 'Full Body', 'HARD', 'WEIGHT_LOSS', 2);

-- Intermediate - Diabetic/BP Control - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Brisk Walking', '30 mins', 1, 'Cardio', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 1),
('Bodyweight Squats', '12', 3, 'Lower Body', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 1),
('Resistance Band Rows', '12', 3, 'Upper Body', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 1),
('Plank Hold', '30 sec', 3, 'Core', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 1),
('Deep Breathing & Meditation', '5 mins', 1, 'Relaxation', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 1);

-- Intermediate - Diabetic/BP Control - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Swimming', '20 mins', 1, 'Cardio', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 2),
('Step-ups', '12', 3, 'Lower Body', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 2),
('Dumbbell Bicep Curls (Light)', '12', 3, 'Upper Body', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 2),
('Bird-Dog', '10', 3, 'Core', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 2),
('Yoga Stretches', '10 mins', 1, 'Flexibility', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 2);

-- Hard - Diabetic/BP Control - Day 1
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Power Walking / Light Jog', '40 mins', 1, 'Cardio', 'HARD', 'DIABETIC_BP_CONTROL', 1),
('Lunges', '15', 3, 'Lower Body', 'HARD', 'DIABETIC_BP_CONTROL', 1),
('Dumbbell Shoulder Press', '12', 3, 'Upper Body', 'HARD', 'DIABETIC_BP_CONTROL', 1),
('Mountain Climbers', '20', 3, 'Core', 'HARD', 'DIABETIC_BP_CONTROL', 1),
('Yoga / Stretching', '10 mins', 1, 'Flexibility', 'HARD', 'DIABETIC_BP_CONTROL', 1);

-- Hard - Diabetic/BP Control - Day 2
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Elliptical Trainer', '35 mins', 1, 'Cardio', 'HARD', 'DIABETIC_BP_CONTROL', 2),
('Goblet Squats', '12', 3, 'Lower Body', 'HARD', 'DIABETIC_BP_CONTROL', 2),
('Dumbbell Rows', '12', 3, 'Upper Body', 'HARD', 'DIABETIC_BP_CONTROL', 2),
('Plank', '45 sec', 3, 'Core', 'HARD', 'DIABETIC_BP_CONTROL', 2),
('Tai Chi / Mindful Stretch', '10 mins', 1, 'Flexibility', 'HARD', 'DIABETIC_BP_CONTROL', 2);

-- NON_VEG - Weight Loss - Day 1
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Boiled Egg Whites with Whole Wheat Toast', 280, 24, 28, 6, 'NON_VEG', 'WEIGHT_LOSS', 1),
('LUNCH', 'Grilled Chicken Salad with Lemon Dressing', 400, 35, 20, 12, 'NON_VEG', 'WEIGHT_LOSS', 1),
('SNACK', 'Tuna Sticks with Cucumber', 150, 20, 5, 3, 'NON_VEG', 'WEIGHT_LOSS', 1),
('DINNER', 'Baked Fish with Steamed Broccoli', 350, 30, 15, 10, 'NON_VEG', 'WEIGHT_LOSS', 1);

-- NON_VEG - Weight Loss - Day 2
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Scrambled Egg Whites with Spinach & Mushroom', 250, 22, 10, 8, 'NON_VEG', 'WEIGHT_LOSS', 2),
('LUNCH', 'Turkey & Veggie Bowl with Brown Rice', 420, 36, 35, 10, 'NON_VEG', 'WEIGHT_LOSS', 2),
('SNACK', 'Cottage Cheese with Cherry Tomatoes', 160, 18, 8, 4, 'NON_VEG', 'WEIGHT_LOSS', 2),
('DINNER', 'Grilled Tilapia with Roasted Low-Cal Vegetables', 370, 32, 18, 10, 'NON_VEG', 'WEIGHT_LOSS', 2);

-- NON_VEG - Diabetic/BP Control - Day 1
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Scrambled Eggs with Spinach', 280, 18, 10, 12, 'NON_VEG', 'DIABETIC_BP_CONTROL', 1),
('LUNCH', 'Grilled Chicken with Millets & Garden Salad', 450, 32, 40, 10, 'NON_VEG', 'DIABETIC_BP_CONTROL', 1),
('SNACK', 'Boiled Egg with Cucumber Slices', 120, 12, 5, 5, 'NON_VEG', 'DIABETIC_BP_CONTROL', 1),
('DINNER', 'Baked Fish with Low-Carb Stir-fried Vegetables', 380, 30, 20, 12, 'NON_VEG', 'DIABETIC_BP_CONTROL', 1);

-- NON_VEG - Diabetic/BP Control - Day 2
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Poached Eggs with Avocado on Rye Bread', 310, 20, 18, 14, 'NON_VEG', 'DIABETIC_BP_CONTROL', 2),
('LUNCH', 'Baked Salmon with Barley & Steamed Green Beans', 470, 34, 38, 12, 'NON_VEG', 'DIABETIC_BP_CONTROL', 2),
('SNACK', 'Turkey Slices with Celery Sticks', 130, 16, 4, 4, 'NON_VEG', 'DIABETIC_BP_CONTROL', 2),
('DINNER', 'Grilled Chicken with Bitter Gourd & Brown Rice', 400, 32, 35, 10, 'NON_VEG', 'DIABETIC_BP_CONTROL', 2);

-- ============================================
-- SEED DATA: Meal Plans - Day 3
-- ============================================

-- VEG - Overall Health - Day 3
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Idli with Sambar & Coconut Chutney', 320, 10, 52, 6, 'VEG', 'OVERALL_HEALTH', 3),
('LUNCH', 'Veggie Pulao with Raita & Papad', 520, 14, 70, 12, 'VEG', 'OVERALL_HEALTH', 3),
('SNACK', 'Fruit Salad with Chia Seeds', 180, 4, 30, 5, 'VEG', 'OVERALL_HEALTH', 3),
('DINNER', 'Masoor Dal with Jeera Rice & Salad', 430, 18, 60, 8, 'VEG', 'OVERALL_HEALTH', 3);

-- NON_VEG - Overall Health - Day 3
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Boiled Eggs with Avocado Toast', 380, 20, 28, 18, 'NON_VEG', 'OVERALL_HEALTH', 3),
('LUNCH', 'Chicken Biryani (Light) with Cucumber Raita', 580, 32, 65, 14, 'NON_VEG', 'OVERALL_HEALTH', 3),
('SNACK', 'Grilled Chicken Strips with Hummus', 240, 22, 12, 10, 'NON_VEG', 'OVERALL_HEALTH', 3),
('DINNER', 'Steamed Fish with Lemon Herb Rice & Veggies', 460, 34, 40, 12, 'NON_VEG', 'OVERALL_HEALTH', 3);

-- VEG - Weight Loss - Day 3
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Ragi Dosa with Tomato Chutney', 210, 8, 32, 4, 'VEG', 'WEIGHT_LOSS', 3),
('LUNCH', 'Mixed Bean Salad with Lemon Vinaigrette', 340, 18, 38, 6, 'VEG', 'WEIGHT_LOSS', 3),
('SNACK', 'Cucumber & Carrot Sticks with Hummus', 140, 5, 16, 5, 'VEG', 'WEIGHT_LOSS', 3),
('DINNER', 'Stir-fried Tofu with Zucchini Noodles', 280, 20, 18, 10, 'VEG', 'WEIGHT_LOSS', 3);

-- NON_VEG - Weight Loss - Day 3
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Egg White Frittata with Bell Peppers', 240, 22, 12, 6, 'NON_VEG', 'WEIGHT_LOSS', 3),
('LUNCH', 'Grilled Shrimp with Mixed Greens Salad', 360, 32, 15, 10, 'NON_VEG', 'WEIGHT_LOSS', 3),
('SNACK', 'Smoked Turkey Roll-ups with Lettuce', 140, 18, 4, 5, 'NON_VEG', 'WEIGHT_LOSS', 3),
('DINNER', 'Herb Baked Chicken with Roasted Zucchini', 340, 34, 12, 10, 'NON_VEG', 'WEIGHT_LOSS', 3);

-- VEG - Muscular Strength - Day 3
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Besan Cheela with Paneer Stuffing', 440, 26, 38, 16, 'VEG', 'MUSCULAR_STRENGTH', 3),
('LUNCH', 'Dal Makhani with Brown Rice & Curd', 640, 24, 76, 16, 'VEG', 'MUSCULAR_STRENGTH', 3),
('SNACK', 'Soya Milk with Almonds & Dates', 340, 22, 32, 12, 'VEG', 'MUSCULAR_STRENGTH', 3),
('DINNER', 'Mushroom & Paneer Stir Fry with Roti', 520, 28, 44, 18, 'VEG', 'MUSCULAR_STRENGTH', 3);

-- NON_VEG - Muscular Strength - Day 3
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Chicken Sausage with Scrambled Eggs & Toast', 440, 32, 30, 18, 'NON_VEG', 'MUSCULAR_STRENGTH', 3),
('LUNCH', 'Lamb Keema with Jeera Rice & Mint Raita', 700, 42, 62, 20, 'NON_VEG', 'MUSCULAR_STRENGTH', 3),
('SNACK', 'Protein Bar with Greek Yogurt', 320, 26, 28, 10, 'NON_VEG', 'MUSCULAR_STRENGTH', 3),
('DINNER', 'Grilled Turkey Breast with Mashed Sweet Potato', 560, 40, 45, 14, 'NON_VEG', 'MUSCULAR_STRENGTH', 3);

-- VEG - Diabetic/BP Control - Day 3
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Vegetable Upma with Curry Leaves', 240, 8, 36, 6, 'VEG', 'DIABETIC_BP_CONTROL', 3),
('LUNCH', 'Jowar Roti with Methi Sabzi & Dal', 380, 14, 50, 8, 'VEG', 'DIABETIC_BP_CONTROL', 3),
('SNACK', 'Sprouts Chaat with Lemon', 140, 10, 18, 2, 'VEG', 'DIABETIC_BP_CONTROL', 3),
('DINNER', 'Bottle Gourd Soup with Multigrain Bread', 300, 10, 40, 6, 'VEG', 'DIABETIC_BP_CONTROL', 3);

-- NON_VEG - Diabetic/BP Control - Day 3
INSERT INTO meal_plans (meal_type, food_item, calories, proteins, carbs, fats, diet_preference, goal, day_number) VALUES
('BREAKFAST', 'Omelette with Mushrooms & Whole Wheat Toast', 290, 20, 22, 10, 'NON_VEG', 'DIABETIC_BP_CONTROL', 3),
('LUNCH', 'Grilled Fish with Ragi Roti & Salad', 420, 30, 35, 10, 'NON_VEG', 'DIABETIC_BP_CONTROL', 3),
('SNACK', 'Handful of Almonds with Green Tea', 130, 6, 5, 10, 'NON_VEG', 'DIABETIC_BP_CONTROL', 3),
('DINNER', 'Chicken Stew with Mixed Vegetables', 380, 28, 30, 10, 'NON_VEG', 'DIABETIC_BP_CONTROL', 3);

-- ============================================
-- SEED DATA: Workout Plans - Day 3
-- ============================================

-- Beginner - Overall Health - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Jumping Jacks', '15', 3, 'Cardio', 'BEGINNER', 'OVERALL_HEALTH', 3),
('Glute Bridges', '12', 3, 'Lower Body', 'BEGINNER', 'OVERALL_HEALTH', 3),
('Incline Push-ups', '10', 3, 'Upper Body', 'BEGINNER', 'OVERALL_HEALTH', 3),
('Dead Bug', '10', 3, 'Core', 'BEGINNER', 'OVERALL_HEALTH', 3),
('Hip Circles', '10 each side', 2, 'Flexibility', 'BEGINNER', 'OVERALL_HEALTH', 3);

-- Intermediate - Overall Health - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Jump Rope', '5 mins', 3, 'Cardio', 'INTERMEDIATE', 'OVERALL_HEALTH', 3),
('Goblet Squats', '15', 3, 'Lower Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 3),
('Diamond Push-ups', '12', 3, 'Upper Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 3),
('Bicycle Crunches', '20', 3, 'Core', 'INTERMEDIATE', 'OVERALL_HEALTH', 3),
('Kettlebell Swings', '15', 3, 'Full Body', 'INTERMEDIATE', 'OVERALL_HEALTH', 3);

-- Hard - Overall Health - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Battle Ropes', '30 sec', 4, 'Cardio', 'HARD', 'OVERALL_HEALTH', 3),
('Front Squats', '10', 4, 'Lower Body', 'HARD', 'OVERALL_HEALTH', 3),
('Muscle-ups', '6', 4, 'Upper Body', 'HARD', 'OVERALL_HEALTH', 3),
('Dragon Flags', '8', 3, 'Core', 'HARD', 'OVERALL_HEALTH', 3),
('Box Jump Burpees', '10', 3, 'Full Body', 'HARD', 'OVERALL_HEALTH', 3);

-- Beginner - Muscular Strength - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Dumbbell Goblet Squats', '10', 3, 'Lower Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 3),
('Dumbbell Floor Press', '10', 3, 'Upper Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 3),
('Dumbbell Rows (Light)', '12', 3, 'Upper Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 3),
('Superman Hold', '15 sec', 3, 'Core', 'BEGINNER', 'MUSCULAR_STRENGTH', 3),
('Band Assisted Squats', '12', 3, 'Lower Body', 'BEGINNER', 'MUSCULAR_STRENGTH', 3);

-- Intermediate - Muscular Strength - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Barbell Overhead Press', '10', 3, 'Upper Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 3),
('Leg Press', '12', 3, 'Lower Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 3),
('Seated Cable Rows', '12', 3, 'Upper Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 3),
('Weighted Plank', '30 sec', 3, 'Core', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 3),
('Dumbbell Lunges', '10 each', 3, 'Lower Body', 'INTERMEDIATE', 'MUSCULAR_STRENGTH', 3);

-- Hard - Muscular Strength - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Power Cleans', '6', 4, 'Full Body', 'HARD', 'MUSCULAR_STRENGTH', 3),
('Weighted Dips', '10', 4, 'Upper Body', 'HARD', 'MUSCULAR_STRENGTH', 3),
('Front Squats', '8', 4, 'Lower Body', 'HARD', 'MUSCULAR_STRENGTH', 3),
('T-Bar Rows', '10', 4, 'Upper Body', 'HARD', 'MUSCULAR_STRENGTH', 3),
('Ab Wheel Rollouts', '10', 3, 'Core', 'HARD', 'MUSCULAR_STRENGTH', 3);

-- Beginner - Weight Loss - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Dance Aerobics', '15 mins', 1, 'Cardio', 'BEGINNER', 'WEIGHT_LOSS', 3),
('Sumo Squats', '12', 3, 'Lower Body', 'BEGINNER', 'WEIGHT_LOSS', 3),
('Flutter Kicks', '15', 3, 'Core', 'BEGINNER', 'WEIGHT_LOSS', 3),
('Shadow Boxing', '5 mins', 2, 'Cardio', 'BEGINNER', 'WEIGHT_LOSS', 3),
('Leg Raises', '12', 3, 'Core', 'BEGINNER', 'WEIGHT_LOSS', 3);

-- Intermediate - Weight Loss - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Stair Climbing', '20 mins', 1, 'Cardio', 'INTERMEDIATE', 'WEIGHT_LOSS', 3),
('Lunge Jumps', '12', 3, 'Lower Body', 'INTERMEDIATE', 'WEIGHT_LOSS', 3),
('Plank Jacks', '15', 3, 'Core', 'INTERMEDIATE', 'WEIGHT_LOSS', 3),
('Tuck Jumps', '10', 3, 'Full Body', 'INTERMEDIATE', 'WEIGHT_LOSS', 3),
('Battle Rope Alternating Waves', '30 sec', 3, 'Cardio', 'INTERMEDIATE', 'WEIGHT_LOSS', 3);

-- Hard - Weight Loss - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Rowing Machine Intervals', '20 mins', 1, 'Cardio', 'HARD', 'WEIGHT_LOSS', 3),
('Barbell Deadlifts', '10', 4, 'Full Body', 'HARD', 'WEIGHT_LOSS', 3),
('Wall Balls', '15', 3, 'Full Body', 'HARD', 'WEIGHT_LOSS', 3),
('Box Jump Overs', '12', 3, 'Lower Body', 'HARD', 'WEIGHT_LOSS', 3),
('Assault Bike Sprints', '30 sec', 4, 'Cardio', 'HARD', 'WEIGHT_LOSS', 3);

-- Beginner - Diabetic/BP Control - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Tai Chi Movements', '15 mins', 1, 'Relaxation', 'BEGINNER', 'DIABETIC_BP_CONTROL', 3),
('Wall Sit', '20 sec', 2, 'Lower Body', 'BEGINNER', 'DIABETIC_BP_CONTROL', 3),
('Wrist Rotations', '10', 2, 'Upper Body', 'BEGINNER', 'DIABETIC_BP_CONTROL', 3),
('Diaphragmatic Breathing', '5 mins', 1, 'Relaxation', 'BEGINNER', 'DIABETIC_BP_CONTROL', 3),
('Neck Stretches', '10 mins', 1, 'Flexibility', 'BEGINNER', 'DIABETIC_BP_CONTROL', 3);

-- Intermediate - Diabetic/BP Control - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Light Cycling', '25 mins', 1, 'Cardio', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 3),
('Lunges', '10', 3, 'Lower Body', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 3),
('Wall Push-ups', '12', 3, 'Upper Body', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 3),
('Seated Twist', '10', 3, 'Core', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 3),
('Progressive Muscle Relaxation', '10 mins', 1, 'Relaxation', 'INTERMEDIATE', 'DIABETIC_BP_CONTROL', 3);

-- Hard - Diabetic/BP Control - Day 3
INSERT INTO workout_plans (exercise_name, reps, sets, category, workout_level, goal, day_number) VALUES
('Jogging', '30 mins', 1, 'Cardio', 'HARD', 'DIABETIC_BP_CONTROL', 3),
('Step-ups with Dumbbells', '12', 3, 'Lower Body', 'HARD', 'DIABETIC_BP_CONTROL', 3),
('Resistance Band Chest Press', '12', 3, 'Upper Body', 'HARD', 'DIABETIC_BP_CONTROL', 3),
('Russian Twists (Light)', '15', 3, 'Core', 'HARD', 'DIABETIC_BP_CONTROL', 3),
('Cool-down Yoga Flow', '10 mins', 1, 'Flexibility', 'HARD', 'DIABETIC_BP_CONTROL', 3);
