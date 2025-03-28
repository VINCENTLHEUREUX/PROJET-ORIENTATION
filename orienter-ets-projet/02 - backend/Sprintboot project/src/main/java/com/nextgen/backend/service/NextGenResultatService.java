package com.nextgen.backend.service;

import com.nextgen.backend.model.ResultatQuizz;

public interface NextGenResultatService {

    ResultatQuizz findByResultId(Long resultId);
    ResultatQuizz findTopByUserIdOrderByTimeDesc(long userId);
    boolean existsByUserId(Long userId);
    boolean createResult(ResultatQuizz result);
}
