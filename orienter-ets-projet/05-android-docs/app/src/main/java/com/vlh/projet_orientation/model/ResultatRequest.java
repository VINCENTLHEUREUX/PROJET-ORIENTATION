package com.vlh.projet_orientation.model;

import java.io.Serializable;

public class ResultatRequest implements Serializable {

    private String token;
    private int resultatGOL;
    private int resultatELE;
    private int resultatMEC;
    private int resultatLOG;
    private int resultatAER;
    private int resultatCTN;
    private int resultatGPA;
    private int resultatGTI;

    // Constructeur vide pour plus de souplesse
    public ResultatRequest() {
    }
    public ResultatRequest(String token) {
        this.token = token;
    }

    // Getters
    public String getToken() { return token; }
    public int getResultatGOL() { return resultatGOL; }
    public int getResultatELE() { return resultatELE; }
    public int getResultatMEC() { return resultatMEC; }
    public int getResultatLOG() { return resultatLOG; }
    public int getResultatAER() { return resultatAER; }
    public int getResultatCTN() { return resultatCTN; }
    public int getResultatGPA() { return resultatGPA; }
    public int getResultatGTI() { return resultatGTI; }

    // Setters
    public void setToken(String token) { this.token = token; }
    public void setResultatGOL(int resultatGOL) { this.resultatGOL = resultatGOL; }
    public void setResultatELE(int resultatELE) { this.resultatELE = resultatELE; }
    public void setResultatMEC(int resultatMEC) { this.resultatMEC = resultatMEC; }
    public void setResultatLOG(int resultatLOG) { this.resultatLOG = resultatLOG; }
    public void setResultatAER(int resultatAER) { this.resultatAER = resultatAER; }
    public void setResultatCTN(int resultatCTN) { this.resultatCTN = resultatCTN; }
    public void setResultatGPA(int resultatGPA) { this.resultatGPA = resultatGPA; }
    public void setResultatGTI(int resultatGTI) { this.resultatGTI = resultatGTI; }
}
