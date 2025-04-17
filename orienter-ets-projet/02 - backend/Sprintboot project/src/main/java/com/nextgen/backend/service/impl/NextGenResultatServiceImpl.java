package com.nextgen.backend.service.impl;


import com.nextgen.backend.tables.requests.ResultatRequest;
import com.nextgen.backend.tables.ResultatQuizz;
import com.nextgen.backend.tables.User;
import com.nextgen.backend.service.NextGenResultatService;
import com.nextgen.backend.service.NextGenUserService;
import org.springframework.stereotype.Service;
import com.nextgen.backend.repository.NextGenResultatRepository;

import java.util.Collections;
import java.util.List;

@Service
public class NextGenResultatServiceImpl implements NextGenResultatService {
    NextGenResultatRepository nextGenResultatRepository;
    NextGenUserService nextGenUserService;

    public NextGenResultatServiceImpl (NextGenResultatRepository nextGenResultatRepository, NextGenUserService nextGenUserService) {
        this.nextGenResultatRepository = nextGenResultatRepository;
        this.nextGenUserService = nextGenUserService;
    }

    public ResultatQuizz findByResultId(Long resultId) {
        ResultatQuizz Quizz = nextGenResultatRepository.findByResultId(resultId);
        if (Quizz != null){
            return Quizz;
        }
        return null;
    }


    public boolean createResult(ResultatQuizz result) {
            ResultatQuizz saved = nextGenResultatRepository.save(result);
            return true;
    }

    public boolean deleteByResultId(long resultId){
        ResultatQuizz quizzCopie;

        if (!existsById(resultId)) {
            return false;
        }

        quizzCopie = findByResultId(resultId);
        nextGenResultatRepository.delete(quizzCopie);
        return true;
    }

    @Override
    public boolean updateById(ResultatQuizz resultat) {
        if (!existsById(resultat.getResultId())) {
            return false;
        }
        nextGenResultatRepository.save(resultat);
        return true;
    }

    @Override
    public boolean existsById(Long id) {
        return nextGenResultatRepository.existsById(id);
    }

    public ResultatQuizz findTopByEmailOrderByTimeDesc(String email){
        return nextGenResultatRepository.findTopByEmailOrderByTimeDesc(email);
    }

    public ResultatQuizz getResultatFromRequest(ResultatRequest resultatRequest){
        ResultatQuizz resultatQuizz = new ResultatQuizz();
        resultatQuizz.setResultatELE(resultatRequest.getResultatELE());
        resultatQuizz.setResultatGOL(resultatRequest.getResultatGOL());
        resultatQuizz.setResultatLOG(resultatRequest.getResultatLOG());
        resultatQuizz.setResultatMEC(resultatRequest.getResultatMEC());
        resultatQuizz.setResultatAER(resultatRequest.getResultatAER());
        resultatQuizz.setResultatCTN(resultatRequest.getResultatCTN());
        resultatQuizz.setResultatGPA(resultatRequest.getResultatGPA());
        resultatQuizz.setResultatGTI(resultatRequest.getResultatGTI());
        resultatQuizz.setResultId(resultatRequest.getResultId());
        resultatQuizz.setEmail(nextGenUserService.getUserByToken(resultatRequest.getToken()).getEmail());
        return resultatQuizz;
    }

    public User getUserFromRequest(ResultatRequest resultatRequest){
        User user = new User();
        user.setToken(resultatRequest.getToken());
            return user;
    }

    public List<ResultatQuizz> getAllResults(String token) {
        if (nextGenUserService.isAdmin(token)){
            return nextGenResultatRepository.findAll();
        }
        return Collections.emptyList();
    }

}
