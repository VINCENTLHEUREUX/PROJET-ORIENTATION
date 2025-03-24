package com.nextgen.backend.controller;

import com.nextgen.backend.model.User;
import com.nextgen.backend.service.NextGenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nextgen")
public class NextGenController {

    private final NextGenService nextGenService;

    @Autowired
    public NextGenController(NextGenService nextGenService) {
        this.nextGenService = nextGenService;
    }

    // Read Specific User
    @GetMapping("/user/{userId}")
    public User getUserDetails(@PathVariable("userId") String userId) {
        return nextGenService.getUser(userId);
    }

    // Read all users
    @GetMapping("/users")
    public List<User> getAllUserDetails() {
        return nextGenService.getAllUsers();
    }

    @PostMapping("/user")
    public String createUser(@RequestBody User user) {
        nextGenService.createUser(user);
        return "User created with success";
    }

    @PutMapping("/user")
    public String updateUser(@RequestBody User user) {
        nextGenService.updateUser(user);
        return "User updated with success";
    }

    @DeleteMapping("/user/{userId}")
    public String deleteUser(@PathVariable("userId") String userId) {
        nextGenService.deleteUser(userId);
        return "User deleted with success";
    }
}