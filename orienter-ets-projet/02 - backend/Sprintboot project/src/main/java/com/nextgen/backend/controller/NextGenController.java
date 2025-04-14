package com.nextgen.backend.controller;

import com.nextgen.backend.service.*;
import com.nextgen.backend.tables.*;
import com.nextgen.backend.tables.requests.ProfilRequest;
import com.nextgen.backend.tables.requests.ProgramRequest;
import com.nextgen.backend.tables.requests.ResultatRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Controller for NextGen application endpoints
 */
@RestController
@RequestMapping("/nextgen")
public class NextGenController {

    // Services
    private final NextGenUserService nextGenUserService;
    private final NextGenResultatService nextGenResultatService;
    private final NextGenProgramsService nextGenProgramsService;
    private final NextGenProfilService nextGenProfilService;
    private final NextGenQuestionService nextGenQuestionService;

    @Autowired
    public NextGenController(NextGenUserService nextGenUserService,
                             NextGenResultatService nextGenResultatService,
                             NextGenProgramsService nextGenProgramsService,
                             NextGenProfilService nextGenProfilService, NextGenQuestionService nextGenQuestionService) {
        this.nextGenUserService = nextGenUserService;
        this.nextGenResultatService = nextGenResultatService;
        this.nextGenProgramsService = nextGenProgramsService;
        this.nextGenProfilService = nextGenProfilService;
        this.nextGenQuestionService = nextGenQuestionService;
    }

    // =============================
    // Endpoints Utilisateurs
    // =============================

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        Map<String, Object> response = new HashMap<>();
        if (!nextGenUserService.existsByEmail(user.getEmail())){
            response.put("message", "Error: account doesn't exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        if (nextGenUserService.loginUserEmail(user)){
            User new_user = nextGenUserService.getUserByEmail(user.getEmail());
            response.put("message", "Login successful");
            response.put("prenom", new_user.getPrenom());
            response.put("nom", new_user.getNom());
            response.put("role", new_user.getRole());
            response.put("authToken", new_user.getToken());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message", "Error: internal server error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (nextGenUserService.existsByEmail(user.getEmail())){
            response.put("message", "Error: account already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        if (!nextGenUserService.isValidEmail(user.getEmail())){
            response.put("message", "Error: invalid email");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (!nextGenUserService.strongPassword(user.getPassword())){
            response.put("message", "Error: weak password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (nextGenUserService.createUser(user)){
            response.put("message", "User created with success");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @PutMapping("/user")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        if (!nextGenUserService.isAdmin(user.getToken())){
            response.put("message","Error : Token is not an admins");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        if (!nextGenUserService.existsByEmail(user.getEmail())){
            response.put("message","Error : Account does not exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        if (nextGenUserService.updateUser(user)){
            response.put("message","Account updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message", "Error: could not update user");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        if (!nextGenUserService.isAdmin(user.getToken())){
            response.put("message","Error : unauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        if (!nextGenUserService.existsByEmail(user.getEmail())){
            response.put("message","Error : Account does not exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        if (nextGenUserService.deleteUser(user)){
            response.put("message","Account deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message", "Wrong email and password combination");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    // =============================
    // Endpoints Resultats
    // =============================

    @PostMapping("/results")
    public ResponseEntity<?> getResult(@RequestBody ResultatRequest resultatRequest) {
        Map<String, Object> response = new HashMap<>();

        String email = nextGenUserService.getUserByToken(resultatRequest.getToken()).getEmail();
        ResultatQuizz resultat =
                nextGenResultatService.findTopByEmailOrderByTimeDesc(email);
        User user = nextGenResultatService.getUserFromRequest(resultatRequest);
        if (nextGenUserService.loginUserToken(user)){
            response.put("message", "Success");
            response.put("resultatctn", resultat.getResultatCTN());
            response.put("resultatele", resultat.getResultatELE());
            response.put("resultatgol", resultat.getResultatGOL());
            response.put("resultatgpa", resultat.getResultatGPA());
            response.put("resultatlog", resultat.getResultatLOG());
            response.put("resultatmec", resultat.getResultatMEC());
            response.put("resultataer", resultat.getResultatAER());
            response.put("resultatgti", resultat.getResultatGTI());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        if(resultat == null){
            response.put("message", "Error: Result not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        response.put("message", "Error: login failed");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @PostMapping("/result")
    public ResponseEntity<?> postResult(@RequestBody ResultatRequest resultatRequest) {
        Map<String, Object> response = new HashMap<>();
        User user = nextGenResultatService.getUserFromRequest(resultatRequest);
        if (nextGenUserService.loginUserToken(user)){
            response.put("message", "Success");
            ResultatQuizz quizz =
                    nextGenResultatService.getResultatFromRequest(resultatRequest);
            nextGenResultatService.createResult(quizz);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message", "Error: could not get user");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    // =============================
    // Endpoints Programmes
    // =============================

    @GetMapping("/program")
    public ResponseEntity<?> getProgram(@RequestParam String sigle) {
        Map<String, Object> response = new HashMap<>();
        ProgramInfo programme = nextGenProgramsService.findBySigle(sigle);
        if (programme != null){
            response.put("message", "OK");
            response.put("sigle", programme.getSigle());
            response.put("nom", programme.getNom());
            response.put("description", programme.getDescription());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @GetMapping("/programs")
    public ResponseEntity<?> getAllPrograms() {
        Map<String, Object> response = new HashMap<>();
        List<ProgramInfo> programs = nextGenProgramsService.findAllPrograms();

        if (programs != null && !programs.isEmpty()) {
            response.put("message", "OK");
            response.put("programs", programs);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } else {
            response.put("message", "Error: no programs found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/program")
    public ResponseEntity<?> setProgram(@RequestBody ProgramInfo programme){
        // Il faudra securiser ceci pour permettre l'acces administrateur seulement.
        Map<String, Object> response = new HashMap<>();
        if (programme.getNom() == null || programme.getNom().isEmpty() ||
                programme.getSigle() == null || programme.getSigle().isEmpty()){
            response.put("message", "Error: fields cannot be empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (nextGenProgramsService.existsBySigle(programme.getSigle())){
            response.put("message", "Error: program already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        if (nextGenProgramsService.createProgram(programme)){
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @PutMapping("/program")
    public ResponseEntity<?> updateProgram(@RequestBody ProgramInfo programme){
        // Il faudra securiser ceci pour permettre l'acces administrateur seulement.
        Map<String, Object> response = new HashMap<>();
        if (programme.getNom() == null || programme.getNom().isEmpty() ||
                programme.getSigle() == null || programme.getSigle().isEmpty()){
            response.put("message", "Error: fields cannot be empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (!nextGenProgramsService.existsBySigle(programme.getSigle())){
            response.put("message", "Error: program does not exist");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        if (nextGenProgramsService.updateProgram(programme)){
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    // =============================
    //  Endpoints Profil
    // =============================

    @PostMapping("/profil")
    public ResponseEntity<?> getProfil(@RequestBody ProfilRequest profil) {
        Map<String, Object> response = new HashMap<>();
        if (nextGenProfilService.existsByToken(profil.getToken())) {
            Profil copie_profil =
                    nextGenProfilService.getProfilByToken(profil.getToken());
            response.put("message","Success");
            response.put("email", copie_profil.getEmail());
            response.put("biographie", copie_profil.getBiographie());
            response.put("etudes", copie_profil.getEtudes());
            response.put("picture_url", copie_profil.getPictureUrl());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message","Error: could not find user");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @PutMapping("/profil")
    public ResponseEntity<?> updateProfil(@RequestBody ProfilRequest requete) {
        Map<String, Object> response = new HashMap<>();
        User user = nextGenProfilService.getUserFromRequest(requete);
        Profil profil = nextGenProfilService.getProfilFromRequest(requete);
        if (nextGenUserService.isAdmin(user.getToken())){
            profil.setEmail(requete.getEmail());
            if (nextGenProfilService.saveProfil(profil)){
                response.put("message","Success");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
        }
        else if (nextGenUserService.loginUserToken(user)){
            if (nextGenProfilService.saveProfil(profil)){
                response.put("message","Success");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }
            response.put("message","Error: could not save profile");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
        response.put("message","Error: could not find user");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // =============================
    //  Endpoints Question
    // =============================
    @GetMapping("/questions")
    public ResponseEntity<?> getQuestions() {
        Map<String, Object> response = new HashMap<>();
        List<Question> questions = nextGenQuestionService.findAllQuestions();
        response.put("message", "Success");
        response.put("questions", questions);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    // =============================
    //  Endpoints Admin
    // =============================

    @PostMapping("/users")
    public ResponseEntity<?> getAllUsers(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        Map<String, Object> response = new HashMap<>();

        if (!nextGenUserService.isAdmin(token)) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        List<User> users = nextGenUserService.getAllUsers(token);
        if (users != null) {
            response.put("message", "Success");
            response.put("users", users);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        response.put("message", "Error: Could not find users");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    @PostMapping("/profils")
    public ResponseEntity<?> getAllProfils(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        Map<String, Object> response = new HashMap<>();

        if (!nextGenUserService.isAdmin(token)) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        List<Profil> profils = nextGenProfilService.getAllProfils(token);
        if (profils != null) {
            response.put("message", "Success");
            response.put("profils", profils);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        response.put("message", "Error: Could not find users");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    @PostMapping("/allresults")
    public ResponseEntity<?> getAllResults(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        Map<String, Object> response = new HashMap<>();

        if (!nextGenUserService.isAdmin(token)) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        List<ResultatQuizz> results = nextGenResultatService.getAllResults(token);
        if (results != null) {
            response.put("message", "Success");
            response.put("results", results);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        response.put("message", "Error: Could not find users");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    @DeleteMapping("/question")
    public ResponseEntity<?> deleteQuestion(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        Long id = Long.valueOf(requestBody.get("id"));
        Map<String, Object> response = new HashMap<>();

        if (!nextGenUserService.isAdmin(token)) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (nextGenQuestionService.deleteById(id, token)) {
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        response.put("message", "Error: Could not delete question");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @PutMapping("/question")
    public ResponseEntity<?> updateQuestion(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        String question = requestBody.get("question");
        String sigle = requestBody.get("sigle");
        Long id = Long.valueOf(requestBody.get("id"));
        Map<String, Object> response = new HashMap<>();

        if (!nextGenUserService.isAdmin(token)) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }


        if (nextGenQuestionService.updateById(id, question, sigle, token)) {
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        response.put("message", "Error: Could not update question");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @PostMapping("/question")
    public ResponseEntity<?> saveQuestion(@RequestBody Map<String, String> requestBody) {
        String token = requestBody.get("token");
        String question = requestBody.get("question");
        String sigle = requestBody.get("sigle");
        Map<String, Object> response = new HashMap<>();

        if (!nextGenUserService.isAdmin(token)) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (nextGenQuestionService.saveQuestion(question, sigle, token)) {
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }

        response.put("message", "Error: Could not create question");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @DeleteMapping("/program")
    public ResponseEntity<?> deleteProgram(@RequestBody ProgramRequest programme) {
        Map<String, Object> response = new HashMap<>();
        if (!nextGenUserService.isAdmin(programme.getToken())) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        if (!nextGenProgramsService.existsBySigle(programme.getSigle())){
            response.put("message", "Error: program does not exist");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        if (nextGenProgramsService.deleteProgram(nextGenProgramsService.getProgramFromRequest(programme))){
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @DeleteMapping("/result")
    public ResponseEntity<?> deleteResult(@RequestBody Map<String, String> requestBody) {
        Map<String, Object> response = new HashMap<>();
        String token = requestBody.get("token");
        Long id = Long.valueOf(requestBody.get("resultId"));
        if (!nextGenUserService.isAdmin(token)) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        if (nextGenResultatService.deleteByResultId(id)){
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    @PutMapping("/result")
    public ResponseEntity<?> updateResult(@RequestBody ResultatRequest request) {
        Map<String, Object> response = new HashMap<>();
        String token = request.getToken();
        Long id = request.getResultId();
        ResultatQuizz resultat = nextGenResultatService.getResultatFromRequest(request);
        if (!nextGenUserService.isAdmin(token)) {
            response.put("message", "Error: invalid token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        if (!nextGenResultatService.existsById(id)){
            response.put("message", "Error: Resultat does not exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        if (nextGenResultatService.updateById(resultat)){
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message", "Error: internal server error");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }


}