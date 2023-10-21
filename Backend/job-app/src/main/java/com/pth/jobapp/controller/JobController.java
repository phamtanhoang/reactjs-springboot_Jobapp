package com.pth.jobapp.controller;

import com.pth.jobapp.entity.*;
import com.pth.jobapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService jobService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    EmployerService employerService;
    @Autowired
    CandidateService candidateService;
    @Autowired ApplicationService applicationService;
    @PostMapping("/create")
    public ResponseEntity<String> createJob(@RequestBody Job job,@RequestHeader("Authorization") String token) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method
            UUID uuid = UUID.randomUUID();
            job.setId(uuid.toString());
            job.setFromDate(new Date());
            job.setEmployerId(employer.getId());
            job.setState("pending");
            jobService.save(job);
            return ResponseEntity.ok("Job created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create job");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateJob(@RequestHeader("Authorization") String token, @RequestParam String jobId, @RequestBody Job updatedJob) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method
            if (employer == null)
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Not employer");

            Optional<Job> existingJob = jobService.findById(jobId);
            if (existingJob.isPresent()) {
                Job job = existingJob.get();

                if (!(job.getState().equals("active")||job.getState().equals("pending"))) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job is not in an active state and cannot be updated.");
                }

                Date currentDate = new Date();


                if (job.getToDate().before(currentDate)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The updated toDate must be after the current date.");
                }
                System.out.println("da vao day");
                job.setFromDate(new Date());
                job.setTitle(updatedJob.getTitle());
                job.setDescription(updatedJob.getDescription());
                job.setSalary(updatedJob.getSalary());
                job.setToDate(updatedJob.getToDate());
                job.setAddress(updatedJob.getAddress());
                job.setState("pending");
                job.setCategoryId(updatedJob.getCategoryId());
                jobService.save(job);
                return ResponseEntity.ok("Job updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The job with ID " + jobId + " was not found.");

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update job");
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getActiveJob(@PageableDefault(page = 0, size = 10) Pageable pageable){
        try{
            Page<Job>jobs =jobService.findByTitleContainingAndAddress(pageable);
            return  ResponseEntity.ok(jobs);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body("ERROR!");
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteJob(
            @RequestHeader("Authorization") String token,
            @RequestParam String jobId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);
            if (employer == null)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unauthorized");

            Optional<Job> existingJob = jobService.findById(jobId);
            if (existingJob.isPresent()) {
                Job job = existingJob.get();

                if (!job.getEmployerId().equals(employer.getId())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Permission denied");
                }

                List<Application> applications = applicationService.findApplicationsByJobId(jobId);

                for (Application application : applications) {
                    applicationService.delete(application);
                }

                jobService.delete(job);

                return ResponseEntity.ok("Job deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete job");
        }
    }


    @GetMapping("/jobsEmployer")
    public ResponseEntity<Page<Job>> jobsEmployer(@RequestHeader("Authorization") String token, Pageable pageable) {
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}
