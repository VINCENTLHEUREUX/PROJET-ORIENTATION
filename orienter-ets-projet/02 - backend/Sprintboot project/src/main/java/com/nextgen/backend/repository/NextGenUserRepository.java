package com.nextgen.backend.repository;

import com.nextgen.backend.tables.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenUserRepository extends JpaRepository<User, Long> { boolean existsByEmail(String email);
    User getUserByEmail(String email);
    User getUserByToken(String token);
    boolean existsByToken(String token);
}
