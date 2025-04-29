package com.nextgen.backend.service;

import com.nextgen.backend.tables.Profil;
import com.nextgen.backend.requests.ProfilRequest;
import com.nextgen.backend.tables.User;

import java.util.List;

public interface NextGenProfilService {
    public User getUserFromRequest(ProfilRequest requete);
    public Profil getProfilFromRequest(ProfilRequest requete);
    public boolean saveProfil(Profil profil);
    public Profil getProfilByToken(String token);
    public boolean existsByToken(String token);
    List<Profil> getAllProfils(String token);
    public boolean isAdmin(String token);
    public Profil getProfilByEmail(String email);

}
