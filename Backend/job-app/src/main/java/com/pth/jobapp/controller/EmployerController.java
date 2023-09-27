package com.pth.jobapp.controller;

import com.pth.jobapp.entity.*;
import com.pth.jobapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("http://127.0.0.1:5173/")
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
    @PreAuthorize("hasAuthority('employer')")
    public String employerProfile() {
        return "Welcome to User Profile";
    }




    @GetMapping("/employer/jobs/{jobId}")
    public ResponseEntity<Job> EmployerJobById(
            @RequestHeader("Authorization") String token,
            @PathVariable String jobId
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
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




    //get list of apply





}


