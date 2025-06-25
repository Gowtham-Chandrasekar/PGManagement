package com.pg.backend.controller;

import com.pg.backend.model.PGDetails;
import com.pg.backend.model.Tenant;
import com.pg.backend.repository.PGRepository;
import com.pg.backend.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private TenantRepository tenantRepo;
    @Autowired private PGRepository pgRepo;

    // ADD Tenant
    @PostMapping("/add-tenant")
    public ResponseEntity<?> addTenant(@RequestBody Tenant tenant) {
        tenantRepo.save(tenant);
        return ResponseEntity.ok("Tenant added");
    }

    // UPDATE Tenant
    @PutMapping("/update-tenant/{id}")
    public ResponseEntity<?> updateTenant(@PathVariable Long id, @RequestBody Tenant tenant) {
        Tenant existing = tenantRepo.findById(id).orElseThrow();
        existing.setName(tenant.getName());
        existing.setEmail(tenant.getEmail());
        existing.setPhone(tenant.getPhone());
        existing.setPassword(tenant.getPassword());
        tenantRepo.save(existing);
        return ResponseEntity.ok("Tenant updated");
    }

    // DELETE Tenant
    @DeleteMapping("/delete-tenant/{id}")
    public ResponseEntity<?> deleteTenant(@PathVariable Long id) {
        tenantRepo.deleteById(id);
        return ResponseEntity.ok("Tenant deleted");
    }

    // LIST All Tenants
    @GetMapping("/list-tenants")
    public ResponseEntity<?> getAllTenants() {
        return ResponseEntity.ok(tenantRepo.findAll());
    }

    // CHANGE PG STATUS
    @PutMapping("/update-pg-status/{pgId}")
    public ResponseEntity<?> updatePGStatus(@PathVariable Long pgId, @RequestParam String status) {
        PGDetails pg = pgRepo.findById(pgId).orElseThrow();
        pg.setStatus(status);
        pgRepo.save(pg);
        return ResponseEntity.ok("PG status updated");
    }

    // UPDATE PAYMENT STATUS for a tenant
    @PutMapping("/update-payment/{tenantId}")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Long tenantId, @RequestParam String status) {
        Tenant tenant = tenantRepo.findById(tenantId).orElseThrow();
        tenant.setPaymentStatus(status);
        tenantRepo.save(tenant);
        return ResponseEntity.ok("Payment status updated");
    }

    // Optional: View PG list
    @GetMapping("/list-pgs")
    public ResponseEntity<?> getAllPGs() {
        return ResponseEntity.ok(pgRepo.findAll());
    }
}
