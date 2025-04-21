package com.nextgen.backend.repository;

import com.nextgen.backend.tables.ProgramInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenProgramsRepository extends JpaRepository<ProgramInfo, Long> {
    ProgramInfo findBySigle(String sigle);
}
