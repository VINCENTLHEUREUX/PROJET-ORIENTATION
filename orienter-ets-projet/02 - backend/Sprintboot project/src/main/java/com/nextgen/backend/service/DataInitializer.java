package com.nextgen.backend.config;

import com.nextgen.backend.model.ProgramInfo;
import com.nextgen.backend.model.ResultatQuizz;
import com.nextgen.backend.model.User;
import com.nextgen.backend.repository.NextGenProgramsRepository;
import com.nextgen.backend.repository.NextGenResultatRepository;
import com.nextgen.backend.repository.NextGenUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(NextGenProgramsRepository nextGenProgramsRepository, NextGenUserRepository nextGenUserRepository, NextGenResultatRepository nextGenResultatRepository) {
        return args -> {
            if (nextGenProgramsRepository.count() == 0 && nextGenUserRepository.count() == 0 && nextGenResultatRepository.count() == 0) {
                ProgramInfo gol = new ProgramInfo();
                gol.setSigle("GOL");
                gol.setNom("Génie des opérations et de la logistique");
                gol.setDescription("Formation en gestion des opérations et logistique industrielle");
                gol.setUrl("https://www.etsmtl.ca/programmes-formations/baccalaureat-genie-operations-logistique");
                gol.setCredits(118+27);

                ProgramInfo ele = new ProgramInfo();
                ele.setSigle("ELE");
                ele.setNom("Génie électrique");
                ele.setDescription("Formation en systèmes électriques et électroniques");
                ele.setUrl("https://www.etsmtl.ca/programmes-formations/baccalaureat" +
                        "-genie-electrique");
                ele.setCredits(120+27);

                ProgramInfo mec = new ProgramInfo();
                mec.setSigle("MEC");
                mec.setNom("Génie mécanique");
                mec.setDescription("Formation en conception et fabrication mécanique");
                mec.setUrl("https://www.etsmtl.ca/programmes-formations/baccalaureat-genie-mecanique");
                mec.setCredits(115+27);

                ProgramInfo log = new ProgramInfo();
                log.setSigle("LOG");
                log.setNom("Génie logiciel");
                log.setDescription("Formation en développement et architecture logicielle");
                log.setUrl("https://www.etsmtl.ca/programmes-formations/baccalaureat-genie-logiciel");
                log.setCredits(116+27);

                ProgramInfo aer = new ProgramInfo();
                aer.setSigle("AER");
                aer.setNom("Baccalauréat en génie aérospatial");
                aer.setDescription("Le génie aérospatial : donner des ailes à l'innovation");
                aer.setUrl("https://www.etsmtl.ca/programmes-formations/baccalaureat-genie-aerospatial");
                aer.setCredits(120);

                ProgramInfo ctn = new ProgramInfo();
                ctn.setSigle("CTN");
                ctn.setNom("Génie de la construction");
                ctn.setDescription("Formation en génie civil et construction");
                ctn.setUrl("https://www.etsmtl.ca/programmes-formations/baccalaureat-genie-construction");
                ctn.setCredits(118+27);

                ProgramInfo gpa = new ProgramInfo();
                gpa.setSigle("GPA");
                gpa.setNom("Génie de la production automatisée");
                gpa.setDescription("Formation en automatisation et robotique industrielle");
                gpa.setUrl("https://www.etsmtl.ca/programmes-formations/baccalaureat-genie-production-automatisee");
                gpa.setCredits(119+27);

                ProgramInfo gti = new ProgramInfo();
                gti.setSigle("GTI");
                gti.setNom("Génie des technologies de l'information");
                gti.setDescription("Formation en technologies de l'information et réseaux");
                gti.setUrl("https://www.etsmtl.ca/programmes-formations/baccalaureat-genie-des-ti");
                gti.setCredits(116+27);

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

                ResultatQuizz resultat = new ResultatQuizz();
                resultat.setResultatAER(24);
                resultat.setResultatCTN(23);
                resultat.setResultatELE(20);
                resultat.setResultatGOL(19);
                resultat.setResultatGPA(16);
                resultat.setResultatGTI(13);
                resultat.setResultatLOG(12);
                resultat.setResultatMEC(3);
                resultat.setEmail("admin@projetorientation.com");

                nextGenResultatRepository.save(resultat);
            }
        };
    }
}