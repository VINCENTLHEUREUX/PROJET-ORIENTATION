package com.vlh.projet_orientation.model;

import android.util.Log;

public class Question
{
    private Long id;
    private String texte;
    private String categorie;
    private int points;

    // Constructeur
    public Question(Long id, String texte, String categorie, int points)
    {
        this.id = id;
        this.texte = texte;
        this.categorie = categorie;
        this.points = points;
    }

    public void setPoints(int points)
    {
        this.points = points;
        Log.d("MODEL", "🔥 Question ID " + id + " → set à " + points); // log pour debug
    }

    // Getters
    public Long getId()
    {
        return id;
    }

    public String getTexte()
    {
        return texte;
    }

    public String getCategorie()
    {
        return categorie;
    }

    public int getPoints()
    {
        return points;
    }

    @Override
    public String toString()
    {
        // Affichage utile pour debug ou logs
        return "Question{" +
                "id=" + id +
                ", texte='" + texte + '\'' +
                ", categorie='" + categorie + '\'' +
                ", points=" + points +
                '}';
    }
}
