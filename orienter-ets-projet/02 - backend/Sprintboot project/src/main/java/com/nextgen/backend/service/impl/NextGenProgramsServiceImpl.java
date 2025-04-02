package com.nextgen.backend.service.impl;

import com.nextgen.backend.model.ProgramInfo;
import com.nextgen.backend.repository.NextGenProgramsRepository;
import com.nextgen.backend.service.NextGenProgramsService;
import org.springframework.stereotype.Service;

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
        program.setProgramId(programmeCopie.getProgramId());
        nextGenProgramsRepository.save(program);
        return true;
    }
    public boolean deleteProgram(ProgramInfo program){
        ProgramInfo programmeCopie;
        if (!existsBySigle(program.getSigle())){
            return false;
        }
        if (program.getSigle() == null || program.getSigle().isEmpty()) {
            return false;
        }
        programmeCopie = findBySigle(program.getSigle());
        program.setProgramId(programmeCopie.getProgramId());
        nextGenProgramsRepository.delete(program);
        return true;
    }
}
