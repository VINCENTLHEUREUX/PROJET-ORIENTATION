package com.nextgen.backend.service.impl;

import com.nextgen.backend.tables.Profil;
import com.nextgen.backend.tables.User;
import com.nextgen.backend.repository.NextGenUserRepository;
import com.nextgen.backend.service.NextGenProfilService;
import com.nextgen.backend.service.NextGenUserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class NextGenUserServiceImpl implements NextGenUserService {

    NextGenUserRepository nextGenUserRepository;
    NextGenProfilService nextGenProfilService;

    public NextGenUserServiceImpl(NextGenUserRepository nextGenUserRepository,
                                  NextGenProfilService nextGenProfilService){
        this.nextGenUserRepository = nextGenUserRepository;
        this.nextGenProfilService = nextGenProfilService;
    }

    @Override
    public boolean createUser(User user) {
        String token = UUID.randomUUID().toString();
        if (existsByEmail(user.getEmail())){
            return false;
        }
        if (!isValidEmail(user.getEmail())){
            return false;
        }
        if (!strongPassword(user.getPassword())){
            return false;
        }
        Profil profil = new Profil();
        profil.setEmail(user.getEmail());
        user.setDate(LocalDate.now());
        user.setRole("Utilisateur"); // Puisque cette méthode sert au utilisateurs
        user.setToken(token);
        if (nextGenProfilService.saveProfil(profil)){
            nextGenUserRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateUser(User user) {
        User userSave = nextGenUserRepository.getUserByEmail(user.getEmail());
        if (!isAdmin(user.getToken())){ // Seulement les admins peuvent udpate
            return false;
        }
        user.setToken(userSave.getToken()); // Important ici de garder le token
        if (user.getPassword() == null){
            user.setPassword(userSave.getPassword());
        }
        else{

        }
        if (existsByEmail(user.getEmail())){
            user.setUserId(userSave.getUserId());
            nextGenUserRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean deleteUser(User user) {
        if (!isAdmin(user.getToken())){
            return false;
        }
        if (user == null || user.getEmail() == null) {
            return false;
        }
        User oldUser = getUserByEmail(user.getEmail());

        if (oldUser == null) {
            return false;
        }
            nextGenUserRepository.delete(oldUser);
            return true;
        }

    @Override
    public User getUserById(long userId) {
        //Insérer la logique supplémentaire ici

        return nextGenUserRepository.findById(userId).get();
    }
    @Override
    public User getUserByEmail(String email) {
        //Insérer la logique supplémentaire ici

        return nextGenUserRepository.getUserByEmail(email);
    }

    @Override
    public boolean existsByEmail(String email) {
        return nextGenUserRepository.existsByEmail(email);
    }



    public boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }

        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    public boolean strongPassword(String password){
        int numberCount = 0;
        for (char c : password.toCharArray()){
            if (Character.isDigit(c)){
                numberCount = numberCount + 1;
            }
        }
        if (password.length() >= 12 && numberCount >= 2){
            return true;
        }
        return false;
    }

    public boolean loginUserEmail(User user) {
        if (user == null ||  user.getEmail() == null || user.getPassword() == null) {
            return false;
        }
        if (!isValidEmail(user.getEmail())){
            return false;
        }
        User userSave = nextGenUserRepository.getUserByEmail(user.getEmail());
        if (existsByEmail(user.getEmail()) && user.getPassword().equals(userSave.getPassword())){
            generateToken(userSave.getEmail());
            return true;
        }
        return false;
    }
    public boolean loginUserToken(User user) {
        if (user == null ||  user.getToken() == null) {
            return false;
        }
        User userSave = nextGenUserRepository.getUserByToken(user.getToken());
        if (userSave != null && !userSave.getEmail().isEmpty()){
            return true;
        }
        return false;
    }

    public boolean generateToken(String email) {
        User user = nextGenUserRepository.getUserByEmail(email);
        String token = UUID.randomUUID().toString();
        user.setToken(token);
        nextGenUserRepository.save(user);
        return true;
    }

    public User getUserByToken(String token) {
        return nextGenUserRepository.getUserByToken(token);
    }

    public boolean isAdmin(String token){
        if (nextGenUserRepository.existsByToken(token)){
            User user = nextGenUserRepository.getUserByToken(token);
            return user.getRole().equals("Administrateur");
        }
        return false;
    }

    public List<User> getAllUsers(String token) {
        if (isAdmin(token)){
            return nextGenUserRepository.findAll();
        }
        return Collections.emptyList();
    }
}
