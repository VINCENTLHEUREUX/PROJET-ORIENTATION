package com.vlh.projet_orientation.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class ResultatResponse implements Serializable {

    @SerializedName("resultatctn")
    private int resultatCTN;

    @SerializedName("resultatele")
    private int resultatELE;

    @SerializedName("resultatgol")
    private int resultatGOL;

    @SerializedName("resultatgpa")
    private int resultatGPA;

    @SerializedName("resultatlog")
    private int resultatLOG;

    @SerializedName("resultatmec")
    private int resultatMEC;

    @SerializedName("resultatgti")
    private int resultatGTI;

    @SerializedName("resultataer")
    private int resultatAER;

    public int getResultatCTN() {
        return resultatCTN;
    }

    public int getResultatELE() {
        return resultatELE;
    }

    public int getResultatGOL() {
        return resultatGOL;
    }

    public int getResultatGPA() {
        return resultatGPA;
    }

    public int getResultatLOG() {
        return resultatLOG;
    }

    public int getResultatMEC() {
        return resultatMEC;
    }

    public int getResultatGTI() {
        return resultatGTI;
    }

    public int getResultatAER() {
        return resultatAER;
    }
}
