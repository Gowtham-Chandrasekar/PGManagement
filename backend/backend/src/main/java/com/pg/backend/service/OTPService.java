package com.pg.backend.service;


import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OTPService {
    private Map<String, String> otpMap = new HashMap<>();

    public String sendOtp(String phone) {
        String otp = String.valueOf(new Random().nextInt(8999) + 1000);
        otpMap.put(phone, otp);
        System.out.println("Sending OTP to " + phone + ": " + otp); // Simulate SMS
        return otp;
    }

    public boolean verifyOtp(String phone, String otp) {
        return otpMap.containsKey(phone) && otpMap.get(phone).equals(otp);
    }
}
