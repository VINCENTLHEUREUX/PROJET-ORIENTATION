package com.nextgen.backend.service.impl;


import com.nextgen.backend.model.ResultatRequest;
import com.nextgen.backend.model.ResultatQuizz;
import com.nextgen.backend.model.User;
import com.nextgen.backend.service.NextGenResultatService;
import com.nextgen.backend.service.NextGenUserService;
import org.springframework.stereotype.Service;
import com.nextgen.backend.repository.NextGenResultatRepository;

@Service
public class NextGenResultatServiceImpl implements NextGenResultatService {
    NextGenResultatRepository nextGenResultatRepository;
    NextGenUserService nextGenUserService;

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
            ResultatQuizz saved = nextGenResultatRepository.save(result);
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
    public ResultatQuizz findTopByEmailOrderByTimeDesc(String email){
        return nextGenResultatRepository.findTopByEmailOrderByTimeDesc(email);
    }

    public boolean existsByEmail(String email) {
        return nextGenResultatRepository.existsByEmail(email);
    }
    public ResultatQuizz getResultatFromRequest(ResultatRequest resultatRequest){
        ResultatQuizz resultatQuizz = new ResultatQuizz();
        resultatQuizz.setResultatCIV(resultatRequest.getResultatCIV());
        resultatQuizz.setResultatELE(resultatRequest.getResultatELE());
        resultatQuizz.setResultatGLO(resultatRequest.getResultatGLO());
        resultatQuizz.setResultatIND(resultatRequest.getResultatIND());
        resultatQuizz.setResultatLOG(resultatRequest.getResultatLOG());
        resultatQuizz.setResultatMEC(resultatRequest.getResultatMEC());
        resultatQuizz.setEmail(resultatRequest.getEmail());
        return resultatQuizz;
    }
    public User getUserFromRequest(ResultatRequest resultatRequest){
        User user = new User();
        user.setEmail(resultatRequest.getEmail());
        user.setPassword(resultatRequest.getPassword());
            return user;
    }

}
