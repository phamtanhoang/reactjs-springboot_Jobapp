package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.ApplicationResponse;
import com.pth.jobapp.ResponseModels.ApplicationDetailsResponse;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.requestmodels.*;
import com.pth.jobapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("http://127.0.0.1:5173/")
@RestController
@RequestMapping("/api/applies")
public class ApplyController {

    @Autowired
    private  EmployerService employerService;
    @Autowired
    private CandidateService candidateService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private ApplicationService  applicationService;
    @Autowired
    private JobService jobService;
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
                    System.out.println(application.getId());
                    Optional<Candidate> candidateOptional = candidateService.findById(application.getCandidateId());
                    Optional<Job> jobOptional = jobService.findById(application.getJobId());

                    if (candidateOptional.isPresent() && jobOptional.isPresent()) {
                        Candidate candidate = candidateOptional.get();
                        Job job = jobOptional.get();

                        ApplicationResponse response = new ApplicationResponse();
                        response.setFirstName(candidate.getFirstName());
                        response.setLastName(candidate.getLastName());
                        response.setState(application.getState());
                        response.setTitle(job.getTitle());
                        response.setApplyDate(application.getApplyDate());
                        response.setApplicationId(application.getId());
                        responseList.add(response);
                    } else {
                        // Xử lý trường hợp khi không tìm thấy Candidate hoặc Job
                        System.err.println("Không tìm thấy Candidate hoặc Job cho ứng viên " + application.getCandidateId() + " và công việc " + application.getJobId());
                    }
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


    @GetMapping("/apply-details")
    public ResponseEntity<ApplicationDetailsResponse> getApplyDetails(
            @RequestHeader("Authorization") String token,
            @RequestBody ApplicationDetailRequest applicationDetailRequest
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username
            ApplicationDetailsResponse response = new ApplicationDetailsResponse();
            if (employer != null) {
                Optional<Application> applicationOptional = applicationService.findById(applicationDetailRequest.getApplicationId());
                Application application = applicationOptional.get();
                Optional<Candidate> candidateOptional = candidateService.findById(application.getCandidateId());
                Optional<Job> jobOptional = jobService.findById(application.getJobId());

                if (candidateOptional.isPresent() && jobOptional.isPresent()) {
                    Candidate candidate = candidateOptional.get();
                    Job job = jobOptional.get();


                    response.setUsername(employerName);
                    response.setFirstName(candidate.getFirstName());
                    response.setLastName(candidate.getLastName());
                    response.setAvatar(candidate.getAvatar());
                    response.setDateOfBirth(candidate.getDateOfBirth());
                    response.setSex(candidate.getSex());
                    response.setApplyDate(application.getApplyDate());
                    response.setCV(application.getCV());
                    response.setLetter(application.getLetter());
                    response.setState(application.getState());
                    response.setTitle(job.getTitle());
                } else {
                    // Xử lý trường hợp khi không tìm thấy Candidate hoặc Job
                    System.err.println("Không tìm thấy Candidate hoặc Job cho ứng viên " + application.getCandidateId() + " và công việc " + application.getJobId());
                }
            }

            return ResponseEntity.ok(response);
        }
          catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
          }
    }


    @GetMapping("/applies-job")
    public ResponseEntity<List<ApplicationResponse>> getAppliesJob(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestBody JobIdRequest jobId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username
            if (employer != null) {
                Optional<Job> jobOptional = jobService.findById(jobId.getJobId());

                Page<Application> applications = applicationService.findApplicationsByJobId(jobOptional.get().getId(), pageable);
                List<ApplicationResponse> responseList = new ArrayList<>();

                for (Application application : applications) {
                    System.out.println(application.getId());
                    Optional<Candidate> candidateOptional = candidateService.findById(application.getCandidateId());

                    if (candidateOptional.isPresent() && jobOptional.isPresent()) {
                        Candidate candidate = candidateOptional.get();
                        Job job = jobOptional.get();

                        ApplicationResponse response = new ApplicationResponse();
                        response.setFirstName(candidate.getFirstName());
                        response.setLastName(candidate.getLastName());
                        response.setState(application.getState());
                        response.setTitle(job.getTitle());
                        response.setApplyDate(application.getApplyDate());
                        response.setApplicationId(application.getId());
                        responseList.add(response);
                    } else {
                        // Xử lý trường hợp khi không tìm thấy Candidate hoặc Job
                        System.err.println("Không tìm thấy Candidate hoặc Job cho ứng viên " + application.getCandidateId() + " và công việc " + application.getJobId());
                    }
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
