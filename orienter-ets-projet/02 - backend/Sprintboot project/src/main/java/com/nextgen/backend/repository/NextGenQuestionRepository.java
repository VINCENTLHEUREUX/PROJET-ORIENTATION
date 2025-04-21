package com.nextgen.backend.repository;

import com.nextgen.backend.tables.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NextGenQuestionRepository extends JpaRepository<Question, Long> {
    boolean existsByDescription(String question);
    Question getQuestionById(Long id);
    void deleteQuestionById(Long id);
}
