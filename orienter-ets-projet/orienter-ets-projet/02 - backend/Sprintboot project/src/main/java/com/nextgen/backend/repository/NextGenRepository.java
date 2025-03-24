package com.nextgen.backend.repository;

import com.nextgen.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenRepository extends JpaRepository<User, String> {

}
