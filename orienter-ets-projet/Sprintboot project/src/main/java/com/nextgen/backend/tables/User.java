package com.nextgen.backend.tables;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @Column(unique = true)
    private String token;
    private String nom;
    private String prenom;
    private String role;
    private LocalDate date;


    public User(){}

    public User(Long userId, String email, String password, String nom, String prenom,
                LocalDate date, String token){
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.date = date;
        this.token = token;
    }
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

    public void setRole(String role){this.role = role;}

    public String getRole(){return role;}

}

