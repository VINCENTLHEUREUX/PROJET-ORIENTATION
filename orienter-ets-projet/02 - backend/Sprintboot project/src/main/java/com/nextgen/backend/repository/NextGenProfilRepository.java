package com.nextgen.backend.repository;

import com.nextgen.backend.model.Profil;
import com.nextgen.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenProfilRepository extends JpaRepository<Profil, Long> {
    Profil findProfilByEmail(String email);

    boolean existsByEmail(String email);
    boolean deleteByEmail(String email);
}
