package com.nextgen.backend.service;

import com.nextgen.backend.tables.ResultatQuizz;
import com.nextgen.backend.tables.requests.ResultatRequest;
import com.nextgen.backend.tables.User;

import java.util.List;

public interface NextGenResultatService {

    ResultatQuizz findByResultId(Long resultId);
    boolean createResult(ResultatQuizz result);
    ResultatQuizz getResultatFromRequest(ResultatRequest resultatRequest);
    User getUserFromRequest(ResultatRequest resultatRequest);
    ResultatQuizz findTopByEmailOrderByTimeDesc(String email);
    List<ResultatQuizz> getAllResults(String token);
    public boolean deleteByResultId(long resultId);
    boolean existsById(Long id);
    public boolean updateById(ResultatQuizz resultat);
}
