package com.nextgen.backend.service.impl;

import com.nextgen.backend.repository.NextGenQuestionRepository;
import com.nextgen.backend.service.NextGenQuestionService;
import com.nextgen.backend.service.NextGenUserService;
import com.nextgen.backend.tables.ProgramInfo;
import com.nextgen.backend.tables.Question;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NextGenQuestionServiceImpl implements NextGenQuestionService {
    private final NextGenQuestionRepository nextGenQuestionRepository;
    private final NextGenUserService nextGenUserService;

    @Autowired
    public NextGenQuestionServiceImpl(NextGenQuestionRepository nextGenQuestionRepository, NextGenUserService nextGenUserService) {
        this.nextGenQuestionRepository = nextGenQuestionRepository;
        this.nextGenUserService = nextGenUserService;
    }
    public List<Question> findAllQuestions(){
        return nextGenQuestionRepository.findAll();
    }

    @Override
    @Transactional
    public boolean deleteById(Long id, String token) {
        if (nextGenUserService.isAdmin(token)){
            nextGenQuestionRepository.deleteQuestionById(id);
            return true;
        }
        return false;
    }
    public boolean updateById(Long id, String question, String sigle, String token) {
        if (nextGenUserService.isAdmin(token) && nextGenQuestionRepository.existsById(id)){
            Question objetQuestion =
                    nextGenQuestionRepository.getQuestionById(id);
            objetQuestion.setDescription(question);
            objetQuestion.setSigle(sigle);
            nextGenQuestionRepository.save(objetQuestion);
            return true;
        }
        return false;
    }
    public boolean saveQuestion(String question, String sigle, String token) {
        if (nextGenUserService.isAdmin(token) && !nextGenQuestionRepository.existsByDescription(question)){
            Question objetQuestion = new Question();
            objetQuestion.setDescription(question);
            objetQuestion.setSigle(sigle);
            nextGenQuestionRepository.save(objetQuestion);
            return true;
        }
        return false;
    }
}
