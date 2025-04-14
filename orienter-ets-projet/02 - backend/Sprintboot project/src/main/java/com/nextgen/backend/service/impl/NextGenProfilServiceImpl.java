package com.nextgen.backend.service.impl;

import com.nextgen.backend.tables.Profil;
import com.nextgen.backend.tables.requests.ProfilRequest;
import com.nextgen.backend.tables.User;
import com.nextgen.backend.repository.NextGenProfilRepository;
import com.nextgen.backend.repository.NextGenUserRepository;
import com.nextgen.backend.service.NextGenProfilService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

// Gestion des opérations a la table Profil de la DB
@Service
public class NextGenProfilServiceImpl implements NextGenProfilService {

    private final NextGenProfilRepository nextGenProfilRepository;
    private final NextGenUserRepository nextGenUserRepository;

    public NextGenProfilServiceImpl(NextGenProfilRepository nextGenProfilRepository,
                                    NextGenUserRepository nextGenUserRepository) {
        this.nextGenProfilRepository = nextGenProfilRepository;
        this.nextGenUserRepository = nextGenUserRepository;
    }

    @Override
    public boolean saveProfil(Profil profil) {
        nextGenProfilRepository.save(profil);
        return true;
    }

    public boolean existsByToken(String token) {
        User user = nextGenUserRepository.getUserByToken(token);
        String email = user.getEmail();
        return nextGenProfilRepository.existsByEmail(email);
    }

    public Profil getProfilByToken(String token) {
        User user = nextGenUserRepository.getUserByToken(token);
        String email = user.getEmail();
        return nextGenProfilRepository.findProfilByEmail(email);
    } // Il pourrait être pertinent d'avoir une fonction getProfilByEmail, mais pour
    // l'instant c'est inutile.

    // Construit un objet User a partir de ProfileRequest
    public User getUserFromRequest(ProfilRequest requete) {
        User user = new User();
        user.setToken(requete.getToken());
        return user;
    }
    // Construit un objet Profil a partir de ProfileRequest
    public Profil getProfilFromRequest(ProfilRequest requete) {
        Profil profil = new Profil();
        profil.setBiographie(requete.getBiographie());
        profil.setEtudes(requete.getEtudes());
        profil.setEmail(nextGenUserRepository.getUserByToken(requete.getToken()).getEmail());
        profil.setPictureUrl(requete.getPictureUrl());
        return profil;
    }

    public boolean isAdmin(String token){
        if (nextGenUserRepository.existsByToken(token)){
            User user = nextGenUserRepository.getUserByToken(token);
            return user.getRole().equals("Administrateur");
        }
        return false;
    }

    public List<Profil> getAllProfils(String token) {
        if (isAdmin(token)){
            return nextGenProfilRepository.findAll();
        }
        return Collections.emptyList();
    }
    public Profil getProfilByEmail(String email){
        return nextGenProfilRepository.findProfilByEmail(email);
    }
}