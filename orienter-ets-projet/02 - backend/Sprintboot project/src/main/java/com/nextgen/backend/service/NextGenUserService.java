package com.nextgen.backend.service;

import com.nextgen.backend.tables.User;

import java.util.List;

public interface NextGenUserService {
    public boolean createUser(User user);
    public boolean updateUser(User user);
    public boolean deleteUser(User user);
    public boolean existsByEmail(String email);
    public User getUserByEmail(String email);
    public List<User> getAllUsers(String token);
    public boolean isValidEmail(String email);
    public boolean strongPassword(String password);
    public boolean loginUserEmail(User user);
    public boolean loginUserToken(User user);
    public User getUserByToken(String token);
    public boolean isAdmin(String token);
    }
