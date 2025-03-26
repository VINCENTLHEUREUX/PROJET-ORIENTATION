package com.nextgen.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="user")


public class User {
    @Id
    private String userId;
    private String email;
    private String password; //IL FAUT HASH CE PASSWORD
    private String nom;
    private String prenom;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String role = "Utilisateur";
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private LocalDate date = LocalDate.now();


    public User(){}

    public User(String userId, String email, String password, String nom, String prenom, LocalDate date){
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.nom = nom;
        this.prenom = prenom;
        this.date = date;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
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

