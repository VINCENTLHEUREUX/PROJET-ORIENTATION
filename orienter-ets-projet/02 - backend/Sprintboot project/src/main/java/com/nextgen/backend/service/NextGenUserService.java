package com.nextgen.backend.service;

import com.nextgen.backend.model.User;

import java.util.List;

public interface NextGenUserService {
    public boolean createUser(User user);
    public boolean updateUser(User user);
    public boolean deleteUser(User user);
    public User getUserById(long userId);
    public boolean existsByEmail(String email);
    public User getUserByEmail(String email);
    public List<User> getAllUsers();
    public boolean isValidEmail(String email);
    public boolean strongPassword(String password);
}
