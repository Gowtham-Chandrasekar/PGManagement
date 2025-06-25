package com.pg.backend.controller;

import com.pg.backend.model.PGDetails;
import com.pg.backend.repository.PGRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/public")
@CrossOrigin
public class PGSearchController {

    @Autowired
    private PGRepository pgRepo;

    // Get all PGs
    @GetMapping("/pgs")
    public ResponseEntity<List<PGDetails>> getAllPGs() {
        return ResponseEntity.ok(pgRepo.findAll());
    }

    // Search by PG Name
    @GetMapping("/pgs/search/name")
    public ResponseEntity<List<PGDetails>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(pgRepo.findByNameContainingIgnoreCase(name));
    }

    // Search by Location
    @GetMapping("/pgs/search/location")
    public ResponseEntity<List<PGDetails>> searchByLocation(@RequestParam String location) {
        return ResponseEntity.ok(pgRepo.findByLocationContainingIgnoreCase(location));
    }

    // Search by Fees (less than or equal)
    @GetMapping("/pgs/search/fees")
    public ResponseEntity<List<PGDetails>> searchByFees(@RequestParam double maxFees) {
        List<PGDetails> result = pgRepo.findAll().stream()
                .filter(pg -> pg.getFees() <= maxFees)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }
}
