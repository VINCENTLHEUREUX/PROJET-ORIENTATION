package com.nextgen.backend.service.impl;

import com.nextgen.backend.tables.Profil;
import com.nextgen.backend.tables.User;
import com.nextgen.backend.repository.NextGenUserRepository;
import com.nextgen.backend.service.NextGenProfilService;
import com.nextgen.backend.service.NextGenUserService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

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
        if (nextGenProfilService.saveProfil(profil)){
            nextGenUserRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateUser(User user) {
        User userSave = nextGenUserRepository.getUserByEmail(user.getEmail());
        if (existsByEmail(user.getEmail()) && user.getPassword().equals(userSave.getPassword())){


            user.setUserId(userSave.getUserId());
            nextGenUserRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public boolean deleteUser(User user) {
        if (user == null || user.getEmail() == null || user.getPassword() == null) {
            return false;
        }
        User oldUser = getUserByEmail(user.getEmail());

        if (oldUser == null || !user.getPassword().equals(oldUser.getPassword())) {
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
        //Insérer la logique supplémentaire ici

        return nextGenUserRepository.existsByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        //Insérer la logique supplémentaire ici

        return nextGenUserRepository.findAll();
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

    // Validate a token and return the associated email
    public User getUserByToken(String token) {
        return nextGenUserRepository.getUserByToken(token);
    }

    // Invalidate a token (for logout)
    public void invalidateToken(String token) {
    }
}
