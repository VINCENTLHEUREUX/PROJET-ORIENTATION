package com.nextgen.backend.config;

import com.nextgen.backend.model.ProgramInfo;
import com.nextgen.backend.model.User;
import com.nextgen.backend.repository.NextGenProgramsRepository;
import com.nextgen.backend.repository.NextGenUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(NextGenProgramsRepository nextGenProgramsRepository, NextGenUserRepository nextGenUserRepository) {
        return args -> {
            if (nextGenProgramsRepository.count() == 0 && nextGenUserRepository.count() == 0) {
                ProgramInfo gol = new ProgramInfo();
                gol.setSigle("GOL");
                gol.setNom("Génie des opérations et de la logistique");
                gol.setDescription("Formation en gestion des opérations et logistique industrielle");

                ProgramInfo ele = new ProgramInfo();
                ele.setSigle("ELE");
                ele.setNom("Génie électrique");
                ele.setDescription("Formation en systèmes électriques et électroniques");

                ProgramInfo mec = new ProgramInfo();
                mec.setSigle("MEC");
                mec.setNom("Génie mécanique");
                mec.setDescription("Formation en conception et fabrication mécanique");

                ProgramInfo log = new ProgramInfo();
                log.setSigle("LOG");
                log.setNom("Génie logiciel");
                log.setDescription("Formation en développement et architecture logicielle");

                ProgramInfo aer = new ProgramInfo();
                aer.setSigle("AER");
                aer.setNom("Génie de la production automatisée");
                aer.setDescription("Formation en automatisation et systèmes industriels");

                ProgramInfo ctn = new ProgramInfo();
                ctn.setSigle("CTN");
                ctn.setNom("Génie de la construction");
                ctn.setDescription("Formation en génie civil et construction");

                ProgramInfo gpa = new ProgramInfo();
                gpa.setSigle("GPA");
                gpa.setNom("Génie de la production automatisée");
                gpa.setDescription("Formation en automatisation et robotique industrielle");

                ProgramInfo gti = new ProgramInfo();
                gti.setSigle("GTI");
                gti.setNom("Génie des technologies de l'information");
                gti.setDescription("Formation en technologies de l'information et réseaux");

                nextGenProgramsRepository.save(gol);
                nextGenProgramsRepository.save(ele);
                nextGenProgramsRepository.save(mec);
                nextGenProgramsRepository.save(log);
                nextGenProgramsRepository.save(aer);
                nextGenProgramsRepository.save(ctn);
                nextGenProgramsRepository.save(gpa);
                nextGenProgramsRepository.save(gti);

                User user = new User();
                user.setEmail("admin@projetorientation.com");
                user.setPassword("MotDePasseSecurise123");
                user.setNom("Admin");
                user.setPrenom("Admin");

                nextGenUserRepository.save(user);

            }
        };
    }
}