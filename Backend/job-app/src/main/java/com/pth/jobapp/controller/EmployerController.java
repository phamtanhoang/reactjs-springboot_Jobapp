package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.CandidateProfileResponse;
import com.pth.jobapp.ResponseModels.EmployerProfileResponse;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employer")
public class EmployerController {

    @Autowired
    private JobService jobService;
    @Autowired
    private EmployerService employerService; // Assuming you have an EmployerService

    @Autowired
    private JwtService jwtService; // Assuming you have a JwtService to handle JWT operations

    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private CandidateService candidateService;

    @Autowired
    private AccountService accountService;


    @GetMapping("/profile")
    public ResponseEntity<?> getAccountFromToken(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.substring(7);
            String username = jwtService.extractUsername(token);
            System.out.println(username);

            Employer employer = employerService.findByAccountUsername(username);

            if (employer != null) {
                EmployerProfileResponse employerProfileResponse = new EmployerProfileResponse();
                employerProfileResponse.setUsername(username);
                employerProfileResponse.setName(employer.getName());
                employerProfileResponse.setAddress(employer.getAddress());
                employerProfileResponse.setEmployerId(employer.getId());
                employerProfileResponse.setBanner(employer.getBanner());
                employerProfileResponse.setDescription(employer.getDescription());
                employerProfileResponse.setImage(employer.getImage());

                return ResponseEntity.ok(employerProfileResponse);
            } else {
                System.out.println("Người dùng không tồn tại");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Người dùng không tồn tại");
            }
        } catch (Exception e) {
            System.out.println("Lỗi");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi");
        }
    }


    @PutMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Employer employer) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Employer employer1 = employerService.findByAccountUsername(email);
            employer1.setAddress(employer.getAddress());
            employer1.setDescription(employer1.getDescription());
            employer1.setName(employer.getName());
            employerService.save(employer1);
            return ResponseEntity.ok("Candidate profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate profile");
        }
    }



    @GetMapping("/employer/jobs")
    public ResponseEntity<Job> EmployerJobById(
            @RequestHeader("Authorization") String token,
            @RequestParam String jobId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username

            if (employer != null) {
                Optional<Job> job = jobService.findById(jobId);

                if (job.isPresent()) {
                    return ResponseEntity.ok(job.get());
                } else {
                    return ResponseEntity.notFound().build();
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/updateImage")
    public ResponseEntity<String> updateImage(@RequestHeader("Authorization") String token, @RequestBody MultipartFile image) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(email);
            employerService.saveWithImage(employer,image);

            return ResponseEntity.ok("Candidate image updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
        }
    }
    @PutMapping("/updateBanner")
    public ResponseEntity<String> updateBanner(@RequestHeader("Authorization") String token, @RequestBody MultipartFile banner) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(email);
            employerService.saveWithBanner(employer,banner);

            return ResponseEntity.ok("Candidate image updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
        }
    }







}


