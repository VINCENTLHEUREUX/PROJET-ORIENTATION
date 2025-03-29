package com.nextgen.backend.service;

import com.nextgen.backend.model.ResultatQuizz;
import com.nextgen.backend.model.ResultatRequest;
import com.nextgen.backend.model.User;

public interface NextGenResultatService {

    ResultatQuizz findByResultId(Long resultId);
    boolean createResult(ResultatQuizz result);
    ResultatQuizz getResultatFromRequest(ResultatRequest resultatRequest);
    User getUserFromRequest(ResultatRequest resultatRequest);
    ResultatQuizz findTopByEmailOrderByTimeDesc(String email);
}
