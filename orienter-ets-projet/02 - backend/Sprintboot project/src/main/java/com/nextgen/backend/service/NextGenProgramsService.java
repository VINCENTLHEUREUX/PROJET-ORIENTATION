package com.nextgen.backend.service;

import com.nextgen.backend.model.ProgramInfo;

public interface NextGenProgramsService {
    public ProgramInfo findBySigle(String sigle);
    public boolean existsBySigle(String sigle);
    public boolean createProgram(ProgramInfo program);
    public boolean updateProgram(ProgramInfo program);
    public boolean deleteProgram(ProgramInfo program);

}
