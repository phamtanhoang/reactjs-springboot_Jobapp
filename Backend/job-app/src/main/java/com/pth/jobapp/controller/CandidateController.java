package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.CandidateApplicationResponse;
import com.pth.jobapp.ResponseModels.CandidateProfileResponse;
import com.pth.jobapp.entity.Application;
import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.entity.Job;
import com.pth.jobapp.service.ApplicationService;
import com.pth.jobapp.service.CandidateService;
import com.pth.jobapp.service.CategoryService;
import com.pth.jobapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin("http://127.0.0.1:5173/")
    @RestController
    @RequestMapping("/api/candidates")
    public class CandidateController {
        @Autowired
        private CandidateService candidateService;
        @Autowired
        private ApplicationService applicationService;
        @Autowired
        private  JwtService jwtService;


//    @GetMapping("/profile")
////    @PreAuthorize("hasAuthority('employer')")
//    public String candidateProfile() {
//        return "Welcome to User Profile";
//    }
    @PostMapping("/apply")
    public String applyJob(@RequestBody Application application) {
        if(applicationService.findByJobIdAndCandidateId(application.getJobId(),application.getCandidateId())==null){
            UUID uuid = UUID.randomUUID();
            application.setId(uuid.toString());
            application.setApplyDate(new Date());
            application.setState("pending");
            applicationService.save(application);
            return "apply job successfully";
        }
        else
            return " apply job failed";
    }
    @PutMapping("/update")

    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Candidate candidate) {

        try {
            String candidateEmail = jwtService.extractUsername(token.substring(7));
            Optional<Candidate> existingJob = candidateService.findCandidateByAccountUsername(candidateEmail);// Remove "Bearer " prefix from token
            Candidate updateCandidate= existingJob.get();
            updateCandidate.setDateOfBirth(candidate.getDateOfBirth());
            updateCandidate.setAvatar(candidate.getAvatar());
            updateCandidate.setFirstName(candidate.getFirstName());
            updateCandidate.setLastName(candidate.getLastName());
            updateCandidate.setSex(candidate.getSex());
            candidateService.save(updateCandidate);

            return ResponseEntity.ok("Candidate profile updated successfully");
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate profile");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getAccountFromToken(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.substring(7); // Loại bỏ tiền tố "Bearer "
            String username = jwtService.extractUsername(token);
            System.out.println(username);

            Candidate candidate = candidateService.findCandidateByAccountUsername(username).orElse(null);

            if (candidate != null) {
                CandidateProfileResponse candidateProfileResponse = new CandidateProfileResponse();
                candidateProfileResponse.setUsername(username);
                candidateProfileResponse.setLastName(candidate.getFirstName());
                candidateProfileResponse.setFirstName(candidate.getFirstName());
                candidateProfileResponse.setSex(candidate.getSex());
                candidateProfileResponse.setAvatar(candidate.getAvatar());
                candidateProfileResponse.setDateOfBirth(candidate.getDateOfBirth());
                System.out.println(candidate);
                return ResponseEntity.ok(candidateProfileResponse);
            } else {
                System.out.println("Người dùng không tồn tại");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Người dùng không tồn tại");
            }
        } catch (Exception e) {
            System.out.println("Lỗi");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi");
        }
    }

}

