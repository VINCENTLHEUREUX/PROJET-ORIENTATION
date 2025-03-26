package com.nextgen.backend.controller;

import com.nextgen.backend.model.User;
import com.nextgen.backend.repository.NextGenUserRepository;
import com.nextgen.backend.service.NextGenUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/nextgen")
public class NextGenUserController {

    private final NextGenUserService nextGenUserService;
    private final NextGenUserRepository nextGenUserRepository;

    @Autowired
    public NextGenUserController(NextGenUserService nextGenUserService, NextGenUserRepository nextGenUserRepository) {
        this.nextGenUserService = nextGenUserService;
        this.nextGenUserRepository = nextGenUserRepository;
    }

    // Read Specific User
    @GetMapping("/user/{userId}")
    public User getUserDetails(@PathVariable("userId") long userId) {
        return nextGenUserService.getUserById(userId);
    }

    // Read all users
    @GetMapping("/users")
    public List<User> getAllUserDetails() {
        return nextGenUserService.getAllUsers();
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
}