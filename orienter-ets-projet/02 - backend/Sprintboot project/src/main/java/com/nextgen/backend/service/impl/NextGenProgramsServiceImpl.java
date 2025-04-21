package com.nextgen.backend.service.impl;

import com.nextgen.backend.tables.ProgramInfo;
import com.nextgen.backend.repository.NextGenProgramsRepository;
import com.nextgen.backend.service.NextGenProgramsService;
import com.nextgen.backend.tables.requests.ProgramRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
// Gestion des opérations a la table Programs de la DB
@Service
public class NextGenProgramsServiceImpl implements NextGenProgramsService {

    NextGenProgramsRepository nextGenProgramsRepository;

    public NextGenProgramsServiceImpl(NextGenProgramsRepository nextGenProgramsRepository){
        this.nextGenProgramsRepository = nextGenProgramsRepository;
    }

    public ProgramInfo findBySigle(String sigle) {
        ProgramInfo programme = nextGenProgramsRepository.findBySigle(sigle);
        if (programme != null){
            return programme;
        }
        return null;
    }
    public boolean existsBySigle(String sigle){
        if (findBySigle(sigle) != null){
            return true;
        }
        return false;
    }
    // Crée un programme et s'assure de la validité. Retourne boolean pour sa validité.
    public boolean createProgram(ProgramInfo program){
        if (existsBySigle(program.getSigle())){
            return false;
        }
        if (program.getNom() == null || program.getNom().isEmpty() ||
                program.getSigle() == null || program.getSigle().isEmpty()) {
            return false;
        }
        nextGenProgramsRepository.save(program);
        return true;
    }
    // Update un programme et s'assure de la validité. Retourne boolean pour sa validité.
    public boolean updateProgram(ProgramInfo program){
        ProgramInfo programmeCopie;
        if (!existsBySigle(program.getSigle())){
            return false;
        }
        if (program.getNom() == null || program.getNom().isEmpty() ||
                program.getSigle() == null || program.getSigle().isEmpty()) {
            return false;
        }
        programmeCopie = findBySigle(program.getSigle());
        nextGenProgramsRepository.save(program);
        return true;
    }
    @Transactional
    public boolean deleteProgram(ProgramInfo program){
        ProgramInfo programmeCopie;
        if (!existsBySigle(program.getSigle())){
            return false;
        }
        if (program.getSigle() == null || program.getSigle().isEmpty()) {
            return false;
        }
        programmeCopie = findBySigle(program.getSigle());
        nextGenProgramsRepository.delete(program);
        return true;
    }
    public List<ProgramInfo> findAllPrograms(){
        return nextGenProgramsRepository.findAll();
    }

    @Override
    public ProgramInfo getProgramFromRequest(ProgramRequest request) {
        ProgramInfo programme = new ProgramInfo();
        programme.setCredits(request.getCredits());
        programme.setDescription(request.getDescription());
        programme.setSigle(request.getSigle());
        programme.setNom(request.getNom());
        programme.setUrl(request.getUrl());
        return programme;
    }
}
