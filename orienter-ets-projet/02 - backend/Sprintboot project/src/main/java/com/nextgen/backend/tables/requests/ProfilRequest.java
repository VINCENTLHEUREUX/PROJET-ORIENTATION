package com.nextgen.backend.tables.requests;

public class ProfilRequest {
    private String token;
    private String pictureUrl;
    private String biographie;
    private String etudes;
    private String email;

    public String getToken() { return token; }

    public void setToken(String token) {  this.token = token; }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public String getBiographie() {
        return biographie;
    }

    public void setBiographie(String biographie) {
        this.biographie = biographie;
    }

    public String getEtudes() {
        return etudes;
    }

    public void setEtudes(String etudes) {
        this.etudes = etudes;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
