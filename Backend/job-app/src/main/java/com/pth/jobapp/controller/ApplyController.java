package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.ApplicationResponse;
import com.pth.jobapp.dao.JobRepository;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.requestmodels.*;
import com.pth.jobapp.service.*;
import com.pth.jobapp.util.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    FileUploader fileUploader;

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

            Page<ApplicationResponse> responseList = pendingApplications.map(application -> {
                ApplicationResponse dto = new ApplicationResponse();
                dto.setId(application.getId());
                dto.setAccountId(application.getCandidateId());
                dto.setJobId(application.getJobId());
                dto.setUserName(accountService.findById(candidateService.findById(application.getCandidateId()).get().getAccountId()).get().getUsername());
                dto.setAccountName(candidateService.findById(application.getCandidateId()).get().getFirstName() + " " + candidateService.findById(application.getCandidateId()).get().getLastName());
                dto.setApplyDate(application.getApplyDate());
                dto.setTitle(jobService.findById(application.getJobId()).get().getTitle());
                dto.setState(application.getState());
                dto.setImage(candidateService.findById(application.getCandidateId()).get().getAvatar());
                return dto;
            });

            return ResponseEntity.ok(responseList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi server vui lòng thử lại");
        }
    }


    @GetMapping("/employerApplications")
    public ResponseEntity<?> employerApplications(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam("title") String title
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);
            if (employer == null) {
                return ResponseEntity.badRequest().body("vai");
            }
            Page<Application> applications = applicationService.findApplicationsByEmployerIdAndContainingTitle(employer.getId(), pageable,title);
            Page<ApplicationResponse> employerApplications = applications.map(application -> {
                ApplicationResponse dto = new ApplicationResponse();
                dto.setId(application.getId());
                dto.setAccountId(application.getCandidateId());
                dto.setJobId(application.getJobId());
                dto.setUserName(accountService.findById(candidateService.findById(application.getCandidateId()).get().getAccountId()).get().getUsername());
                dto.setAccountName(candidateService.findById(application.getCandidateId()).get().getFirstName()+ " "+candidateService.findById(application.getCandidateId()).get().getLastName());
                dto.setApplyDate(application.getApplyDate());
                dto.setTitle(jobService.findById(application.getJobId()).get().getTitle());
                dto.setExpiredDate(jobService.findById(application.getJobId()).get().getToDate());
                dto.setState(application.getState());
                dto.setImage(candidateService.findById(application.getCandidateId()).get().getAvatar());
                return dto;
            });
            return ResponseEntity.ok(employerApplications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Page.empty());
        }
    }


    @GetMapping("/candidateApplications")
    public ResponseEntity<?> getCandidateApplications(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam String state
    ) {
        try {
            String canidateEmail = jwtService.extractUsername(token.substring(7));
            Candidate candidate = candidateService.findCandidateByAccountUsername(canidateEmail).get();
            if (candidate == null) {
                return ResponseEntity.badRequest().body("vai");
            }
            Page<Application> applications = applicationService.findAllByCandidateId(candidate.getId(),state, pageable);
            Page<ApplicationResponse> candidateApplications = applications.map(application -> {
                ApplicationResponse dto = new ApplicationResponse();
                dto.setId(application.getId());
                dto.setAccountId(application.getCandidateId());
                dto.setJobId(application.getJobId());
                dto.setUserName(accountService.findById(candidateService.findById(application.getCandidateId()).get().getAccountId()).get().getUsername());
                dto.setAccountName(candidateService.findById(application.getCandidateId()).get().getFirstName()+ " "+candidateService.findById(application.getCandidateId()).get().getLastName());
                dto.setApplyDate(application.getApplyDate());
                dto.setTitle(jobService.findById(application.getJobId()).get().getTitle());
                dto.setExpiredDate(jobService.findById(application.getJobId()).get().getToDate());
                dto.setState(application.getState());
                dto.setImage(employerService.findById(jobService.findById(application.getJobId()).get().getEmployerId()).get().getImage());
                dto.setEmployerId(employerService.findById(jobService.findById(application.getJobId()).get().getEmployerId()).get().getId());
                dto.setEmployerName(employerService.findById(jobService.findById(application.getJobId()).get().getEmployerId()).get().getName());
                return dto;
            });
            return ResponseEntity.ok(candidateApplications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Page.empty());
        }
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadCV(@RequestParam String fileName) {
        try {
            byte[] pdfData = fileUploader.download(fileName);
            if (pdfData != null) {
                ByteArrayResource resource = new ByteArrayResource(pdfData);

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);

                return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(pdfData.length)
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/applicationDetails")
    public ResponseEntity<?> getApplicationDetails(
            @RequestHeader("Authorization") String token,
            @RequestParam String applicationId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);
            if (employer != null) {

                Optional<Application> applicationOptional = applicationService.findByIdAndEmployerId(applicationId,employer.getId());

                if (applicationOptional.isEmpty())
                    return ResponseEntity.badRequest().body("Không tìm thấy application tương ứng");

                Application application = applicationOptional.get();

                return ResponseEntity.ok(application);
            }

            else
                return ResponseEntity.badRequest().body("Không tìm thấy employer");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/applicationDetailsByCandidateId")
    public ResponseEntity<?> getApplicationDetailsByCandidateId(
            @RequestHeader("Authorization") String token,
            @RequestParam String applicationId
    ) {
        try {
            String candidateName = jwtService.extractUsername(token.substring(7));
            Candidate candidate = candidateService.findCandidateByAccountUsername(candidateName).get();
            if (candidate != null) {

                Optional<Application> applicationOptional = applicationService.findByIdAndCandidateId(applicationId,candidate.getId());

                if (applicationOptional.isEmpty())
                    return ResponseEntity.badRequest().body("Không tìm thấy application tương ứng");

                Application application = applicationOptional.get();

                return ResponseEntity.ok(application);
            }

            else
                return ResponseEntity.badRequest().body("Không tìm thấy employer");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/applicatonsJob")
    public ResponseEntity<?> getApplicatonsOfJob(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam("jobId") String jobId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);
            if (employer == null) {
                return ResponseEntity.badRequest().body("vai");
            }
            Page<Application> applications = applicationService.findApplicationsByJobId(jobId, pageable);
            Page<ApplicationResponse> employerApplications = applications.map(application -> {
                ApplicationResponse dto = new ApplicationResponse();
                dto.setId(application.getId());
                dto.setAccountId(application.getCandidateId());
                dto.setJobId(application.getJobId());
                dto.setUserName(accountService.findById(candidateService.findById(application.getCandidateId()).get().getAccountId()).get().getUsername());
                dto.setAccountName(candidateService.findById(application.getCandidateId()).get().getFirstName()+ " "+candidateService.findById(application.getCandidateId()).get().getLastName());
                dto.setApplyDate(application.getApplyDate());
                dto.setTitle(jobService.findById(application.getJobId()).get().getTitle());
                dto.setExpiredDate(jobService.findById(application.getJobId()).get().getToDate());
                dto.setState(application.getState());
                dto.setImage(candidateService.findById(application.getCandidateId()).get().getAvatar());
                return dto;
            });
            return ResponseEntity.ok(employerApplications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Page.empty());
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
                Optional<Application> application = applicationService.findById(updateRequest.getApplicationId());

                if (application.isPresent()) {
                    Application existingApplication = application.get();

                    if (existingApplication.getState().equals("pending")) {
                        existingApplication.setState(updateRequest.getNewState());
                        applicationService.save(existingApplication);
                        Job optionalJob = jobRepository.getById(existingApplication.getJobId());
                        emailSenderService.sendEmail( existingApplication.getEmail(), existingApplication.getName(),
                                optionalJob.getTitle(), existingApplication.getJobId(), updateRequest.getNewState(), "MailForm");
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
            String email = jwtService.extractUsername(token.substring(7));
            Candidate candidate = candidateService.findCandidateByAccountUsername(email).get();
            Application isApplied = applicationService.findByJobIdAndCandidateId(jobId, candidate.getId());
            return ResponseEntity.ok(isApplied);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to check application status: " + e.getMessage());
        }
    }

    @GetMapping("/candidateApplicationDetails")
    public ResponseEntity<?> getCandidateApplicationDetails(
            @RequestHeader("Authorization") String token,
            @RequestParam String applicationId
    ) {
        try {
            String candidateEmail = jwtService.extractUsername(token.substring(7));
            Candidate candidate = candidateService.findCandidateByAccountUsername(candidateEmail).get();
            if (candidate != null) {

                Optional<Application> applicationOptional = applicationService.findByIdAndCandidateId(applicationId,candidate.getId());

                if (applicationOptional.isEmpty())
                    return ResponseEntity.badRequest().body("Không tìm thấy application tương ứng");

                Application application = applicationOptional.get();

                return ResponseEntity.ok(application);
            }

            else
                return ResponseEntity.badRequest().body("Không tìm thấy employer");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
