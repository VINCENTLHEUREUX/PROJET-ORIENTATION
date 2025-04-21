package com.nextgen.backend.repository;

import com.nextgen.backend.tables.ResultatQuizz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenResultatRepository extends JpaRepository<ResultatQuizz, Long> {
    ResultatQuizz findByResultId (long resultId);
    ResultatQuizz findTopByEmailOrderByTimeDesc(String email);
}
