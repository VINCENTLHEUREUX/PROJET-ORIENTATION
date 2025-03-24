package com.nextgen.backend.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="user")

/*
L'IDENTIFIANT DE L'UTILISATEUR SERA GÉNÉRÉ AUTOMATIQUEMENT PAR LE PROGRAMME. VEUILLEZ NE PAS L'INCULURE DANS LES REQUÊTES.
 */


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String email;
    private String password; //IL FAUT HASH CE PASSWORD
    private String nom;
    private String prenom;
    private LocalDate date;

    public User(){}

    public User(Long userId, String email, String password, String nom, String prenom, LocalDate date){
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

