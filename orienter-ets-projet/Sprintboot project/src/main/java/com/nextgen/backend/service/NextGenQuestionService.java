package com.nextgen.backend.service;

import com.nextgen.backend.tables.Question;

import java.util.List;
import java.util.Map;

public interface NextGenQuestionService {
    public List<Question> findAllQuestions();
    public boolean deleteById(Long id, String token);
    public boolean updateById(Long id, String question, String sigle, String token);
    public boolean saveQuestion(String question, String sigle, String token);
}
