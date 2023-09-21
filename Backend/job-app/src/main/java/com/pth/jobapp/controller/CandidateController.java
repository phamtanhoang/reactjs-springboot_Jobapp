package com.pth.jobapp.controller;

import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.service.CandidateService;
import com.pth.jobapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://127.0.0.1:5173/")
    @RestController
    @RequestMapping("/api/candidates")
    public class CandidateController {
        @Autowired
        private CandidateService candidateService;
    @GetMapping("/Profile")
//    @PreAuthorize("hasAuthority('employer')")
    public String candidateProfile() {
        return "Welcome to User Profile";
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProfile(@PathVariable String id, @RequestBody Candidate candidate) {
        try {
            // Set the candidate's ID from the path variable into the candidate object
            candidate.setId(id);

            // Now, update the candidate's profile
            candidateService.updateCandidate(candidate);

            return ResponseEntity.ok("Candidate profile updated successfully");
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate profile");
        }
    }
    }

