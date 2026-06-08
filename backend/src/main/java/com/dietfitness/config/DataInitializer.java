package com.dietfitness.config;

import com.dietfitness.entity.User;
import com.dietfitness.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .name("Admin")
                    .phone("0000000000")
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .gender(User.Gender.MALE)
                    .age(30)
                    .heightCm(175.0)
                    .weightKg(70.0)
                    .dietPreference(User.DietPreference.VEG)
                    .workoutLevel(User.WorkoutLevel.INTERMEDIATE)
                    .goal(User.Goal.OVERALL_HEALTH)
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println(">>> Admin user created: admin / admin123");
        }
    }
}
