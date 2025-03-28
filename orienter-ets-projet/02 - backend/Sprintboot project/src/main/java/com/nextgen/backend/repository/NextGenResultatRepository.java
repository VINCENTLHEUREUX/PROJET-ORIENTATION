package com.nextgen.backend.repository;

import com.nextgen.backend.model.ResultatQuizz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenResultatRepository extends JpaRepository<ResultatQuizz, Long> {
    ResultatQuizz findByQuizzId (String quizzId);
    ResultatQuizz findTopByUserIdOrderByTimeDesc(long userId);
}
