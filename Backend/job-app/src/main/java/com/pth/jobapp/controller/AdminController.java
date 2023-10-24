package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.*;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.requestmodels.*;
import com.pth.jobapp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private BlogService blogService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private AccountInfoService accountInfoService;
    @Autowired
    AccountService accountService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    JobService jobService;
    @Autowired
    ApplicationService applicationService;
    @Autowired
    CategoryService categoryService;
    @Autowired
    CandidateService candidateService;
    @Autowired
    EmployerService employerService;
    @Autowired
    VipService vipService;
    @Autowired
    EmployerVipService employerVipService;




    //---------------------------AdminLogin------------------------------------------------//
    @PostMapping("/login")
    public ResponseEntity<String> adminAuthentication(@RequestBody AuthRequest authRequest) {
        try {

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

            if (authentication.isAuthenticated()) {
                Account account = accountService.findByUsername(authentication.getName());

                if ("admin".equals(account.getRole()) && "active".equals(account.getState())) {
                    String token = jwtService.generateToken(authRequest.getUsername(), authRequest.getState());

                    return ResponseEntity.ok(token);
                } else {
                    throw new UsernameNotFoundException("Invalid user request!");
                }
            } else {
                throw new UsernameNotFoundException("Invalid user request!");
            }
        } catch (AuthenticationException e) {
            System.err.println("Authentication error: " + e.getMessage());
            throw new UsernameNotFoundException("Invalid user request!");

        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String tokenHeader,@RequestParam String accountId, @RequestBody ChangePasswordRequest changePasswordRequest) {
        try {
            String email = jwtService.extractUsername(tokenHeader.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Account newAccount = accountService.findById(accountId).get();


            newAccount.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        accountService.save(newAccount);
        return ResponseEntity.ok("Change password successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR!!");
        }
    }

    //---------------------------AdminLogin------------------------------------------------//


    //---------------------------Job------------------------------------------------//

    @GetMapping("/jobs")
    public ResponseEntity<?> getJobsByTitleAndCategoryId(@RequestHeader("Authorization") String token, @RequestParam String title, @RequestParam String categoryId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Page<Job> jobs = jobService.findByTitleContainingAndCategoryId(title, categoryId, pageable);

            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR!");
        }
    }

    @GetMapping("/jobCount")
    public ResponseEntity<?> getjobCount(@RequestHeader("Authorization") String token  ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            return ResponseEntity.ok(jobService.countAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR!");
        }
    }
    @GetMapping("/employerCount")
    public ResponseEntity<?> getEmployerCount(@RequestHeader("Authorization") String token  ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            return ResponseEntity.ok(employerService.countAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR!");
        }
    }
    @GetMapping("/blogCount")
    public ResponseEntity<?> getBlogCount(@RequestHeader("Authorization") String token  ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            return ResponseEntity.ok(blogService.countAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR!");
        }
    }

    @GetMapping("/newestJobs")
    public ResponseEntity<?> getNewestJobs(@RequestHeader("Authorization") String token, @RequestParam String title, @RequestParam String categoryId, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Page<Job> jobs = jobService.findByTitleContainingAndCategoryId(title, categoryId, pageable);

            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR!");
        }
    }

    @GetMapping("/pendingJobs")
    public ResponseEntity<?> getPendingJob(@RequestHeader("Authorization") String token, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Page<Job> jobs = jobService.findByState("pending", pageable);

            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR!");
        }
    }
    @GetMapping("/job/details")
    public ResponseEntity<?> getJobDetails(
            @RequestHeader("Authorization") String token,
            @RequestParam String jobId
    ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Optional<Job> jobOptional = jobService.findById(jobId);
            if (jobOptional.isPresent()) {
                Job job = jobOptional.get();
                Optional<Employer> employerOptional = employerService.findById(job.getEmployerId());
                Optional<Category> categoryOptional = categoryService.findById(job.getCategoryId());

                if (employerOptional.isPresent() && categoryOptional.isPresent()) {
                    Employer employer = employerOptional.get();
                    Category category = categoryOptional.get();

                    JobDetailsResponse jobDetailsResponse = new JobDetailsResponse();
                    jobDetailsResponse.setState(job.getState());
                    jobDetailsResponse.setTitle(job.getTitle());
                    jobDetailsResponse.setSalary(job.getSalary());
                    jobDetailsResponse.setToDate(job.getToDate());
                    jobDetailsResponse.setCategoryName(category.getName());
                    jobDetailsResponse.setEmployerName(employer.getName());
                    jobDetailsResponse.setDescription(job.getDescription());
                    jobDetailsResponse.setAddress(job.getAddress());
                    jobDetailsResponse.setFromDate(job.getFromDate());

                    return ResponseEntity.ok(jobDetailsResponse);
                } else {
                    return ResponseEntity.badRequest().body("Can't find employer or category!");
                }
            } else {
                return ResponseEntity.badRequest().body("ERROR!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/job/create")
    public ResponseEntity<String> createJob(@RequestHeader("Authorization") String token, @RequestBody Job job) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            job.setFromDate(new Date());
            job.setId(UUID.randomUUID().toString());
            job.setState("active");
            jobService.save(job);
            return ResponseEntity.ok("Add new job successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }

    @PutMapping("/job/update")
    public ResponseEntity<String> updateJob(@RequestHeader("Authorization") String token, @RequestParam String jobId, @RequestBody Job updatedJob) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Job> existingJob = jobService.findById(jobId);
            if (existingJob.isPresent()) {
                Job job = existingJob.get();

                job.setFromDate(new Date());
                job.setTitle(updatedJob.getTitle());
                job.setDescription(updatedJob.getDescription());
                job.setSalary(updatedJob.getSalary());
                job.setToDate(updatedJob.getToDate());
                job.setAddress(updatedJob.getAddress());
                job.setCategoryId(updatedJob.getCategoryId());
                job.setEmployerId(updatedJob.getEmployerId());
                job.setState(updatedJob.getState());
                job.setFromDate(updatedJob.getFromDate());
                jobService.save(job);
                return ResponseEntity.ok("Job updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The job with ID " + jobId + " was not found.");

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }



    @DeleteMapping("/job/delete")
    public ResponseEntity<String> deleteJob(@RequestHeader("Authorization") String token, @RequestParam String jobId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Job> existingJob = jobService.findById(jobId);
            if (existingJob.isPresent()) {
                Job job = existingJob.get();
                List<Application> applications = applicationService.findApplicationsByJobId(jobId);
                for (Application application : applications) {
                    applicationService.delete(application);
                }
                jobService.delete(job);
                return ResponseEntity.ok("Job deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    //---------------------------Job------------------------------------------------//


    //---------------------------Category------------------------------------------------//

    @GetMapping("/categories")
    public ResponseEntity<?> getCategoriesByNameContaining(@RequestHeader("Authorization") String token, @RequestParam String name, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Page<Category> categories = categoryService.findByName(name, pageable);

            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @PostMapping("/category/create")
    public ResponseEntity<String> createCategory(@RequestHeader("Authorization") String token, @RequestBody Category category) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            category.setId(UUID.randomUUID().toString());

            categoryService.save(category);
            return ResponseEntity.ok("Add new category successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }

    @PutMapping("/category/update")
    public ResponseEntity<String> updateCategory(@RequestHeader("Authorization") String token, @RequestParam String categoryId, @RequestBody Category updateCategory) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Category> existingCategory = categoryService.findById(categoryId);
            if (existingCategory.isPresent()) {
                Category category = existingCategory.get();
                category.setName(updateCategory.getName());
                categoryService.save(category);
                return ResponseEntity.ok("Category updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The category with ID " + categoryId + " was not found.");

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @DeleteMapping("/category/delete")
    public ResponseEntity<String> deleteCategory(@RequestHeader("Authorization") String token, @RequestParam String categoryId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Category> existingCategory = categoryService.findById(categoryId);
            if (existingCategory.isPresent()) {
                Category category = existingCategory.get();
                List<Job> jobs = jobService.findByCategoryIdWithList(categoryId);
                for (Job job : jobs) {
                    job.setCategoryId("6");
                    jobService.save(job);
                }
                categoryService.deleteById(category.getId());
                return ResponseEntity.ok("Category deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    //---------------------------Category------------------------------------------------//


    //---------------------------Candidates------------------------------------------------//

    @GetMapping("/candidates")
    public ResponseEntity<?> getCandidatesByNameContaining(@RequestHeader("Authorization") String token, @RequestParam String keyword, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Page<Candidate> candidates = candidateService.findCandidatesByKeyword(keyword, pageable);

            Page<CandidateProfileResponse> candidateProfiles = candidates
                    .map(candidate -> {
                        Account candidateAccount = accountService.findById(candidate.getAccountId()).get();
                        CandidateProfileResponse profile = new CandidateProfileResponse();
                        profile.setUsername(candidateAccount.getUsername());
                        profile.setLastName(candidate.getLastName());
                        profile.setFirstName(candidate.getFirstName());
                        profile.setSex(candidate.getSex());
                        profile.setAvatar(candidate.getAvatar());
                        profile.setDateOfBirth(candidate.getDateOfBirth());
                        profile.setSkill(candidate.getSkill());
                        profile.setExperience(candidate.getExperience());
                        profile.setCandidateId(candidate.getId());
                        profile.setAccountId(accountService.findById(candidate.getAccountId()).get().getId());
                        profile.setState(accountService.findById(candidate.getAccountId()).get().getState());
                        return profile;
                    });

            return ResponseEntity.ok(candidateProfiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @PostMapping("/candidate/create")
    public ResponseEntity<?> addNewCandidate(@RequestHeader("Authorization") String token, @RequestBody CandidateRegistrationRequest candidateRegistrationRequest) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            if (accountService.findByUsername(candidateRegistrationRequest.getUsername()) == null) {
                UUID uuid = UUID.randomUUID();

                Account candidateAccount = new Account();
                candidateAccount.setId(uuid.toString());
                candidateAccount.setUsername(candidateRegistrationRequest.getUsername());
                candidateAccount.setPassword(candidateRegistrationRequest.getPassword());
                candidateAccount.setRole("candidate");
                candidateAccount.setState("active");
                candidateAccount.setCreateAt(new Date());
                accountInfoService.addUser(candidateAccount);

                UUID id = UUID.randomUUID();
                Candidate candidate = new Candidate();
                candidate.setId(id.toString());
                candidate.setFirstName(candidateRegistrationRequest.getFirstName());
                candidate.setLastName(candidateRegistrationRequest.getLastName());
                candidate.setAvatar(candidateRegistrationRequest.getAvatar());
                candidate.setDateOfBirth(candidateRegistrationRequest.getDateOfBirth());
                candidate.setSex(candidateRegistrationRequest.getSex());
                candidate.setAccountId(uuid.toString());
                candidateService.save(candidate);

                return ResponseEntity.status(HttpStatus.OK).body("Candidate created successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Candidate with the given username already exists.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }

    @PutMapping("/candidate/update")
    public ResponseEntity<?> updateCandidate(@RequestHeader("Authorization") String token, @RequestParam String candidateId, @RequestPart AdminCandidateUpdateRequest candidate, @RequestPart(required = false)MultipartFile avatar ){

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account adminAccount = accountService.findByUsername(email);

            if (adminAccount == null || !"admin".equals(adminAccount.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Candidate> existingCandidate = candidateService.findById(candidateId);
            if (existingCandidate.isPresent()) {
                Candidate updateCandidate= existingCandidate.get();
                updateCandidate.setDateOfBirth(candidate.getDateOfBirth());
                updateCandidate.setFirstName(candidate.getFirstName());
                updateCandidate.setLastName(candidate.getLastName());
                updateCandidate.setSex(candidate.getSex());
                updateCandidate.setExperience(candidate.getExperience());
                updateCandidate.setSkill(candidate.getSkill());
                Account account = accountService.findById(updateCandidate.getAccountId()).get();
                account.setState(candidate.getState());
                if (avatar != null) {
                    candidateService.saveWithImage(updateCandidate,avatar);
                }

                candidateService.save(updateCandidate);
                return ResponseEntity.ok("Candidate updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The category with ID " + candidateId + " was not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }



    @PutMapping("candidate/updateState")
    public ResponseEntity<?> updateCandidateState(@RequestHeader("Authorization") String token, @RequestParam String candidateId, @RequestParam String state) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || !"admin".equals(account.getRole()))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");

            Account candidateAccount = accountService.findById(candidateId).orElse(null);
            if (candidateAccount == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Can't find candidate with ID " + candidateId);

            candidateAccount.setState(state);
            accountService.save(candidateAccount);
            return ResponseEntity.ok("Update candidate's state successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }

    @DeleteMapping("/candidate/delete")
    public ResponseEntity<?> deleteCandidate(@RequestHeader("Authorization") String token, @RequestParam String candidateId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Candidate> existingCandidate = candidateService.findById(candidateId);
            if (existingCandidate.isPresent()) {

                List<Application> applications = applicationService.findApplicationsByCandidateId(candidateId);
                for (Application application : applications) {
                    applicationService.delete(application);
                }
                candidateService.deleteById(candidateId);
                accountService.deleteById(existingCandidate.get().getAccountId());
                return ResponseEntity.ok("Candidate deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Candidate not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    //---------------------------Candidates------------------------------------------------//


    //---------------------------Employers------------------------------------------------//

    @GetMapping("/employers")
    public ResponseEntity<?> getEmployerByNameContaining(@RequestHeader("Authorization") String token, @RequestParam String name, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Page<Employer> employers = employerService.findByNameContaining(name, pageable);

            Page<EmployerProfileResponse> employerProfiles = employers
                    .map(employer -> {
                        Account employerAccount = accountService.findById(employer.getAccountId()).get();
                        EmployerProfileResponse profile = new EmployerProfileResponse();
                        profile.setUsername(employerAccount.getUsername());
                        profile.setName(employer.getName());
                        profile.setAddress(employer.getAddress());
                        profile.setEmployerId(employer.getId());
                        profile.setBanner(employer.getBanner());
                        profile.setDescription(employer.getDescription());
                        profile.setImage(employer.getImage());
                        profile.setState(employerAccount.getState());
                        profile.setAccountId(employerAccount.getId());
                        profile.setState(employerAccount.getState());
                        return profile;
                    });

            return ResponseEntity.ok(employerProfiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }
    @GetMapping("/pendingEmployers")
    public ResponseEntity<?> getpendingEmployers(@RequestHeader("Authorization") String token, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Page<Employer> employers = employerService.findByState("pending", pageable);

            Page<EmployerProfileResponse> employerProfiles = employers
                    .map(employer -> {
                        Account employerAccount = accountService.findById(employer.getAccountId()).get();
                        EmployerProfileResponse profile = new EmployerProfileResponse();
                        profile.setUsername(employerAccount.getUsername());
                        profile.setName(employer.getName());
                        profile.setAddress(employer.getAddress());
                        profile.setEmployerId(employer.getId());
                        profile.setBanner(employer.getBanner());
                        profile.setDescription(employer.getDescription());
                        profile.setImage(employer.getImage());
                        profile.setState(employerAccount.getState());
                        profile.setAccountId(employerAccount.getId());
                        profile.setState(employerAccount.getState());
                        return profile;
                    });

            return ResponseEntity.ok(employerProfiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }


    @PostMapping("/employer/create")
    public ResponseEntity<?> addNewEmployer(@RequestHeader("Authorization") String token, @RequestBody EmployerRegistrationRequest employerRegistrationRequest) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            if (accountService.findByUsername(employerRegistrationRequest.getUsername()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The username is already exists!");
            }

            UUID uuid = UUID.randomUUID();
            Account employerAccount = new Account();
            employerAccount.setId(uuid.toString());
            employerAccount.setUsername(employerRegistrationRequest.getUsername());
            employerAccount.setPassword(employerRegistrationRequest.getPassword());
            employerAccount.setRole("employer");
            employerAccount.setState("active");
            employerAccount.setCreateAt(new Date());

            accountInfoService.addUser(employerAccount);

            UUID id = UUID.randomUUID();
            Employer employer = new Employer();
            employer.setId(id.toString());
            employer.setName(employerRegistrationRequest.getName());
            employer.setAddress(employerRegistrationRequest.getAddress());
            employer.setDescription(employerRegistrationRequest.getDescription());
            employer.setAccountId(uuid.toString());
            employerService.save(employer);

            return ResponseEntity.ok("Add new employer successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }

    @PutMapping("/employer/update")
    public ResponseEntity<String> updateEmployer(@RequestHeader("Authorization") String token, @RequestParam String employerId, @RequestPart AdminEmployerUpdateRequest employer,@RequestPart(required=false)MultipartFile image,@RequestPart(required = false) MultipartFile banner) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account adminAccount = accountService.findByUsername(email);

            if (adminAccount == null || !"admin".equals(adminAccount.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }

            Employer updateEmployer = employerService.findById(employerId).orElse(null);

            if (updateEmployer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Can't find employer with ID " + employerId);
            }
            Account account = accountService.findById(updateEmployer.getAccountId()).get();
            updateEmployer.setAddress(employer.getAddress());
            updateEmployer.setDescription(employer.getDescription());
            updateEmployer.setName(employer.getName());

            account.setState(employer.getState());
            if (image != null) {
                employerService.saveWithImage(employerService.findById(employerId).get(), image);
            }
            if (banner != null) {
                employerService.saveWithBanner(employerService.findById(employerId).get(), banner);
            }

            employerService.save(updateEmployer);

            return ResponseEntity.ok("Update employer successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }



    @PutMapping("/employer/updateState")
    public ResponseEntity<?> updateEmployerState(@RequestHeader("Authorization") String token, @RequestParam String employerId, @RequestParam String state) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || !"admin".equals(account.getRole()))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");

            Account candidateAccount = accountService.findById(employerId).orElse(null);
            if (candidateAccount == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Can't find employer with Id " + employerId);

            candidateAccount.setState(state);
            accountService.save(candidateAccount);
            return ResponseEntity.ok("Update employer's state successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR");
        }
    }

    @DeleteMapping("/employer/delete")
    public ResponseEntity<String> deleteEmployer(@RequestHeader("Authorization") String token, @RequestParam String employerId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Employer> existingEmployer = employerService.findById(employerId);
            if (existingEmployer.isPresent()) {
                Employer employer = existingEmployer.get();
                List<Job> jobs = jobService.findByEmployerIdWithList(employerId);
                for (Job job : jobs) {
                    List<Application> applications = applicationService.findApplicationsByJobId(job.getId());
                    for (Application application : applications) {
                        applicationService.delete(application);
                    }
                    jobService.delete(job);
                }

                employerService.deleteById(employerId);
                accountService.deleteById(employer.getAccountId());
                return ResponseEntity.ok("Employer deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employer not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    //---------------------------Employers------------------------------------------------//



    //---------------------------Applications------------------------------------------------//

    @GetMapping("/applications")
    public ResponseEntity<?> employerApplications(
            @PageableDefault(page = 0, size = 10) Pageable pageable,
            @RequestHeader("Authorization") String token,
            @RequestParam("username") String email
    ) {
        try {
            String adminEmail = jwtService.extractUsername(token.substring(7));
            Account adminAccount = accountService.findByUsername(adminEmail);

            if (adminAccount == null || !"admin".equals(adminAccount.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Page<Application> applications = applicationService.findAllByUserNameContaining(email, pageable);
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
                dto.setEmployerId(jobService.findById(application.getJobId()).get().getEmployerId());

                dto.setEmployerName(employerService.findById(jobService.findById(application.getJobId()).get().getEmployerId()).get().getName());
                return dto;
            });
            return ResponseEntity.ok(employerApplications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Page.empty());
        }
    }

    @GetMapping("/application/details")
    public ResponseEntity<?> getApplicationDetails(
            @RequestHeader("Authorization") String token,
            @RequestParam String applicationId
    ) {
        try {
            String adminEmail = jwtService.extractUsername(token.substring(7));
            Account adminAccount = accountService.findByUsername(adminEmail);

            if (adminAccount == null || !"admin".equals(adminAccount.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
                Optional<Application> applicationOptional = applicationService.findById(applicationId);
                if (applicationOptional.isEmpty())
                    return ResponseEntity.badRequest().body("Can't find application with ID: "+ applicationId);
                Application application = applicationOptional.get();
                return ResponseEntity.ok(application);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/application/delete")
    public ResponseEntity<String> deleteApplication(@RequestHeader("Authorization") String token, @RequestParam String applicationId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Application> existingApplication = applicationService.findById(applicationId);
            if (existingApplication.isPresent()) {
                Application application = existingApplication.get();


                applicationService.delete(application);
                return ResponseEntity.ok("Application deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Application not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");

        }
    }


    //---------------------------Applications------------------------------------------------//




    //---------------------------EmployerVip------------------------------------------------//

    @GetMapping("/employerVips")
    public ResponseEntity<?> getEmployerVips(@RequestHeader("Authorization") String token, @RequestParam String name, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }

            Page<EmployerVip> employerVips = employerVipService.findByEmployerNameContaining(name, pageable);

            return ResponseEntity.ok(employerVips);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Add new VIP error!");
        }
    }

    @GetMapping("/employerVip/revenue")
    public ResponseEntity<?>getViprevenue(@RequestHeader("Authorization")String token){
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }
        return ResponseEntity.ok(employerVipService.sumPrice());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }
    @PostMapping("/employerVip/create")
    public ResponseEntity<String> createEmployerVip(@RequestHeader("Authorization") String token, @RequestBody EmployerVip employerVip) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            employerVip.setId(UUID.randomUUID().toString());
            Vip vip = vipService.findById(employerVip.getVipId()).get();
            employerVip.setFromDate(new Date());
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.MONTH, vip.getAmount());
            Date toDate = calendar.getTime();
            employerVip.setToDate(toDate);
            employerVip.setPrice(vip.getPrice());
            employerVipService.save(employerVip);
            return ResponseEntity.ok("Add new Vip employer successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR.");
        }
    }

    @PutMapping("/employerVip/update")
    public ResponseEntity<String> updateEmployerVip(@RequestHeader("Authorization") String token, @RequestParam String employerVipId, @RequestBody EmployerVip updateEmployer) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }
            Optional<Vip> vipOptional = vipService.findById(updateEmployer.getVipId());
            if (vipOptional.isPresent()) {
                Vip vip = vipOptional.get();
                updateEmployer.setId(employerVipId);
                updateEmployer.setFromDate(new Date());
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new Date());
                calendar.add(Calendar.MONTH, vip.getAmount());
                Date toDate = calendar.getTime();
                updateEmployer.setToDate(toDate);
                updateEmployer.setPrice(vip.getPrice());
                employerVipService.save(updateEmployer);
                return ResponseEntity.ok("Vip updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The Vip employer with ID " + employerVipId + " was not found.");

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @DeleteMapping("/employerVip/delete")
    public ResponseEntity<String> deleteEmployerVip(@RequestHeader("Authorization") String token, @RequestParam String employerVipId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }
            Optional<EmployerVip> existingEmployerVip = employerVipService.findById(employerVipId);
            if (existingEmployerVip.isPresent()) {

                employerVipService.delete(employerVipId);
                return ResponseEntity.ok("Vip employer deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vip employer not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    //---------------------------EmployerVip------------------------------------------------//




    //---------------------------VIP------------------------------------------------//

    @GetMapping("/vips")
    public ResponseEntity<?> getVipsByNameContaining(@RequestHeader("Authorization") String token, @RequestParam String name, @PageableDefault(page = 0, size = 10) Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }

            Page<Vip> vips = vipService.findByNameContaining(name, pageable);

            return ResponseEntity.ok(vips);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Add new VIP error!");
        }
    }

    @PostMapping("/vip/create")
    public ResponseEntity<String> createVip(@RequestHeader("Authorization") String token, @RequestBody Vip vip) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            vip.setId(UUID.randomUUID().toString());

            vipService.save(vip);
            return ResponseEntity.ok("Add new VIP successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR.");
        }
    }

    @PutMapping("/vip/update")
    public ResponseEntity<String> updateVip(@RequestHeader("Authorization") String token, @RequestParam String vipId, @RequestBody Vip updateVip) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }
            Optional<Vip> vipOptional = vipService.findById(vipId);
            if (vipOptional.isPresent()) {
                Vip vip = vipOptional.get();
                updateVip.setId((vip.getId()));
                vipService.save(updateVip);
                return ResponseEntity.ok("Vip updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The Vip with ID " + vipId + " was not found.");

            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    @DeleteMapping("/vip/delete")
    public ResponseEntity<String> deleteVip(@RequestHeader("Authorization") String token, @RequestParam String vipId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }
            Optional<Vip> existingVip = vipService.findById(vipId);
            if (existingVip.isPresent()) {

                vipService.delete(vipId);
                return ResponseEntity.ok("Vip deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vip not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
        }
    }

    //---------------------------VIP------------------------------------------------//


    //---------------------------Blog------------------------------------------------//

    @GetMapping("/blogs")
    public ResponseEntity<?>getBlogs(@RequestHeader("Authorization")String token, @RequestParam String title,
                                     @PageableDefault(page = 0, size = 10) Pageable pageable){
        try{
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }

            Page<Blog> blogs= blogService.findAllByTitleContainingAndStateOrderByCreatedAtDesc(title,"",pageable);
            Page<BlogResponse> blogResponses = blogs.map(blog -> {
                BlogResponse dto = new BlogResponse();
                dto.setBlogId(blog.getId());
                dto.setAccountId(blog.getAccountId());
                dto.setTitle(blog.getTitle());
                dto.setBlogImage(blog.getImage());
                dto.setName("admin");
                dto.setUserImage("https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg");
                dto.setContent(blog.getContent());
                dto.setCreatedAt(blog.getCreatedAt());
                dto.setState(blog.getState());
                dto.setAccountUserName(accountService.findById(blog.getAccountId()).get().getUsername());
                return dto;
            });
            return ResponseEntity.ok(blogResponses);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(("An eror occurred"));
        }

    }
    @GetMapping("/newestBlogs")
    public ResponseEntity<?>getnewestBlogs(@RequestHeader("Authorization")String token, @PageableDefault(page = 0, size = 10) Pageable pageable){
        try{
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required.");
            }
            Page<Blog> blogs= blogService.findAllByTitleContainingAndStateOrderByCreatedAtDesc("","",pageable);
            Page<BlogResponse> blogResponses = blogs.map(blog -> {
                BlogResponse dto = new BlogResponse();
                dto.setBlogId(blog.getId());
                dto.setAccountId(blog.getAccountId());
                dto.setTitle(blog.getTitle());
                dto.setBlogImage(blog.getImage());
                dto.setName("admin");
                dto.setUserImage("https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg");
                dto.setContent(blog.getContent());
                dto.setCreatedAt(blog.getCreatedAt());
                dto.setState(blog.getState());
                dto.setAccountUserName(accountService.findById(blog.getAccountId()).get().getUsername());
                return dto;
            });
            return ResponseEntity.ok(blogResponses);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(("An eror occurred"));
        }

    }
    @GetMapping("/blog/details")
    public ResponseEntity<?> getBlogDetails(
            @RequestHeader("Authorization") String token,
            @RequestParam String blogId
    ) {
        try {
            String adminEmail = jwtService.extractUsername(token.substring(7));
            Account adminAccount = accountService.findByUsername(adminEmail);

            if (adminAccount == null || !"admin".equals(adminAccount.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization required!");
            }
            Optional<Blog> blogOptional = blogService.findById(blogId);
            if (blogOptional.isEmpty())
                return ResponseEntity.badRequest().body("Can't find blog with ID: "+ blogId);
            Blog blog = blogOptional.get();
            BlogResponse dto = new BlogResponse();
            dto.setBlogId(blog.getId());
            dto.setAccountId(blog.getAccountId());
            dto.setTitle(blog.getTitle());
            dto.setBlogImage(blog.getImage());
            dto.setContent(blog.getContent());

            if(accountService.findById(blog.getAccountId()).get().getRole().equals("admin"))
            {
                dto.setUserImage("https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg");
                dto.setName("admin");
            }
            else
            {
                dto.setName(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getName());
                dto.setUserImage(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getImage());

            }
            dto.setCreatedAt(blog.getCreatedAt());
            dto.setState(blog.getState());
            dto.setAccountUserName(accountService.findById(blog.getAccountId()).get().getUsername());
            return ResponseEntity.ok(dto);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/comments")
    public ResponseEntity<?>getComments(@RequestParam String blogId,Pageable pageable) {
        try {

            Page<Comment> comments = commentService.findByBlogId(blogId, pageable);

            Page<CommentResponse> commentResponses = comments.map(comment -> {
                CommentResponse dto = new CommentResponse();
                Account account = accountService.findById(comment.getAccountId()).get();
                dto.setId(comment.getId());
                dto.setAccountId(comment.getAccountId());
                dto.setAccountUserName(accountService.findById(comment.getAccountId()).get().getUsername());
                if (account.getRole().equals("candidate")) {
                    dto.setName(candidateService.findCandidateByAccountUsername(account.getUsername()).get().getFirstName() + " " + candidateService.findCandidateByAccountUsername(account.getUsername()).get().getLastName());
                    dto.setAvatar(candidateService.findCandidateByAccountUsername(account.getUsername()).get().getAvatar());
                }
                else if (account.getRole().equals("employer")) {
                    dto.setName(employerService.findByAccountUsername(account.getUsername()).getName());
                    dto.setAvatar(employerService.findByAccountUsername(account.getUsername()).getImage());
                } else {
                    dto.setName("admin");
                    dto.setAvatar("https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg");
                }
                dto.setComment(comment.getComment());
                dto.setBlogId(comment.getBlogId());
                dto.setCommentedAt(comment.getCommentedAt());
                dto.setCommentId(comment.getCommentId());
                return dto;
            });
            return ResponseEntity.ok(commentResponses);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(("An eror occurred"));

        }
    }
    @PostMapping("/blog/create")
    public ResponseEntity<?> createBlog(@RequestHeader("Authorization") String token, @RequestPart Blog blog, @RequestPart MultipartFile image) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || !account.getRole().equals("admin")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }
            blog.setId(UUID.randomUUID().toString());
            blog.setState("active");
            blog.setCreatedAt(new Date());
            blogService.saveWithImage(blog, image);
            return ResponseEntity.ok("Add new blog successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }



    @PutMapping("/blog/update")
    public ResponseEntity<?> updateBlog(@RequestHeader("Authorization") String token,@RequestParam String blogId,  @RequestPart Blog updatedBlog,@RequestPart(required = false) MultipartFile image) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !account.getRole().equals("admin")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }

            Blog existingBlog = blogService.findById(blogId).get();

            if (existingBlog == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found");
            }


            existingBlog.setTitle(updatedBlog.getTitle());
            existingBlog.setContent(updatedBlog.getContent());
            existingBlog.setState(updatedBlog.getState());
            existingBlog.setCreatedAt(new Date());

            blogService.saveWithImage(existingBlog,image);

            return ResponseEntity.ok("Blog updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


    @DeleteMapping("/blog/delete")
    public ResponseEntity<?> deleteBlog(@RequestHeader("Authorization") String token, @RequestParam String blogId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !account.getRole().equals("admin")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }

            Blog blog = blogService.findById(blogId).get();
            if (blog == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found");
            }

            blogService.deleteById(blogId);

            return ResponseEntity.ok("Blog deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @DeleteMapping("/comment/delete")
    public ResponseEntity<?> deleteBlogComment(@RequestHeader("Authorization") String token, @RequestParam String commentId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !account.getRole().equals("admin")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }
            commentService.deleteComment(commentId);

            return ResponseEntity.ok("Comment deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }



}

