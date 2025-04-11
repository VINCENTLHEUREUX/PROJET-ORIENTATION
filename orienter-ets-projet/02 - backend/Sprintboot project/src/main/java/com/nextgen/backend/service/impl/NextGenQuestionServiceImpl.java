package com.nextgen.backend.service.impl;

import com.nextgen.backend.repository.NextGenQuestionRepository;
import com.nextgen.backend.service.NextGenQuestionService;
import com.nextgen.backend.tables.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NextGenQuestionServiceImpl implements NextGenQuestionService {
    private final NextGenQuestionRepository nextGenQuestionRepository;

    @Autowired
    public NextGenQuestionServiceImpl(NextGenQuestionRepository nextGenQuestionRepository) {
        this.nextGenQuestionRepository = nextGenQuestionRepository;
    }
    public Map<String, List<String>> getAllQuestions() {
        Map<String, List<String>> result = new HashMap<>();

        List<String> genieCodes = nextGenQuestionRepository.findAll().stream()
                .map(Question::getSigle)
                .distinct()
                .collect(Collectors.toList());

        for (String genieCode : genieCodes) {
            List<String> questions =
                    nextGenQuestionRepository.findBySigle(genieCode).stream()
                    .map(Question::getDescription)
                    .collect(Collectors.toList());

            result.put(genieCode, questions);
        }

        return result;
    }
}
