package com.nextgen.backend.service.impl;


import com.nextgen.backend.model.ResultatQuizz;
import org.springframework.stereotype.Service;
import com.nextgen.backend.repository.NextGenResultatRepository;

import javax.xml.transform.Result;

@Service
public class NextGenResultatServiceImpl {
    NextGenResultatRepository nextGenResultatRepository;

    public NextGenResultatServiceImpl (NextGenResultatRepository nextGenResultatRepository) {
        this.nextGenResultatRepository = nextGenResultatRepository;
    }

    public ResultatQuizz findByResultId(Long resultId) {
        ResultatQuizz Quizz = nextGenResultatRepository.findByQuizzId(String.valueOf(resultId));
        if (Quizz != null){
            return Quizz;
        }
        return null;
    }

    public boolean existsByResultId(Long resultId){
        if (findByResultId(resultId) != null){
            return true;
        }
        return false;
    }

    public boolean createResult(ResultatQuizz result){
        nextGenResultatRepository.save(result);
        return true;
    }

    public boolean deleteByResultId(long resultId){
        ResultatQuizz quizzCopie;

        if (!existsByResultId(resultId)) {
            return false;
        }

        quizzCopie = findByResultId(resultId);
        nextGenResultatRepository.delete(quizzCopie);
        return true;
    }
    ResultatQuizz findTopByUserIdOrderByTimeDesc(long userId){
        return nextGenResultatRepository.findTopByUserIdOrderByTimeDesc(userId);
    }
}
