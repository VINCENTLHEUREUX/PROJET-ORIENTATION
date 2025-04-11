package com.nextgen.backend.tables.requests;

public class ResultatRequest {
    private int resultatGOL;
    private int resultatELE;
    private int resultatMEC;
    private int resultatLOG;
    private int resultatAER;
    private int resultatCTN;
    private int resultatGPA;
    private int resultatGTI;
    private String token;

    public ResultatRequest(){

    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getResultatMEC() {
        return resultatMEC;
    }

    public void setResultatMEC(int resultatMEC) {
        this.resultatMEC = resultatMEC;
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
}
