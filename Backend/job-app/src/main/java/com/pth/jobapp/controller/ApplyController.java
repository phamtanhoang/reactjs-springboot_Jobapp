package com.pth.jobapp.controller;

import com.dropbox.core.DbxException;
import com.pth.jobapp.ResponseModels.ApplicationResponse;
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

import java.io.IOException;
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
            List<ApplicationResponse> responseList = new ArrayList<>();

            for (Application application : pendingApplications) {
                System.out.println(application.getId());
                Optional<Candidate> candidateOptional = candidateService.findById(application.getCandidateId());
                Optional<Job> jobOptional = jobService.findById(application.getJobId());

                if (candidateOptional.isPresent() && jobOptional.isPresent()) {
                     ApplicationResponse dto = new ApplicationResponse();
                    dto.setId(application.getId());
                    dto.setAccountId(application.getCandidateId());
                    dto.setJobId(application.getJobId());
                    dto.setUserName(accountService.findById(candidateService.findById(application.getCandidateId()).get().getAccountId()).get().getUsername());
                    dto.setAccountName(candidateService.findById(application.getCandidateId()).get().getFirstName()+ " "+candidateService.findById(application.getCandidateId()).get().getLastName());
                    dto.setApplyDate(application.getApplyDate());
                    dto.setTitle(jobService.findById(application.getJobId()).get().getTitle());
                    dto.setState(application.getState());
                    dto.setImage(candidateService.findById(application.getCandidateId()).get().getAvatar());
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
    public ResponseEntity<?> employerApplications(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam("title") String title
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);
            System.out.println(employerName);
            if (employer == null) {
                return ResponseEntity.badRequest().body("vai");
            }
            System.out.println(employerName);
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

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadCV(@RequestParam String fileName) {
        try {
            byte[] pdfData = fileUploader.downloadPdfFromDropbox(fileName);
            System.out.println(fileName);
            if (pdfData != null) {
                ByteArrayResource resource = new ByteArrayResource(pdfData);

                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);

                return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(pdfData.length)
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(resource);
            }
        } catch (IOException | DbxException e) {
            e.printStackTrace();
        }

        // Trả về lỗi nếu không thể tải tệp
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }


    @GetMapping("/applicationDetails")
    public ResponseEntity<?> getApplicationDetails(
            @RequestHeader("Authorization") String token,
            @RequestParam String applicationId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username
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


    @GetMapping("/applicatonsJob")
    public ResponseEntity<?> getApplicatonsOfJob(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam("jobId") String jobId
    ) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(employerName);
            System.out.println(employerName);
            if (employer == null) {
                return ResponseEntity.badRequest().body("vai");
            }
            System.out.println(employerName);
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
            System.out.println("da zo day");
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
                System.out.println("đã vào đây" + updateRequest.getApplicationId());
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
