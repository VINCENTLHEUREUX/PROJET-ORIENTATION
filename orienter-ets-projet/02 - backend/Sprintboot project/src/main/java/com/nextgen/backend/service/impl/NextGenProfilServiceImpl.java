package com.nextgen.backend.service.impl;

import com.nextgen.backend.model.Profil;
import com.nextgen.backend.model.ProfilRequest;
import com.nextgen.backend.model.User;
import com.nextgen.backend.repository.NextGenProfilRepository;
import com.nextgen.backend.repository.NextGenProgramsRepository;
import com.nextgen.backend.service.NextGenProfilService;
import org.springframework.stereotype.Service;

@Service
public class NextGenProfilServiceImpl implements NextGenProfilService {
    NextGenProfilRepository nextGenProfilRepository;
    public NextGenProfilServiceImpl(NextGenProfilRepository nextGenProfilRepository){
        this.nextGenProfilRepository = nextGenProfilRepository;
    }
    public User getUserFromRequest(ProfilRequest requete){
        User user = new User();
        user.setEmail(requete.getEmail());
        user.setPassword(requete.getPassword());
        return user;
    }
    public Profil getProfilFromRequest(ProfilRequest requete){
        Profil profil = new Profil();
        profil.setBiographie(requete.getBiographie());
        profil.setEtudes(requete.getEtudes());
        profil.setEmail(requete.getEmail());
        profil.setPictureUrl(requete.getPictureUrl());
        return profil;
    }

    @Override
    public boolean createProfil(Profil profil) {
        nextGenProfilRepository.save(profil);
        return true;
    }
    public Profil getProfilByEmail(String email){
        return nextGenProfilRepository.findProfilByEmail(email);
    }
    public boolean existsByEmail(String email){
        return nextGenProfilRepository.existsByEmail(email);
    }
}
