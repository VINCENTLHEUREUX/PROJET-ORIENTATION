package com.vlh.projet_orientation.model;

import java.util.List;

public class QuestionsResponse
{
    private String message;
    private List<com.vlh.projet_orientation.model.Question> questions;

    // Getter pour accéder à la liste des questions reçues
    public List<com.vlh.projet_orientation.model.Question> getQuestions()
    {
        return questions;
    }

    public String getMessage()
    {
        return message;
    }
}
