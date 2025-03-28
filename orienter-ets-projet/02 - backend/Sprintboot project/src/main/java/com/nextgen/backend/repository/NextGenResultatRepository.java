package com.nextgen.backend.repository;

import com.nextgen.backend.model.ResultatQuizz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenResultatRepository extends JpaRepository<ResultatQuizz, Long> {
    ResultatQuizz findByResultId (long resultId);
    ResultatQuizz findTopByUserIdOrderByTimeDesc(long userId);
    boolean existsByUserId(long userId);
}
