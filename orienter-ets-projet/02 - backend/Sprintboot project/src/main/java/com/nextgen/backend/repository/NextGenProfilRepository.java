package com.nextgen.backend.repository;

import com.nextgen.backend.tables.Profil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NextGenProfilRepository extends JpaRepository<Profil, Long> {
    Profil findProfilByEmail(String email);
    boolean existsByEmail(String email);
}
