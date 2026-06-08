package com.dietfitness.controller;

import com.dietfitness.dto.*;
import com.dietfitness.service.DashboardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDto> getDashboard(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(dashboardService.getDashboard(userDetails.getUsername()));
    }

    @PostMapping("/complete-task")
    public ResponseEntity<DashboardDto.ProgressDto> completeTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, Object> body) {
        Long taskId = Long.valueOf(body.get("taskId").toString());
        String taskType = body.get("taskType").toString();
        return ResponseEntity.ok(dashboardService.completeTask(userDetails.getUsername(), taskId, taskType));
    }

    @GetMapping("/history")
    public ResponseEntity<List<DashboardDto.ProgressDto>> getHistory(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(dashboardService.getHistory(userDetails.getUsername()));
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDto> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(dashboardService.getProfile(userDetails.getUsername()));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileDto> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(dashboardService.updateProfile(userDetails.getUsername(), request));
    }
}
