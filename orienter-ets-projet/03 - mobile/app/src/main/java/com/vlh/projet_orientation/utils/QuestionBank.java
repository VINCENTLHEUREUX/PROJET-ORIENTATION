package com.vlh.projet_orientation.utils;

import com.vlh.projet_orientation.model.Question;

import java.util.ArrayList;
import java.util.List;

public class QuestionBank {

    public static List<Question> getQuestions() {
        List<Question> questions = new ArrayList<>();

        // CTN - Génie de la construction
        questions.add(new Question(1L, "J'aime les chantiers et voir concrètement ce que je bâtis.", "CTN", 0));
        questions.add(new Question(2L, "J'aime les structures, les ponts, les bâtiments.", "CTN", 0));
        questions.add(new Question(3L, "Je m'intéresse aux matériaux comme le béton, l'acier ou le bois.", "CTN", 0));
        questions.add(new Question(4L, "Je veux contribuer à rendre les infrastructures durables et sécuritaires.", "CTN", 0));
        questions.add(new Question(5L, "Je suis à l'aise avec les normes, les plans et les devis techniques.", "CTN", 0));

        // ELE - Génie électrique
        questions.add(new Question(6L, "J'aime comprendre comment fonctionnent les circuits électriques.", "ELE", 0));
        questions.add(new Question(7L, "L'électronique et les systèmes embarqués m'attirent.", "ELE", 0));
        questions.add(new Question(8L, "J'aimerais travailler dans les énergies renouvelables ou les télécommunications.", "ELE", 0));
        questions.add(new Question(9L, "J'aime les mathématiques appliquées aux signaux ou aux champs électromagnétiques.", "ELE", 0));
        questions.add(new Question(10L, "Je suis curieux de savoir comment fonctionnent les capteurs, les moteurs et les réseaux électriques.", "ELE", 0));

        // LOG - Génie logiciel
        questions.add(new Question(11L, "J'aime coder et créer des logiciels utiles.", "LOG", 0));
        questions.add(new Question(12L, "Je m'intéresse au développement d'applications Web, mobiles ou de jeux.", "LOG", 0));
        questions.add(new Question(13L, "Je suis rigoureux et j'aime résoudre des bugs.", "LOG", 0));
        questions.add(new Question(14L, "J'aimerais travailler dans le domaine de la cybersécurité ou de l'intelligence artificielle.", "LOG", 0));
        questions.add(new Question(15L, "J'aime travailler en équipe sur des projets de programmation.", "LOG", 0));

        // MEC - Génie mécanique
        questions.add(new Question(16L, "Je suis fasciné par les machines, les moteurs et les systèmes mécaniques.", "MEC", 0));
        questions.add(new Question(17L, "J'aime dessiner, concevoir ou modéliser des objets.", "MEC", 0));
        questions.add(new Question(18L, "Je veux comprendre comment les choses bougent, roulent ou volent.", "MEC", 0));
        questions.add(new Question(19L, "J'aime les matières comme la dynamique, la thermodynamique et la résistance des matériaux.", "MEC", 0));
        questions.add(new Question(20L, "J'aimerais participer à la fabrication de prototypes ou de robots.", "MEC", 0));

        // GPA - Génie de la production automatisée
        questions.add(new Question(21L, "Je suis attiré par l'automatisation et les robots industriels.", "GPA", 0));
        questions.add(new Question(22L, "J'aime optimiser les processus pour les rendre plus efficaces.", "GPA", 0));
        questions.add(new Question(23L, "Je veux apprendre à programmer des systèmes automatisés.", "GPA", 0));
        questions.add(new Question(24L, "J'aime l'électronique, la mécanique et l'informatique combinées.", "GPA", 0));
        questions.add(new Question(25L, "Je veux travailler dans l'industrie manufacturière ou la haute technologie.", "GPA", 0));

        // GTI - Technologies de l'information
        questions.add(new Question(26L, "J'aime l'informatique, mais avec une approche plus orientée systèmes.", "GTI", 0));
        questions.add(new Question(27L, "Je m'intéresse aux réseaux, bases de données et à la cybersécurité.", "GTI", 0));
        questions.add(new Question(28L, "J'aime comprendre comment les systèmes communiquent entre eux.", "GTI", 0));
        questions.add(new Question(29L, "Je veux travailler en TI, mais pas nécessairement comme programmeur pur.", "GTI", 0));
        questions.add(new Question(30L, "Je veux pouvoir toucher à plein de domaines en entreprise : infra, web, support, etc.", "GTI", 0));

        // LOGI - Logistique
        questions.add(new Question(31L, "J'aime planifier, organiser et optimiser les ressources.", "LOGI", 0));
        questions.add(new Question(32L, "Je suis intéressé par les chaînes d'approvisionnement et la gestion des stocks.", "LOGI", 0));
        questions.add(new Question(33L, "J'aime les systèmes complexes et le défi de les améliorer.", "LOGI", 0));
        questions.add(new Question(34L, "Je veux apprendre à utiliser des logiciels de gestion et de planification.", "LOGI", 0));
        questions.add(new Question(35L, "J'ai un bon sens de l'organisation et de l'analyse.", "LOGI", 0));

        // AER - Génie aérospatial
        questions.add(new Question(36L, "L'aéronautique me passionne : avions, drones, satellites.", "AER", 0));
        questions.add(new Question(37L, "J'aime les sciences appliquées au vol, comme l'aérodynamique.", "AER", 0));
        questions.add(new Question(38L, "Je suis rigoureux et méticuleux dans les détails techniques.", "AER", 0));
        questions.add(new Question(39L, "J'aimerais travailler pour des entreprises comme Airbus, Bombardier ou l'Agence spatiale.", "AER", 0));
        questions.add(new Question(40L, "Je veux contribuer à l'innovation dans l'espace ou l'aviation.", "AER", 0));

        return questions;
    }
}
