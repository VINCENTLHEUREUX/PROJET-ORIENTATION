package com.nextgen.backend.repository;

import com.nextgen.backend.model.ProgramInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenProgramsRepository extends JpaRepository<ProgramInfo, Long> {
    ProgramInfo findBySigle(String sigle);
    ProgramInfo findByNom(String nom);
    ProgramInfo findByProgramId(Long id);
}
