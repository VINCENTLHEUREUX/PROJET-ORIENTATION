package com.nextgen.backend.controller;

import com.nextgen.backend.model.ResultatQuizz;
import com.nextgen.backend.model.ResultatRequest;
import com.nextgen.backend.model.User;
import com.nextgen.backend.repository.NextGenResultatRepository;
import com.nextgen.backend.repository.NextGenUserRepository;
import com.nextgen.backend.service.NextGenResultatService;
import com.nextgen.backend.service.NextGenUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/nextgen")
public class NextGenController {

    private final NextGenUserService nextGenUserService;
    private final NextGenResultatService nextGenResultatService;


    @Autowired
    public NextGenController(NextGenUserService nextGenUserService,
                             NextGenResultatService nextGenResultatService) {
        this.nextGenUserService = nextGenUserService;
        this.nextGenResultatService = nextGenResultatService;
    }

    @PostMapping("/results")
    public ResponseEntity<?> getResult(@RequestBody ResultatRequest resultatRequest) {

        Map<String, Object> response = new HashMap<>();
        User user = nextGenResultatService.getUserFromRequest(resultatRequest);
        if (nextGenUserService.loginUser(user)){
            ResultatQuizz resultat =
                    nextGenResultatService.findTopByEmailOrderByTimeDesc(resultatRequest.getEmail());
            if(resultat == null){
                response.put("message", "Error: Result not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            response.put("message", "Success");
            response.put("resultatciv", resultat.getResultatCIV());
            response.put("resultatele", resultat.getResultatELE());
            response.put("resultatglo", resultat.getResultatGLO());
            response.put("resultatind", resultat.getResultatIND());
            response.put("resultatlog", resultat.getResultatLOG());
            response.put("resultatmec", resultat.getResultatMEC());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message", "Error: login failed");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);        }

    @PostMapping("/result")
    public ResponseEntity<?> postResult(@RequestBody ResultatRequest resultatRequest) {

        Map<String, Object> response = new HashMap<>();
        User user = nextGenResultatService.getUserFromRequest(resultatRequest);
        if (nextGenUserService.loginUser(user)){
            response.put("message", "Success");
            ResultatQuizz quizz =
                    nextGenResultatService.getResultatFromRequest(resultatRequest);
            nextGenResultatService.createResult(quizz);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message", "Error: could not get user");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }


    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        Map<String, Object> response = new HashMap<>();
        if (!nextGenUserService.existsByEmail(user.getEmail())){
            response.put("message", "Error: account doesn't exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        if (nextGenUserService.loginUser(user)){
            response.put("message", "Login successful");
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
        if (!nextGenUserService.existsByEmail(user.getEmail())){
            response.put("message","Error : Account does not exist");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        if (nextGenUserService.updateUser(user)){
            response.put("message","Account updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        response.put("message", "Wrong email and password combination");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @DeleteMapping("/user")
    public ResponseEntity<?> deleteUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
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
/*
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
    @DeleteMapping("/program")
    public ResponseEntity<?> deleteProgram(@RequestBody ProgramInfo programme) {
        Map<String, Object> response = new HashMap<>();
        if (programme.getSigle() == null || programme.getSigle().isEmpty()){
            response.put("message", "Error: sigle cannot be empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        if (!nextGenProgramsService.existsBySigle(programme.getSigle())){
            response.put("message", "Error: program does not exist");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
        if (nextGenProgramsService.deleteProgram(programme)){
            response.put("message", "Success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
 */
}