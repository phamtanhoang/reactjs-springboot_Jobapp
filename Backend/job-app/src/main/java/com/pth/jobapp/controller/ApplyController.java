package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.ApplicationResponse;
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

@CrossOrigin("*")
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


    @GetMapping("/pendingApplications")
    public ResponseEntity<?> pendingApplications(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);

            if (employer == null) {
                return ResponseEntity.badRequest().body("Không tìm thấy người sử dụng");
            }

            Page<Application> pendingApplications = applicationService.findPendingApplicationsByEmployerName(employer.getName(), pageable);
            List<ApplicationResponse> responseList = new ArrayList<>();

            for (Application application : pendingApplications) {
                System.out.println(application.getId());
                Optional<Candidate> candidateOptional = candidateService.findById(application.getCandidateId());
                Optional<Job> jobOptional = jobService.findById(application.getJobId());

                if (candidateOptional.isPresent() && jobOptional.isPresent()) {
                    Job job = jobOptional.get();

                    ApplicationResponse response = new ApplicationResponse();
                    response.setName(application.getName());
                    response.setState(application.getState());
                    response.setTitle(job.getTitle());
                    response.setApplyDate(application.getApplyDate());
                    response.setId(application.getId());
                    responseList.add(response);
                } else {
                    return ResponseEntity.badRequest().body("Không tìm thấy ứng viên hoặc công việc tương ứng");
                }
            }

            return ResponseEntity.ok(responseList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server vui lòng thử lại");
        }
    }


    @GetMapping("/employerApplications")
    public ResponseEntity<Page<ApplicationResponse>> employerApplications(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);

            if (employer == null) {
                return ResponseEntity.badRequest().body(Page.empty());
            }

            Page<Application> applications = applicationService.findApplicationsByEmployerName(employer.getName(), pageable);
            Page<ApplicationResponse> employerApplications = applications.map(application -> {
                ApplicationResponse dto = new ApplicationResponse();
                dto.setId(application.getId());
                dto.setCandidateId(application.getCandidateId());
                dto.setJobId(application.getJobId());
                dto.setUsername(accountService.findById(candidateService.findById(application.getCandidateId()).get().getAccountId()).get().getUsername());
                dto.setName(candidateService.findById(application.getCandidateId()).get().getFirstName()+ " "+candidateService.findById(application.getCandidateId()).get().getLastName());
                dto.setApplyDate(application.getApplyDate());
                dto.setTitle(jobService.findById(application.getJobId()).get().getTitle());
                dto.setState(application.getState());
                dto.setExpiredDate(jobService.findById(application.getJobId()).get().getToDate());
                dto.setImage(candidateService.findById(application.getCandidateId()).get().getAvatar());
                return dto;
            });

            return ResponseEntity.ok(employerApplications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Page.empty());
        }
    }


//    @GetMapping("/applyDetails")
//    public ResponseEntity<ApplicationDetailsResponse> getApplyDetails(
//            @RequestHeader("Authorization") String token,
//            @RequestBody String applicationId
//    ) {
//        try {
//            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
//            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username
//            ApplicationDetailsResponse response = new ApplicationDetailsResponse();
//            if (employer != null) {
//                Optional<Application> applicationOptional = applicationService.findById(applicationId);
//                Application application = applicationOptional.get();
//                Optional<Candidate> candidateOptional = candidateService.findById(application.getCandidateId());
//                Optional<Job> jobOptional = jobService.findById(application.getJobId());
//
//                if (candidateOptional.isPresent() && jobOptional.isPresent()) {
//                    Candidate candidate = candidateOptional.get();
//                    Job job = jobOptional.get();
//
//
//                    response.setEmail(application.getEmail());
//                    response.setName(application.getName());
//                    response.setPhoneNumber(application.getPhoneNumber());
//                    response.setAvatar(candidate.getAvatar());
//                    response.setDateOfBirth(candidate.getDateOfBirth());
//                    response.setSex(candidate.getSex());
//                    response.setApplyDate(application.getApplyDate());
//                    response.setCV(application.getCV());
//                    response.setLetter(application.getLetter());
//                    response.setState(application.getState());
//                    response.setTitle(job.getTitle());
//                } else {
//                    System.err.println("Không tìm thấy Candidate hoặc Job cho ứng viên " + application.getCandidateId() + " và công việc " + application.getJobId());
//                }
//            }
//
//            return ResponseEntity.ok(response);
//        }
//        catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
    @GetMapping("/applyDetails")
    public ResponseEntity<Application> getApplyDetails(
            @RequestHeader("Authorization") String token,
            @RequestBody String applicationId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username
            Application response = new Application();
            if (employer != null) {
                Optional<Application> applicationOptional = applicationService.findById(applicationId);
                Application application = applicationOptional.get();

                response.setEmail(application.getEmail());
                response.setName(application.getName());
                response.setPhoneNumber(application.getPhoneNumber());
                response.setApplyDate(application.getApplyDate());
                response.setCV(application.getCV());
                response.setLetter(application.getLetter());
                response.setState(application.getState());

            }

            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/appliesJob")
    public ResponseEntity<?> getAppliesJob(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestBody String jobId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username
            if (employer != null) {
                Optional<Job> jobOptional = jobService.findById(jobId);

                if (jobOptional.isPresent()) {
                    Page<Application> applications = applicationService.findApplicationsByJobId(jobOptional.get().getId(), pageable);
                    List<ApplicationResponse> responseList = new ArrayList<>();

                    for (Application application : applications) {
                        System.out.println(application.getId());
                        Optional<Candidate> candidateOptional = candidateService.findById(application.getCandidateId());

                        if (candidateOptional.isPresent()) {
                            Job job = jobOptional.get();

                            ApplicationResponse response = new ApplicationResponse();
                            response.setName(application.getName());
                            response.setState(application.getState());
                            response.setTitle(job.getTitle());
                            response.setApplyDate(application.getApplyDate());
                            response.setId(application.getId());
                            responseList.add(response);

                        } else {
                            return ResponseEntity.badRequest().body("Không tìm thấy ứng viên cho ứng viên " + application.getCandidateId());
                        }
                    }

                    return ResponseEntity.ok(responseList);
                } else {
                    return ResponseEntity.badRequest().body("Không tìm thấy công việc");
                }
            } else {
                return ResponseEntity.badRequest().body("Không tìm thấy tên người dùng");

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server vui lòng thử lại");
        }
    }

    @PutMapping("/updateState")
    public ResponseEntity<String> updateApplicationState(
            @RequestHeader("Authorization") String token,
            @RequestBody UpdateApplicationStateRequest updateRequest
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);

            if (employer != null) {
                System.out.println("đã vào đây " + updateRequest.getApplicationId());
                Optional<Application> application = applicationService.findById(updateRequest.getApplicationId());

                if (application.isPresent()) {
                    Application existingApplication = application.get();

                    if (existingApplication.getState().equals("pending")) {
                        existingApplication.setState(updateRequest.getNewState());
                        applicationService.save(existingApplication);
                        return ResponseEntity.ok("Cập nhật thành công");
                    } else {
                        return ResponseEntity.badRequest().body("Không thể cập nhật với trạng thái 'refused'");
                    }
                } else {
                    return ResponseEntity.badRequest().body("Không tìm thấy ứng viên");
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server vui lòng thử lại");
        }
    }


    @GetMapping("/isApplied")
    public ResponseEntity<?> isApplied(
            @RequestHeader("Authorization") String token,
            @RequestParam String jobId
    ) {
        try {
            String email = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Candidate candidate = candidateService.findCandidateByAccountUsername(email).get();
            Application isApplied = applicationService.findByJobIdAndCandidateId(jobId, candidate.getId());
            return ResponseEntity.ok(isApplied);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to check application status: " + e.getMessage());
        }
    }


}
