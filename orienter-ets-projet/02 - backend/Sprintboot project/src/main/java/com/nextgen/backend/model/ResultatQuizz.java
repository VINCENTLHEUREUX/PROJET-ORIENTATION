package com.nextgen.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="Resultat")

public class ResultatQuizz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;
    private long userId;
    private int resultatGLO;
    private int resultatELE;
    private int resultatMEC;
    private int resultatCIV;
    private int resultatIND;
    private int resultatLOG;
    private LocalDateTime time = LocalDateTime.now();

/******************************** CONSTRUCTEUR AVEC PARAM **************************************/
    public ResultatQuizz(long resultId, long userId, int resultatGLO, int resultatELE,
                         int resultatMEC, int resultatCIV, int resultatIND, int resultatLOG)
    {
        this.userId = userId;
        this.resultatGLO = resultatGLO;
        this.resultatELE = resultatELE;
        this.resultatMEC = resultatMEC;
        this.resultatCIV = resultatCIV;
        this.resultatIND = resultatIND;
        this.resultatLOG = resultatLOG;
    }

/********************************** EMPTY CONSTRUCTOR ************************************/
    public ResultatQuizz(){};

/********************************* SETTERS *****************************/
    public void setResultId(long resultId) {
        this.resultId = resultId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setResultatGLO(int resultatGLO) {
        this.resultatGLO = resultatGLO;
    }

    public void setResultatELE(int resultatELE) {
        this.resultatELE = resultatELE;
    }

    public void setResultatMEC(int resultatMEC) {
        this.resultatMEC = resultatMEC;
    }

    public void setResultatCIV(int resultatCIV) {
        this.resultatCIV = resultatCIV;
    }

    public void setResultatIND(int resultatIND) {
        this.resultatIND = resultatIND;
    }

    public void setResultatLOG(int resultatLOG) {
        this.resultatLOG = resultatLOG;
    }

    /********************************* GETTERS *************************************/
    public Long getResultId() {
        return resultId;
    }

    public long getUserId() {
        return userId;
    }

    public int getResultatGLO() {
        return resultatGLO;
    }

    public int getResultatELE() {
        return resultatELE;
    }

    public int getResultatMEC() {
        return resultatMEC;
    }

    public int getResultatCIV() {
        return resultatCIV;
    }

    public int getResultatIND() {
        return resultatIND;
    }

    public int getResultatLOG() {
        return resultatLOG;
    }



}
