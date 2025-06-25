package com.pg.backend.controller;

import com.pg.backend.dto.LoginRequest;
import com.pg.backend.model.*;
import com.pg.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owner")
@CrossOrigin(origins = "http://localhost:3000")
public class OwnerController {
@Autowired
private OwnerRepository ownerRepository;

    @Autowired private AdminRepository adminRepo;
    @Autowired private PGRepository pgRepo;
    @Autowired private TenantRepository tenantRepo;
    @Autowired
    private FeedbackRepository feedbackRepo;
    // Owner Login API
    @PostMapping("/login")
    public ResponseEntity<String> loginOwner(@RequestBody LoginRequest loginData) {
        Owner owner = ownerRepository.findByUserIdAndPassword(
                loginData.getId(), loginData.getPassword()
        );

        if (owner != null) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }
    @PostMapping("/owner/add")  // <-- full path becomes /api/owner/add
    public ResponseEntity<String> addOwner(@RequestBody Owner owner) {
        ownerRepository.save(owner);
        return ResponseEntity.ok("Owner added successfully");
    }


    // ADMIN CRUD
    @PostMapping("/add-admin")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        adminRepo.save(admin);
        return ResponseEntity.ok("Admin added");
    }

    @PutMapping("/update-admin/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody Admin admin) {
        Admin existing = adminRepo.findById(id).orElseThrow();
        existing.setName(admin.getName());
        existing.setEmail(admin.getEmail());
        existing.setContact(admin.getContact());
        existing.setPassword(admin.getPassword());
        adminRepo.save(existing);
        return ResponseEntity.ok("Admin updated");
    }


    @DeleteMapping("/delete-admin/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        adminRepo.deleteById(id);
        return ResponseEntity.ok("Admin deleted");
    }

    @GetMapping("/list-admins")
    public List<Admin> listAdmins() {
        return adminRepo.findAll();
    }

    // PG CRUD
    @PostMapping("/add-pg")
    public ResponseEntity<?> addPG(@RequestBody PGDetails pg) {
        pgRepo.save(pg);
        return ResponseEntity.ok("PG added");
    }

    @PutMapping("/update-pg/{id}")
    public ResponseEntity<?> updatePG(@PathVariable Long id, @RequestBody PGDetails pg) {
        PGDetails existing = pgRepo.findById(id).orElseThrow();
        existing.setName(pg.getName());
        existing.setLocation(pg.getLocation());
        existing.setFees(pg.getFees());
        existing.setSharingType(pg.getSharingType());
        existing.setStatus(pg.getStatus());
        pgRepo.save(existing);
        return ResponseEntity.ok("PG updated");
    }

    @DeleteMapping("/delete-pg/{id}")
    public ResponseEntity<?> deletePG(@PathVariable Long id) {
        pgRepo.deleteById(id);
        return ResponseEntity.ok("PG deleted");
    }

    @GetMapping("/list-pgs")
    public List<PGDetails> listPGs() {
        return pgRepo.findAll();
    }

    // TENANT CRUD
    @PostMapping("/add-tenant")
    public ResponseEntity<?> addTenant(@RequestBody Tenant tenant) {
        tenantRepo.save(tenant);
        return ResponseEntity.ok("Tenant added");
    }

    @PutMapping("/update-tenant/{id}")
    public ResponseEntity<?> updateTenant(@PathVariable Long id, @RequestBody Tenant tenant) {
        Tenant existing = tenantRepo.findById(id).orElseThrow();
        existing.setName(tenant.getName());
        existing.setEmail(tenant.getEmail());
        existing.setPhone(tenant.getPhone());
        existing.setPassword(tenant.getPassword());
        existing.setPaymentStatus(tenant.getPaymentStatus());
        tenantRepo.save(existing);
        return ResponseEntity.ok("Tenant updated");
    }

    @DeleteMapping("/delete-tenant/{id}")
    public ResponseEntity<?> deleteTenant(@PathVariable Long id) {
        tenantRepo.deleteById(id);
        return ResponseEntity.ok("Tenant deleted");
    }

    @GetMapping("/list-tenants")
    public List<Tenant> listTenants() {
        return tenantRepo.findAll();
    }



    // View Feedbacks
    @GetMapping("/view-feedbacks")
    public List<Feedback> viewFeedbacks() {
        return feedbackRepo.findAll();
    }

}

