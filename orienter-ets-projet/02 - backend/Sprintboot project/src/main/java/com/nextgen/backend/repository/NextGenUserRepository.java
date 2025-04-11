package com.nextgen.backend.repository;

import com.nextgen.backend.tables.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenUserRepository extends JpaRepository<User, Long> {
    long findUserIdByEmail(String email);
    boolean existsByEmail(String email);
    User getUserByEmail(String email);
    boolean deleteByEmail(String email);
    User getUserByToken(String token);
}
