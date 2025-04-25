package com.vlh.projet_orientation.model;

public class InscriptionUser
{
    private String prenom;
    private String nom;
    private String email;
    private String password;

    // Constructeur pour créer un nouvel utilisateur
    public InscriptionUser(String prenom, String nom, String email, String password)
    {
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
        this.password = password;
    }

    // Méthodes pour accéder aux infos (getters)
    public String getPrenom()
    {
        return prenom;
    }

    public String getNom()
    {
        return nom;
    }

    public String getEmail()
    {
        return email;
    }

    public String getPassword()
    {
        return password;
    }
}
