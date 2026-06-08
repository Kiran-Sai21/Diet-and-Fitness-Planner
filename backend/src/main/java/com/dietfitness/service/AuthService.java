package com.dietfitness.service;

import com.dietfitness.dto.*;
import com.dietfitness.entity.*;
import com.dietfitness.repository.*;
import com.dietfitness.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        User user = User.builder()
                .name(req.getName())
                .phone(req.getPhone())
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .gender(User.Gender.valueOf(req.getGender()))
                .age(req.getAge())
                .heightCm(req.getHeightCm())
                .weightKg(req.getWeightKg())
                .dietPreference(User.DietPreference.valueOf(req.getDietPreference()))
                .workoutLevel(User.WorkoutLevel.valueOf(req.getWorkoutLevel()))
                .goal(User.Goal.valueOf(req.getGoal()))
                .role(User.Role.USER)
                .build();
        userRepository.save(user);

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        String token = jwtTokenProvider.generateToken(auth);

        return AuthResponse.builder()
                .token(token).username(user.getUsername())
                .role(user.getRole().name()).userId(user.getId()).build();
    }

    public AuthResponse login(LoginRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        String token = jwtTokenProvider.generateToken(auth);
        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return AuthResponse.builder()
                .token(token).username(user.getUsername())
                .role(user.getRole().name()).userId(user.getId()).build();
    }
}
