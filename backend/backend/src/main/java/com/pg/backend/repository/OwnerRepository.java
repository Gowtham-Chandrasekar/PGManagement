package com.pg.backend.repository;

import com.pg.backend.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

    Owner findByUserIdAndPassword(String userId, String password);
}
