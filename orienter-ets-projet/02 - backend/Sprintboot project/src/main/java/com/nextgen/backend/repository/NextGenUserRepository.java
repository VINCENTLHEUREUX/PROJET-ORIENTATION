package com.nextgen.backend.repository;

import com.nextgen.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenUserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User getUserByEmail(String email);
    boolean deleteByEmail(String email);
}
