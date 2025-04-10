package com.nextgen.backend.service;

import com.nextgen.backend.model.Profil;
import com.nextgen.backend.model.ProfilRequest;
import com.nextgen.backend.model.User;

import java.util.List;

public interface NextGenProfilService {
    public User getUserFromRequest(ProfilRequest requete);
    public Profil getProfilFromRequest(ProfilRequest requete);
    public boolean createProfil(Profil profil);
    public Profil getProfilByEmail(String email);
    public boolean existsByEmail(String email);
}
