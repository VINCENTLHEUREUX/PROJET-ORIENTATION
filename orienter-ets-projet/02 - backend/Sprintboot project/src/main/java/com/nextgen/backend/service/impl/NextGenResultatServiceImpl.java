package com.nextgen.backend.service.impl;


import com.nextgen.backend.model.ResultatQuizz;
import com.nextgen.backend.service.NextGenResultatService;
import org.springframework.stereotype.Service;
import com.nextgen.backend.repository.NextGenResultatRepository;

import javax.xml.transform.Result;

@Service
public class NextGenResultatServiceImpl implements NextGenResultatService {
    NextGenResultatRepository nextGenResultatRepository;

    public NextGenResultatServiceImpl (NextGenResultatRepository nextGenResultatRepository) {
        this.nextGenResultatRepository = nextGenResultatRepository;
    }

    public ResultatQuizz findByResultId(Long resultId) {
        ResultatQuizz Quizz = nextGenResultatRepository.findByResultId(resultId);
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

    public boolean createResult(ResultatQuizz result) {
        System.out.println("Attempting to save: " + result.getUserId() + " " + result.getResultatGLO());
        try {
            ResultatQuizz saved = nextGenResultatRepository.save(result);
            System.out.println("Save result: " + (saved != null ? "success" : "failed"));
            return true;
        } catch (Exception e) {
            System.out.println("Error saving: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
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
    public ResultatQuizz findTopByUserIdOrderByTimeDesc(long userId){
        return nextGenResultatRepository.findTopByUserIdOrderByTimeDesc(userId);
    }

    @Override
    public boolean existsByUserId(Long userId) {
        return nextGenResultatRepository.existsByUserId(userId);
    }
}
