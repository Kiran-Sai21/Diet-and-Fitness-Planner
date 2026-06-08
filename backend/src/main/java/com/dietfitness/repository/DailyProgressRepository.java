package com.dietfitness.repository;

import com.dietfitness.entity.DailyProgress;
import com.dietfitness.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyProgressRepository extends JpaRepository<DailyProgress, Long> {
    Optional<DailyProgress> findByUserAndProgressDate(User user, LocalDate progressDate);
    List<DailyProgress> findByUserOrderByProgressDateDesc(User user);
    List<DailyProgress> findTop10ByUserOrderByProgressDateDesc(User user);
}
