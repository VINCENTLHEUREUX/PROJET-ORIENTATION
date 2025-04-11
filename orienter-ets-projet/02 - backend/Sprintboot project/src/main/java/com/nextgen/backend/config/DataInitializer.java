package com.nextgen.backend.config;

import com.nextgen.backend.repository.*;
import com.nextgen.backend.tables.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(NextGenProgramsRepository nextGenProgramsRepository,
                                      NextGenUserRepository nextGenUserRepository,
                                      NextGenResultatRepository nextGenResultatRepository,
                                      NextGenProfilRepository nextGenProfilRepository,
                                      NextGenQuestionRepository nextGenQuestionRepository) {
        return args -> {
            if (nextGenProgramsRepository.count() == 0
                    && nextGenUserRepository.count() == 0
                    && nextGenResultatRepository.count() == 0
                    && nextGenResultatRepository.count() == 0
                    && nextGenQuestionRepository.count() == 0) {
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
                user.setRole("Administrateur");
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

                Profil profil = new Profil();
                profil.setEmail("admin@projetorientation.com");
                profil.setPictureUrl("https://shorturl.at/zTuPa");
                profil.setEtudes("Sciences nat");
                profil.setBiographie("Just a chill administrateur");

                nextGenProfilRepository.save(profil);

                nextGenQuestionRepository.save(new Question("CTN", "J'aime les " +
                        "chantiers et voir concrètement ce que je bâtis."));
                nextGenQuestionRepository.save(new Question("CTN", "J'aime les structures, les ponts, les bâtiments."));
                nextGenQuestionRepository.save(new Question("CTN", "Je m'intéresse aux matériaux comme le béton, l'acier ou le bois."));
                nextGenQuestionRepository.save(new Question("CTN", "Je veux contribuer à rendre les infrastructures durables et sécuritaires."));
                nextGenQuestionRepository.save(new Question("CTN", "Je suis à l'aise avec les normes, les plans et les devis techniques."));

                nextGenQuestionRepository.save(new Question("ELE", "J'aime comprendre " +
                        "comment fonctionnent les circuits électriques."));
                nextGenQuestionRepository.save(new Question("ELE", "L'électronique et les systèmes embarqués m'attirent."));
                nextGenQuestionRepository.save(new Question("ELE", "J'aimerais travailler dans les énergies renouvelables ou les télécommunications."));
                nextGenQuestionRepository.save(new Question("ELE", "J'aime les mathématiques appliquées aux signaux ou aux champs électromagnétiques."));
                nextGenQuestionRepository.save(new Question("ELE", "Je suis curieux de savoir comment fonctionnent les capteurs, les moteurs et les réseaux électriques."));

                nextGenQuestionRepository.save(new Question("LOG", "J'aime coder et " +
                        "créer des logiciels utiles."));
                nextGenQuestionRepository.save(new Question("LOG", "Je m'intéresse au développement d'applications Web, mobiles ou de jeux."));
                nextGenQuestionRepository.save(new Question("LOG", "Je suis rigoureux et j'aime résoudre des bugs."));
                nextGenQuestionRepository.save(new Question("LOG", "J'aimerais travailler dans le domaine de la cybersécurité ou de l'intelligence artificielle."));
                nextGenQuestionRepository.save(new Question("LOG", "J'aime travailler en équipe sur des projets de programmation."));

                nextGenQuestionRepository.save(new Question("MEC", "Je suis fasciné par" +
                        " les machines, les moteurs et les systèmes mécaniques."));
                nextGenQuestionRepository.save(new Question("MEC", "J'aime dessiner, " +
                        "concevoir ou modéliser des objets."));
                nextGenQuestionRepository.save(new Question("MEC", "Je veux comprendre" +
                        " comment les choses bougent, roulent ou volent."));
                nextGenQuestionRepository.save(new Question("MEC", "J'aime les " +
                        "matières comme la dynamique, la thermodynamique et la résistance des matériaux."));
                nextGenQuestionRepository.save(new Question("MEC", "J'aimerais " +
                        "participer à la fabrication de prototypes ou de robots."));

                nextGenQuestionRepository.save(new Question("GPA", "Je suis attiré par " +
                        "l'automatisation et les robots industriels."));
                nextGenQuestionRepository.save(new Question("GPA", "J'aime optimiser " +
                        "les processus pour les rendre plus efficaces."));
                nextGenQuestionRepository.save(new Question("GPA", "Je veux apprendre " +
                        "à programmer des systèmes automatisés."));
                nextGenQuestionRepository.save(new Question("GPA", "J'aime " +
                        "l'électronique, la mécanique et l'informatique combinées."));
                nextGenQuestionRepository.save(new Question("GPA", "Je veux travailler" +
                        " dans l'industrie manufacturière ou la haute technologie."));

                nextGenQuestionRepository.save(new Question("GTI", "J'aime " +
                        "l'informatique, mais avec une approche plus orientée systèmes."));
                nextGenQuestionRepository.save(new Question("GTI", "Je m'intéresse aux" +
                        " réseaux, bases de données et à la cybersécurité."));
                nextGenQuestionRepository.save(new Question("GTI", "J'aime comprendre " +
                        "comment les systèmes communiquent entre eux."));
                nextGenQuestionRepository.save(new Question("GTI", "Je veux " +
                        "travailler en TI, mais pas nécessairement comme programmeur pur."));
                nextGenQuestionRepository.save(new Question("GTI", "Je veux pouvoir " +
                        "toucher à plein de domaines en entreprise : infra, web, support, etc."));

                nextGenQuestionRepository.save(new Question("GOL", "J'aime planifier, " +
                        "organiser et optimiser les ressources."));
                nextGenQuestionRepository.save(new Question("GOL", "Je suis intéressé " +
                        "par les chaînes d'approvisionnement et la gestion des stocks."));
                nextGenQuestionRepository.save(new Question("GOL", "J'aime les " +
                        "systèmes complexes et le défi de les améliorer."));
                nextGenQuestionRepository.save(new Question("GOL", "Je veux apprendre " +
                        "à utiliser des logiciels de gestion et de planification."));
                nextGenQuestionRepository.save(new Question("GOL", "J'ai un bon sens " +
                        "de l'organisation et de l'analyse."));

                nextGenQuestionRepository.save(new Question("AER", "L'aéronautique" +
                        " me passionne : avions, drones, satellites."));
                nextGenQuestionRepository.save(new Question("AER", "J'aime les " +
                        "sciences appliquées au vol, comme l'aérodynamique."));
                nextGenQuestionRepository.save(new Question("AER", "Je suis " +
                        "rigoureux et méticuleux dans les détails techniques."));
                nextGenQuestionRepository.save(new Question("AER", "J'aimerais " +
                        "travailler pour des entreprises comme Airbus, Bombardier ou l'Agence spatiale."));
                nextGenQuestionRepository.save(new Question("AER", "Je veux " +
                        "contribuer à l'innovation dans l'espace ou l'aviation."));


            }
        };
    }
}