package com.nextgen.backend.tables;

import com.nextgen.backend.repository.NextGenUserRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Entity
@Table(name="Resultat")

public class ResultatQuizz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resultId;
    private String email;
    private int resultatGOL;
    private int resultatELE;
    private int resultatMEC;
    private int resultatLOG;
    private int resultatAER;
    private int resultatCTN;
    private int resultatGPA;
    private int resultatGTI;
    private LocalDateTime time = LocalDateTime.now();
    @Transient
    @Autowired
    NextGenUserRepository nextGenUserRepository;

    /******************************** CONSTRUCTEUR AVEC PARAM **************************************/
    public ResultatQuizz(long resultId, String email, int resultatGOL, int resultatELE,
                         int resultatMEC, int resultatLOG, int resultatAER, int resultatCTN,
                         int resultatGPA, int resultatGTI) {
        this.resultId = resultId;
        this.email = email;
        this.resultatGOL = resultatGOL;
        this.resultatELE = resultatELE;
        this.resultatMEC = resultatMEC;
        this.resultatLOG = resultatLOG;
        this.resultatAER = resultatAER;
        this.resultatCTN = resultatCTN;
        this.resultatGPA = resultatGPA;
        this.resultatGTI = resultatGTI;
    }

    /********************************** EMPTY CONSTRUCTOR ************************************/
    public ResultatQuizz() {
    }

    ;

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public long getResultId() {
        return resultId;
    }

    public void setResultId(long resultId) {
        this.resultId = resultId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getResultatGOL() {
        return resultatGOL;
    }

    public void setResultatGOL(int resultatGOL) {
        this.resultatGOL = resultatGOL;
    }

    public int getResultatELE() {
        return resultatELE;
    }

    public void setResultatELE(int resultatELE) {
        this.resultatELE = resultatELE;
    }

    public int getResultatMEC() {
        return resultatMEC;
    }

    public void setResultatMEC(int resultatMEC) {
        this.resultatMEC = resultatMEC;
    }

    public int getResultatLOG() {
        return resultatLOG;
    }

    public void setResultatLOG(int resultatLOG) {
        this.resultatLOG = resultatLOG;
    }

    public int getResultatAER() {
        return resultatAER;
    }

    public void setResultatAER(int resultatAER) {
        this.resultatAER = resultatAER;
    }

    public int getResultatCTN() {
        return resultatCTN;
    }

    public void setResultatCTN(int resultatCTN) {
        this.resultatCTN = resultatCTN;
    }

    public int getResultatGPA() {
        return resultatGPA;
    }

    public void setResultatGPA(int resultatGPA) {
        this.resultatGPA = resultatGPA;
    }

    public int getResultatGTI() {
        return resultatGTI;
    }

    public void setResultatGTI(int resultatGTI) {
        this.resultatGTI = resultatGTI;
    }

    public NextGenUserRepository getNextGenUserRepository() {
        return nextGenUserRepository;
    }

    public void setNextGenUserRepository(NextGenUserRepository nextGenUserRepository) {
        this.nextGenUserRepository = nextGenUserRepository;
    }
}

/********************************* SETTERS *****************************/
