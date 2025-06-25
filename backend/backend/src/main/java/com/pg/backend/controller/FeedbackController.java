package com.pg.backend.controller;

import com.pg.backend.model.Feedback;
import com.pg.backend.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Tenant submits feedback
    @PostMapping("/tenant/feedback")
    public String submitFeedback(@RequestBody Feedback feedback) {
        feedback.setDate(new Date());
        feedbackRepository.save(feedback);
        return "Feedback submitted successfully.";
    }

    // Owner views all feedback
    @GetMapping("/owner/feedback")
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
