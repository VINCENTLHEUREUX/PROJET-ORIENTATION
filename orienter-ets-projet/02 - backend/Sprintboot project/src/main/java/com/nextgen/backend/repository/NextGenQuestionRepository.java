package com.nextgen.backend.repository;

import com.nextgen.backend.tables.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NextGenQuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySigle(String sigle);
    
}
