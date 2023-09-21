package com.pth.jobapp.controller;

import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Application;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import com.pth.jobapp.requestmodels.EmployerRegistrationRequest;
import com.pth.jobapp.service.ApplicationService;
import com.pth.jobapp.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.ApplicationScope;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin("http://127.0.0.1:5173/")
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService jobService;
    @Autowired
    private ApplicationService applicationService;
    @PostMapping("/candidate/apply")
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
    @PostMapping("/employer/create")
    public ResponseEntity<String> createJob(@RequestBody Job job) {
        try {
            UUID uuid = UUID.randomUUID();
            job.setId(uuid.toString());
            jobService.save(job);
            return ResponseEntity.ok("Job created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create job");
        }
    }

    @PutMapping("/employer/update/{jobId}")
    public ResponseEntity<String> updateJob(@PathVariable String jobId, @RequestBody Job updatedJob) {
        try {
            Optional<Job> existingJob = jobService.findById(jobId);
            if (existingJob.isPresent()) {
                Job job = existingJob.get();
                job.setTitle(updatedJob.getTitle());
                job.setDescription(updatedJob.getDescription());
                job.setSalary(updatedJob.getSalary());
                job.setFromDate(updatedJob.getFromDate());
                job.setToDate(updatedJob.getToDate());
                job.setAddress(updatedJob.getAddress());
                job.setState(updatedJob.getState());
                job.setCategoryId(updatedJob.getCategoryId());
                jobService.save(job);
                return ResponseEntity.ok("Job updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update job");
        }
    }

    @DeleteMapping("/employer/delete/{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable String jobId) {
        try {
            Optional<Job> existingJob = jobService.findById(jobId);
            if (existingJob.isPresent()) {
                jobService.delete(existingJob.get());
                return ResponseEntity.ok("Job deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete job");
        }
    }

}
