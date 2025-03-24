package com.nextgen.backend.service;

import com.nextgen.backend.model.User;

import java.util.List;

public interface NextGenService {
    public String createUser(User user);
    public String updateUser(User user);
    public String deleteUser(String userId);
    public User getUser(String userId);
    public List<User> getAllUsers();
}
