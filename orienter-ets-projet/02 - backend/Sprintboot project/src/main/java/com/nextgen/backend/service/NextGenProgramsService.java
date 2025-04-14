package com.nextgen.backend.service;

import com.nextgen.backend.tables.ProgramInfo;
import com.nextgen.backend.tables.requests.ProgramRequest;

import java.util.List;

public interface NextGenProgramsService {
    public ProgramInfo findBySigle(String sigle);
    public boolean existsBySigle(String sigle);
    public boolean createProgram(ProgramInfo program);
    public boolean updateProgram(ProgramInfo program);
    public boolean deleteProgram(ProgramInfo program);
    public List<ProgramInfo> findAllPrograms();
    public ProgramInfo getProgramFromRequest(ProgramRequest request);

}
