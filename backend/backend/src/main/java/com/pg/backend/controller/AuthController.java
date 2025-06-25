package com.pg.backend.controller;


import com.pg.backend.model.User;
import com.pg.backend.repository.UserRepository;
import com.pg.backend.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepo;
    @Autowired private OTPService otpService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepo.findByPhone(user.getPhone()).isPresent()) {
            return ResponseEntity.badRequest().body("Phone number already registered");
        }
        String otp = otpService.sendOtp(user.getPhone());
        return ResponseEntity.ok("OTP sent to " + user.getPhone());
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String phone, @RequestParam String otp) {
        if (otpService.verifyOtp(phone, otp)) {
            // Save user to DB
            return ResponseEntity.ok("User registered successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String password = data.get("password");

        Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
