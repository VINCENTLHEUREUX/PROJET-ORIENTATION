package com.nextgen.backend.service.impl;

import com.nextgen.backend.model.User;
import com.nextgen.backend.repository.NextGenRepository;
import com.nextgen.backend.service.NextGenService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NextGenServiceImpl implements NextGenService {

    NextGenRepository nextGenRepository;

    public NextGenServiceImpl(NextGenRepository nextGenRepository){
        this.nextGenRepository = nextGenRepository;
    }

    @Override
    public String createUser(User user) {
        //Insérer la logique supplémentaire ici

        nextGenRepository.save(user);
        return "User saved with success";
    }

    @Override
    public String updateUser(User user) {
        //Insérer la logique supplémentaire ici

        nextGenRepository.save(user);
        return "User updated with success";
    }

    @Override
    public String deleteUser(String userId) {
        //Insérer la logique supplémentaire ici

        nextGenRepository.deleteById(userId);
        return "User deleted with success";
    }

    @Override
    public User getUser(String userId) {
        //Insérer la logique supplémentaire ici

        return nextGenRepository.findById(userId).get();
    }

    @Override
    public List<User> getAllUsers() {
        //Insérer la logique supplémentaire ici

        return nextGenRepository.findAll();
    }
}
