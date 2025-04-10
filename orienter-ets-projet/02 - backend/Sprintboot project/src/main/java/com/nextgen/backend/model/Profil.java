package com.nextgen.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="profil")
public class Profil {
    @Id
    private String email;
    private String picture_url;
    private String biographie;
    private String etudes;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPictureUrl() {
        return picture_url;
    }

    public void setPictureUrl(String picture_url) {
        this.picture_url = picture_url;
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
