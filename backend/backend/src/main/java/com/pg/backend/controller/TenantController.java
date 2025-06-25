package com.pg.backend.controller;

import com.pg.backend.model.Feedback;
import com.pg.backend.model.PGDetails;
import com.pg.backend.model.Tenant;
import com.pg.backend.repository.FeedbackRepository;
import com.pg.backend.repository.PGRepository;
import com.pg.backend.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tenant")
@CrossOrigin
public class TenantController {

    @Autowired
    private TenantRepository tenantRepo;
    @Autowired private PGRepository pgRepo;
    @Autowired private FeedbackRepository feedbackRepo;

    // TENANT LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> tenantLogin(@RequestParam String name, @RequestParam Long id, @RequestParam String password) {
        Tenant tenant = tenantRepo.findById(id)
                .filter(t -> t.getName().equals(name) && t.getPassword().equals(password))
                .orElse(null);

        if (tenant != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // VIEW PAYMENT STATUS
    @GetMapping("/payment-status/{tenantId}")
    public ResponseEntity<String> getPaymentStatus(@PathVariable Long tenantId) {
        Tenant tenant = tenantRepo.findById(tenantId).orElseThrow();
        return ResponseEntity.ok(tenant.getPaymentStatus());
    }

    // VIEW PG STATUS (fetch all PGs)
    @GetMapping("/view-pgs")
    public ResponseEntity<List<PGDetails>> viewPGs() {
        return ResponseEntity.ok(pgRepo.findAll());
    }

    // SUBMIT FEEDBACK
    @PostMapping("/submit-feedback")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
        feedbackRepo.save(feedback);
        return ResponseEntity.ok("Feedback submitted successfully");
    }
}

