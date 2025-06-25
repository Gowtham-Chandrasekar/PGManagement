package com.pg.backend.repository;

import com.pg.backend.model.PGDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PGRepository extends JpaRepository<PGDetails, Long> {
    List<PGDetails> findByLocationContainingIgnoreCase(String location);
    List<PGDetails> findByNameContainingIgnoreCase(String name);
}

