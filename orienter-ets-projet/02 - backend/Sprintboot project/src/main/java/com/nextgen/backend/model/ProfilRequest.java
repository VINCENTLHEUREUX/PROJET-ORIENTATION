package com.nextgen.backend.model;

public class ProfilRequest {
    private String email;
    private String password;
    private String pictureUrl;
    private String biographie;
    private String etudes;

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
}
