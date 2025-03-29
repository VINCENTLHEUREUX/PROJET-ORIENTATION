package com.nextgen.backend.model;

public class ResultatRequest {
    private int resultatGLO;
    private int resultatELE;
    private int resultatMEC;
    private int resultatCIV;
    private int resultatIND;
    private int resultatLOG;
    private String email;
    private String password;

    public ResultatRequest(){

    }

    public int getResultatGLO() {
        return resultatGLO;
    }

    public void setResultatGLO(int resultatGLO) {
        this.resultatGLO = resultatGLO;
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

    public int getResultatCIV() {
        return resultatCIV;
    }

    public void setResultatCIV(int resultatCIV) {
        this.resultatCIV = resultatCIV;
    }

    public int getResultatIND() {
        return resultatIND;
    }

    public void setResultatIND(int resultatIND) {
        this.resultatIND = resultatIND;
    }

    public int getResultatLOG() {
        return resultatLOG;
    }

    public void setResultatLOG(int resultatLOG) {
        this.resultatLOG = resultatLOG;
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
}
