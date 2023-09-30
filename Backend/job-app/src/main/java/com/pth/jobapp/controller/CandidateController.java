package com.pth.jobapp.controller;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import com.pth.jobapp.ResponseModels.CandidateProfileResponse;
import com.pth.jobapp.entity.Application;
import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.requestmodels.ExperienceUpdateRequest;
import com.pth.jobapp.requestmodels.ImageUrlRequest;
import com.pth.jobapp.requestmodels.SkillUpdateRequest;
import com.pth.jobapp.service.ApplicationService;
import com.pth.jobapp.service.CandidateService;
import com.pth.jobapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
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
    private ServletContext servletContext;
    @Autowired
    private  ResourceLoader resourceLoader;

    @PostMapping("/apply")
    public ResponseEntity<String> applyJob(
            @RequestHeader("Authorization") String tokenHeader,
            @RequestPart("cVFile") MultipartFile cVFile,
            @RequestPart("application") Application application
    ) {
        try {
            String candidateEmail = jwtService.extractUsername(tokenHeader.substring(7));
            Candidate candidate = candidateService.findCandidateByAccountUsername(candidateEmail).orElse(null);
            if(applicationService.findByJobIdAndCandidateId(application.getJobId(),candidate.getId())==null) {
                if (!cVFile.isEmpty()) {
                    if (!cVFile.getContentType().equals("application/pdf")) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Only PDF files are allowed");
                    }

                    byte[] cvBytes = cVFile.getBytes();

                    String projectPath = System.getProperty("user.dir").replace("Backend", "Frontend") + "/src/assets/cv";
                    String cvFileName = UUID.randomUUID() + ".pdf";
                    Path cvPath = Paths.get(projectPath, cvFileName);

                    try (OutputStream os = Files.newOutputStream(cvPath)) {
                        os.write(cvBytes);
                        System.out.println("Thành công");
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.out.println("Không thành công");
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save CV file");
                    }

                    UUID uuid = UUID.randomUUID();
                    application.setId(uuid.toString());
                    application.setCandidateId(candidate.getId());
                    application.setApplyDate(new Date());
                    application.setState("pending");
                    application.setCV(cvFileName);
                    applicationService.save(application);
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CV file is empty");
                }
            }
            else
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already applied");

            return ResponseEntity.status(HttpStatus.OK).body("Applied for the job successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to apply for the job");
        }
    }


    @PutMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Candidate candidate) {

        try {
            String candidateEmail = jwtService.extractUsername(token.substring(7));
            Optional<Candidate> existingCandidate = candidateService.findCandidateByAccountUsername(candidateEmail);// Remove "Bearer " prefix from token
            Candidate updateCandidate= existingCandidate.get();
            System.out.println(updateCandidate.getAccountId());
            updateCandidate.setDateOfBirth(candidate.getDateOfBirth());
            updateCandidate.setFirstName(candidate.getFirstName());
            updateCandidate.setLastName(candidate.getLastName());
            updateCandidate.setSex(candidate.getSex());
            candidateService.save(updateCandidate);

            return ResponseEntity.ok("Candidate profile updated successfully");
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate profile");
        }
    }

        @PutMapping("/updateImage")
        public ResponseEntity<String> updateImage(@RequestHeader("Authorization") String token, @RequestBody ImageUrlRequest imageUrlRequest) {

            try {
                String candidateEmail = jwtService.extractUsername(token.substring(7));
                Optional<Candidate> existingJob = candidateService.findCandidateByAccountUsername(candidateEmail);
                Candidate updateCandidate= existingJob.get();
                updateCandidate.setAvatar(imageUrlRequest.getUrl());
                candidateService.save(updateCandidate);

                return ResponseEntity.ok("Candidate image updated successfully");
            } catch (Exception e) {
                // Handle the exception and return an appropriate response
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
            }
        }

    @GetMapping("/profile")
    public ResponseEntity<?> getAccountFromToken(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.substring(7);
            String username = jwtService.extractUsername(token);
            System.out.println(username);

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
//                System.out.println(candidateProfileResponse.getSkill());
                System.out.println(candidate);
                return ResponseEntity.ok(candidateProfileResponse);
            } else {
                System.out.println("Người dùng không tồn tại");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Người dùng không tồn tại");
            }
        } catch (Exception e) {
            System.out.println("Lỗi");
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
            // Handle the exception and return an appropriate response
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
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
        }
    }


}

