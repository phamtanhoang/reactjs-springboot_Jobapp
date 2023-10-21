package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.ApplicationResponse;
import com.pth.jobapp.ResponseModels.EmployerProfileResponse;
import com.pth.jobapp.ResponseModels.VipResponse;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/employers")
public class EmployerController {

    @Autowired
    private JobService jobService;
    @Autowired
    private EmployerService employerService; // Assuming you have an EmployerService

    @Autowired
    private JwtService jwtService; // Assuming you have a JwtService to handle JWT operations

    @Autowired CategoryService categoryService;

    @Autowired EmployerVipService employerVipService;

    @Autowired VipService vipService;

    @Autowired AccountService accountService;
    @GetMapping("/profile")
    public ResponseEntity<?> getAccountFromToken(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.substring(7);
            String username = jwtService.extractUsername(token);
            System.out.println(username);

            Employer employer = employerService.findByAccountUsername(username);

            if (employer != null) {
                EmployerProfileResponse employerProfileResponse = new EmployerProfileResponse();
                employerProfileResponse.setUsername(username);
                employerProfileResponse.setName(employer.getName());
                employerProfileResponse.setAddress(employer.getAddress());
                employerProfileResponse.setEmployerId(employer.getId());
                employerProfileResponse.setBanner(employer.getBanner());
                employerProfileResponse.setDescription(employer.getDescription());
                employerProfileResponse.setImage(employer.getImage());

                return ResponseEntity.ok(employerProfileResponse);
            } else {
                System.out.println("Người dùng không tồn tại");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Người dùng không tồn tại");
            }
        } catch (Exception e) {
            System.out.println("Lỗi");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi");
        }
    }


    @PutMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestHeader("Authorization") String token, @RequestBody Employer employer) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Employer employer1 = employerService.findByAccountUsername(email);
            employer1.setAddress(employer.getAddress());
            employer1.setDescription(employer1.getDescription());
            employer1.setName(employer.getName());
            employerService.save(employer1);

            return ResponseEntity.ok("Candidate profile updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate profile");
        }
    }



    @GetMapping("/jobs")
    public ResponseEntity<Job> EmployerJobById(
            @RequestHeader("Authorization") String token,
            @RequestParam String jobId
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

        @GetMapping("/jobDetails")
        public ResponseEntity<?> getJobDetails(
                @RequestHeader("Authorization") String token,
                @RequestParam String jobId
        ) {
            try {
                String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
                Employer employer = employerService.findByAccountUsername(employerName);

                if (employer != null) {
                    Optional<Job> jobOptional = jobService.findJobByEmployerIdAndId(employer.getId(), jobId);
                    if (jobOptional.isPresent()) {

                        return ResponseEntity.ok(jobOptional);
                    } else {
                        return ResponseEntity.badRequest().body("Không tìm thấy công việc.");
                    }
                } else {
                    return ResponseEntity.badRequest().body("Không tìm thấy nhà tuyển dụng.");
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    @PutMapping("/updateImage")
    public ResponseEntity<String> updateImage(@RequestHeader("Authorization") String token, @RequestBody MultipartFile image) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(email);
            employerService.saveWithImage(employer,image);

            return ResponseEntity.ok("Candidate image updated successfully");
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
        }
    }

    @PutMapping("/updateBanner")
    public ResponseEntity<String> updateBanner(@RequestHeader("Authorization") String token, @RequestBody MultipartFile banner) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Employer employer = employerService.findByAccountUsername(email);
            employerService.saveWithBanner(employer,banner);

            return ResponseEntity.ok("Candidate image updated successfully");
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
        }
    }

    @GetMapping("/vipHistories")
    public ResponseEntity<?> EmployerVipsById(
            @RequestHeader("Authorization") String token,@PageableDefault(page = 0, size = 10) Pageable pageable
    ) {
        try {
            String employerUserName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerUserName); // Assuming you have a method to find an employer by username

            if (employer != null) {
               Page<EmployerVip> employerVipPage = employerVipService.findByEmployerId(employer.getId(),pageable);
               if(employerVipPage==null)
                   return ResponseEntity.badRequest().body("You haven't upgrade your account yet!");
                Page<VipResponse> vipResponses = employerVipPage.map(employerVip -> {
                    VipResponse dto = new VipResponse();
                    dto.setEmployerVipId(employerVip.getId());
                    dto.setEmployerId(employerVip.getId());
                    dto.setVipId(employerVip.getVipId());
                    dto.setFromDate(employerVip.getFromDate());
                    dto.setToDate(employerVip.getToDate());
                    dto.setPrice(employerVip.getPrice());
                    dto.setEmployerUsername(employerUserName);
                    dto.setEmployerName(employer.getName());
                    dto.setVipName(vipService.findById(employerVip.getVipId()).get().getName());
                    dto.setImage(employer.getImage());
                    return dto;
                });
                    return ResponseEntity.ok(vipResponses);


            } else {
                return ResponseEntity.badRequest().body("Can't find this employer");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }

    @GetMapping("/vips")
    public ResponseEntity<?> getVips(@RequestHeader("Authorization") String token) {
        try {
            String employerName = jwtService.extractUsername(token.substring(7)); // Remove "Bearer " prefix from token
            Employer employer = employerService.findByAccountUsername(employerName); // Assuming you have a method to find an employer by username

            if (employer != null) {
                List<Vip> vips = vipService.findAllByState("active");


                return ResponseEntity.ok(vips);


            } else {
                return ResponseEntity.badRequest().body("Can't find this employer");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR!");
        }
    }


}













