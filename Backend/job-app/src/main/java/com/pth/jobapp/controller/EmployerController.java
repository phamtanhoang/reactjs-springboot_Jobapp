package com.pth.jobapp.controller;

import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import com.pth.jobapp.service.EmployerService;
import com.pth.jobapp.service.JobService;
import com.pth.jobapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('employer')")
    public String employerProfile() {
        return "Welcome to User Profile";
    }
    @GetMapping("/jobs")
    public ResponseEntity<Page<Job>> getEmployerJobs(@RequestHeader("Authorization") String token, Pageable pageable) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username

            if (employer != null) {
                Page<Job> employerJobs = jobService.findByEmployerId(employer.getId(), pageable);
                return ResponseEntity.ok(employerJobs);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/employer/jobs/{jobId}")
    public ResponseEntity<Job> getEmployerJobById(
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

}