package com.nextgen.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="programinfo")

public class ProgramInfo {
    @Id
    private String sigle;
    private String nom;
    private String description;
    private String url;
    private int credits;

    public ProgramInfo(){}

    public ProgramInfo(String sigle, String nom, String description,
                       String url, int credits){
        this.sigle = sigle;
        this.nom = nom;
        this.description = description;
        this.url = url;
        this.credits = credits;
    }

    public String getNom(){
        return nom;
    }
    public String getDescription() {
        return description;
    }
    public String getSigle() {
        return sigle;
    }
    public String getUrl() { return url; }
    public int getCredits() { return credits; }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public void setSigle(String sigle) {
        this.sigle = sigle;
    }
    public void setUrl(String url) { this.url = url;}
    public void setCredits(int credits) {this.credits = credits;}
}

