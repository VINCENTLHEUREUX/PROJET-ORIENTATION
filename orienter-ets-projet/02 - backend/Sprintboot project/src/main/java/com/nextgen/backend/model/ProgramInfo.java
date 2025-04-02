package com.nextgen.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name="programinfo")

public class ProgramInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long programId;
    private String sigle;
    private String nom;
    private String description;

    public ProgramInfo(){}

    public ProgramInfo(Long programId, String sigle, String nom, String description){
        this.programId = programId;
        this.sigle = sigle;
        this.nom = nom;
        this.description = description;
    }

    public Long getProgramId() {
        return programId;
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
    public void setDescription(String description) {
        this.description = description;
    }
    public void setProgramId(Long programId) {
        this.programId = programId;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public void setSigle(String sigle) {
        this.sigle = sigle;
    }
}

