    package com.pth.jobapp.controller;
    
    import com.pth.jobapp.ResponseModels.CandidateApplicationResponse;
    import com.pth.jobapp.ResponseModels.CandidateProfileResponse;
    import com.pth.jobapp.entity.Application;
    import com.pth.jobapp.entity.Candidate;
    import com.pth.jobapp.entity.Job;
    import com.pth.jobapp.service.ApplicationService;
    import com.pth.jobapp.service.CandidateService;
    import com.pth.jobapp.service.CategoryService;
    import com.pth.jobapp.service.JwtService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    
    import java.util.Date;
    import java.util.Optional;
    import java.util.UUID;
    
    @CrossOrigin("http://127.0.0.1:5173")
    @RestController
    @RequestMapping("/api/candidates")
    public class CandidateController {
        @Autowired
        private CandidateService candidateService;
        @Autowired
        private ApplicationService applicationService;
        @Autowired
        private  JwtService jwtService;
    
    
        @PostMapping("/apply")
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
        @PutMapping("/update")
        public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Candidate candidate) {
    
            try {
                String candidateEmail = jwtService.extractUsername(token.substring(7));
                Optional<Candidate> existingJob = candidateService.findCandidateByAccountUsername(candidateEmail);// Remove "Bearer " prefix from token
                Candidate updateCandidate= existingJob.get();
                updateCandidate.setDateOfBirth(candidate.getDateOfBirth());
                updateCandidate.setAvatar(candidate.getAvatar());
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

        @GetMapping("/profile")
        public ResponseEntity<CandidateProfileResponse> getCandidateProfile(@RequestHeader("Authorization") String tokenHeader) {
            try {
                String token = tokenHeader.replace("Bearer ", ""); // Loại bỏ tiền tố "Bearer "
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

                    return ResponseEntity.ok(candidateProfileResponse);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Trả về 404 NOT FOUND nếu không tìm thấy ứng viên
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Trả về lỗi máy chủ nếu có lỗi xảy ra
            }
        }
    }
    
