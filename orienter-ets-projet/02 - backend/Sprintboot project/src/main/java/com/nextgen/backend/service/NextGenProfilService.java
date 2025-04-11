package com.nextgen.backend.service;

import com.nextgen.backend.tables.Profil;
import com.nextgen.backend.tables.requests.ProfilRequest;
import com.nextgen.backend.tables.User;

public interface NextGenProfilService {
    public User getUserFromRequest(ProfilRequest requete);
    public Profil getProfilFromRequest(ProfilRequest requete);
    public boolean saveProfil(Profil profil);
    public Profil getProfilByToken(String token);
    public boolean existsByToken(String token);
}
