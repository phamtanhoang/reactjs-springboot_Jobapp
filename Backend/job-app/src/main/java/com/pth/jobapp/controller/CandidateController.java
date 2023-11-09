package com.pth.jobapp.controller;
import com.pth.jobapp.ResponseModels.EmailMessageResponse;
import com.pth.jobapp.dao.JobRepository;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.service.*;
import com.pth.jobapp.ResponseModels.CandidateProfileResponse;
import com.pth.jobapp.requestmodels.ExperienceUpdateRequest;
import com.pth.jobapp.requestmodels.SkillUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/candidates")
public class CandidateController {
    @Autowired
    private CandidateService candidateService;
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private  JwtService jwtService;
    @Autowired
    private EmployerService employerService;
    @Autowired
    private AccountService accountService;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping("/apply")
    public ResponseEntity<String> applyJob(
            @RequestHeader("Authorization") String tokenHeader,
            @RequestPart("cVFile") MultipartFile cVFile,
            @RequestPart("application") Application application
    ) {
        try {
            String candidateEmail = jwtService.extractUsername(tokenHeader.substring(7));
            Candidate candidate = candidateService.findCandidateByAccountUsername(candidateEmail).orElse(null);
            if (applicationService.findByJobIdAndCandidateId(application.getJobId(), candidate.getId()) == null) {
                if (!cVFile.isEmpty()) {
                    if (!cVFile.getContentType().equals("application/pdf")) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only PDF files are allowed");
                    }
                    application.setCandidateId(candidate.getId());
                    UUID uuid = UUID.randomUUID();
                    application.setId(uuid.toString());
                    Application savedApplication = applicationService.saveWithCV(application, cVFile);

                    if (savedApplication != null) {

                        Job optionalJob = jobRepository.getById(application.getJobId());
                        emailSenderService.sendEmail(application.getEmail(), application.getName(),
                                optionalJob.getTitle(), application.getJobId(),"pending", "MailForm");
                        return ResponseEntity.status(HttpStatus.OK).body("Applied for the job successfully");
                    } else {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to apply for the job");
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CV file is empty");
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already applied");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to apply for the job");
        }
    }



    @PutMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Candidate candidate) {

        try {
            String candidateEmail = jwtService.extractUsername(token.substring(7));
            Optional<Candidate> existingCandidate = candidateService.findCandidateByAccountUsername(candidateEmail);
            Candidate updateCandidate= existingCandidate.get();
            updateCandidate.setDateOfBirth(candidate.getDateOfBirth());
            updateCandidate.setFirstName(candidate.getFirstName());
            updateCandidate.setLastName(candidate.getLastName());
            updateCandidate.setSex(candidate.getSex());
            candidateService.save(updateCandidate);

            return ResponseEntity.ok("Candidate profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate profile");
        }
    }

        @PutMapping("/updateImage")
        public ResponseEntity<String> updateImage(@RequestHeader("Authorization") String token, @RequestBody MultipartFile image) {

            try {
                String candidateEmail = jwtService.extractUsername(token.substring(7));
                Optional<Candidate> candidate = candidateService.findCandidateByAccountUsername(candidateEmail);
                Candidate updateCandidate= candidate.get();
                candidateService.saveWithImage(updateCandidate,image);

                return ResponseEntity.ok("Candidate image updated successfully");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
            }
        }

    @GetMapping("/profile")
    public ResponseEntity<?> getAccountFromToken(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.substring(7);
            String username = jwtService.extractUsername(token);

            Candidate candidate = candidateService.findCandidateByAccountUsername(username).orElse(null);

            if (candidate != null) {
                CandidateProfileResponse candidateProfileResponse = new CandidateProfileResponse();
                candidateProfileResponse.setUsername(username);
                candidateProfileResponse.setLastName(candidate.getLastName());
                candidateProfileResponse.setFirstName(candidate.getFirstName());
                candidateProfileResponse.setSex(candidate.getSex());
                candidateProfileResponse.setAvatar(candidate.getAvatar());
                candidateProfileResponse.setDateOfBirth(candidate.getDateOfBirth());
                candidateProfileResponse.setSkill(candidate.getSkill());
                candidateProfileResponse.setExperience(candidate.getExperience());
                return ResponseEntity.ok(candidateProfileResponse);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Người dùng không tồn tại");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi");
        }
    }
    @PutMapping("/updateSkill")
    public ResponseEntity<String> updateSkill(@RequestHeader("Authorization") String token, @RequestBody SkillUpdateRequest skillUpdateRequest) {

        try {
            String candidateEmail = jwtService.extractUsername(token.substring(7));
            Optional<Candidate> existingJob = candidateService.findCandidateByAccountUsername(candidateEmail);
            Candidate updateCandidate= existingJob.get();
            updateCandidate.setSkill(skillUpdateRequest.getSkill());
            candidateService.save(updateCandidate);

            return ResponseEntity.ok("Candidate skill updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate skill");
        }
    }

    @PutMapping("/updateExperience")
    public ResponseEntity<String> updateExperience(@RequestHeader("Authorization") String token, @RequestBody ExperienceUpdateRequest experienceUpdateRequest) {

        try {
            String candidateEmail = jwtService.extractUsername(token.substring(7));
            Optional<Candidate> existingJob = candidateService.findCandidateByAccountUsername(candidateEmail);
            Candidate updateCandidate= existingJob.get();
            updateCandidate.setExperience(experienceUpdateRequest.getExperience());
            candidateService.save(updateCandidate);

            return ResponseEntity.ok("Candidate image updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
        }
    }

    @GetMapping("/candidateProfile")
    public ResponseEntity<?> getAccountFromUsername(@RequestHeader("Authorization") String tokenHeader,@RequestParam String id) {
        try {
            String token = tokenHeader.substring(7);
            String email = jwtService.extractUsername(token);

            Employer employer = employerService.findByAccountUsername(email);

            if (employer != null) {
                Candidate candidate = candidateService.findById(id).get();
                Account account = accountService.findById(candidate.getAccountId()).get();
                CandidateProfileResponse candidateProfileResponse = new CandidateProfileResponse();
                candidateProfileResponse.setUsername(account.getUsername());
                candidateProfileResponse.setLastName(candidate.getLastName());
                candidateProfileResponse.setFirstName(candidate.getFirstName());
                candidateProfileResponse.setSex(candidate.getSex());
                candidateProfileResponse.setAvatar(candidate.getAvatar());
                candidateProfileResponse.setDateOfBirth(candidate.getDateOfBirth());
                candidateProfileResponse.setSkill(candidate.getSkill());
                candidateProfileResponse.setExperience(candidate.getExperience());
                return ResponseEntity.ok(candidateProfileResponse);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Người dùng không tồn tại");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi");
        }
    }
}

