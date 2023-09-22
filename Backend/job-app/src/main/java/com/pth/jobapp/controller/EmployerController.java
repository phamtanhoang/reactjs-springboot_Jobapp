package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.ApplicationResponse;
import com.pth.jobapp.ResponseModels.CandidateApplicationResponse;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.requestmodels.UpdateApplicationStateRequest;
import com.pth.jobapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping("/jobs")
    public ResponseEntity<Page<Job>> EmployerJobs(@RequestHeader("Authorization") String token, Pageable pageable) {
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

    @GetMapping("/pending-applications")
    public ResponseEntity<List<ApplicationResponse>> PendingApplications(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username

            if (employer != null) {
                Page<Application> pendingApplications = applicationService.findPendingApplicationsByEmployerName(employer.getName(), pageable);
                List<ApplicationResponse> responseList = new ArrayList<>();

                for (Application application : pendingApplications) {
                    Candidate candidate = candidateService.findCandidateByApplicationId(application.getId()).get();
                    Job job = jobService.findJobByApplicationId(application.getId()).get();
                    ApplicationResponse response = new ApplicationResponse();
                    response.setFirstName(candidate.getFirstName());
                    response.setLastName(candidate.getLastName());
                    response.setState(application.getState());
                    response.setTitle(job.getTitle());
                    response.setApplyDate(application.getApplyDate());
                    responseList.add(response);
                }

                return ResponseEntity.ok(responseList);
            } else {
                return ResponseEntity.notFound().build(); // Employer not found
            }
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    //get list of apply
    @GetMapping("/applies")
    public ResponseEntity<List<ApplicationResponse>> Applications(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam(name = "jobId") String jobId

    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username
            if (employer != null) {
                Page<Application> pendingApplications = applicationService.findApplicationsByJobId(jobId, pageable);
                List<ApplicationResponse> responseList = new ArrayList<>();

                for (Application application : pendingApplications) {
                    Candidate candidate = candidateService.findCandidateByApplicationId(application.getId()).get();
                    Job job = jobService.findJobByApplicationId(application.getId()).get();
                    ApplicationResponse response = new ApplicationResponse();
                    response.setFirstName(candidate.getFirstName());
                    response.setLastName(candidate.getLastName());
                    response.setState(application.getState());
                    response.setTitle(job.getTitle());
                    response.setApplyDate(application.getApplyDate());
                    responseList.add(response);
                }

                return ResponseEntity.ok(responseList);
            } else {
                return ResponseEntity.notFound().build(); // Employer not found
            }
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/applies")
    public ResponseEntity<CandidateApplicationResponse> getApplications(
            @RequestHeader("Authorization") String token,
            @RequestParam(name = "jobId") String jobId,
            @RequestParam(name = "applicationId") String applicationId

    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username

            if (employer != null) {
                Optional<Job> job = jobService.findById(jobId);

                if (job.isPresent()) {
                    if (job.get().getEmployerId().equals(employer.getId())) {
                        Optional<Application> application = applicationService.findById(applicationId); // Assuming you have a method to find applications by job ID and employer ID

                        if (application.isPresent()) {
                            Application application1 = application.get();
                            Candidate candidate = candidateService.findCandidateByApplicationId(application1.getId()).get();
                            Account account = accountService.findById(candidate.getAccountId()).get();

                            CandidateApplicationResponse response = new CandidateApplicationResponse();
                            response.setUsername(account.getUsername());
                            response.setFirstName(candidate.getFirstName());
                            response.setLastName(candidate.getLastName());
                            response.setAvatar(candidate.getAvatar());
                            response.setDateOfBirth(candidate.getDateOfBirth());
                            response.setSex(candidate.getSex());
                            response.setApplyDate(application1.getApplyDate());
                            response.setCV(application1.getCV());
                            response.setLetter(application1.getLetter());
                            response.setApplyDate(application1.getApplyDate());
                            response.setState(application1.getState());

                            // You can add more fields to the response as needed

                            return ResponseEntity.ok(response);
                        } else {
                            return ResponseEntity.notFound().build(); // No application found for the specified job and employer
                        }
                    } else {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Employer does not own this job
                    }
                } else {
                    return ResponseEntity.notFound().build(); // Job not found
                }
            } else {
                return ResponseEntity.notFound().build(); // Employer not found
            }
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/applies/update-state")
    public ResponseEntity<String> updateApplicationState(
            @RequestHeader("Authorization") String token,

            @RequestBody UpdateApplicationStateRequest updateRequest
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username

            if (employer != null) {
                Optional<Application> application = applicationService.findById(updateRequest.getApplicationId());

                if (application.isPresent()) {
                    Application existingApplication = application.get();
                    existingApplication.setState(updateRequest.getNewState());
                    applicationService.save(existingApplication);

                    return ResponseEntity.ok("Cập nhật trạng thái đơn xin việc thành công");

                }
                else
                    return ResponseEntity.ok("Cập nhật trạng thái đơn xin việc không thành công");
            } else {
                return ResponseEntity.notFound().build(); // Nhà tuyển dụng không tồn tại
            }
        } catch (Exception e) {
            // Xử lý ngoại lệ và trả về phản hồi phù hợp
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}


