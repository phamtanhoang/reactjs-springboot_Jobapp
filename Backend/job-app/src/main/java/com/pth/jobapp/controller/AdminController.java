package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.CandidateProfileResponse;
import com.pth.jobapp.ResponseModels.EmployerProfileResponse;
import com.pth.jobapp.ResponseModels.JobDetailsResponse;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.requestmodels.AuthRequest;
import com.pth.jobapp.requestmodels.CandidateRegistrationRequest;
import com.pth.jobapp.requestmodels.ChangePasswordRequest;
import com.pth.jobapp.requestmodels.EmployerRegistrationRequest;
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
    private AccountInfoService accountInfoService;
    @Autowired AccountService accountService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired JobService jobService;

    @Autowired ApplicationService applicationService;

    @Autowired CategoryService categoryService;

    @Autowired CandidateService candidateService;

    @Autowired
    EmployerService employerService;

    //---------------------------AdminLogin------------------------------------------------//
    @PostMapping("/login")
    public ResponseEntity<String> adminAuthentication(@RequestBody AuthRequest authRequest) {
        try {
            System.out.println(authRequest.getPassword());

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

            if (authentication.isAuthenticated()) {
                Account account = accountService.findByUsername(authentication.getName());

                if ("admin".equals(account.getRole()) && "active".equals(account.getState())) {
                    String token = jwtService.generateToken(authRequest.getUsername(), authRequest.getState());
                    System.out.println("User '" + authRequest.getUsername() + "' successfully authenticated and received JWT token: " + token);

                    return ResponseEntity.ok(token);
                } else {
                    throw new UsernameNotFoundException("Invalid user request!"); // Replace YourCustomException with the appropriate exception class
                }
            } else {
                throw new UsernameNotFoundException("Invalid user request!");
            }
        } catch (AuthenticationException e) {
            System.err.println("Authentication error: " + e.getMessage());
            throw new UsernameNotFoundException("Invalid user request!"); // Replace YourCustomException with the appropriate exception class

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
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập công việc.");
            }

            Page<Job> jobs = jobService.findByTitleContainingAndCategoryId(title, categoryId, pageable);

            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể tìm kiếm công việc.");
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
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập công việc.");
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
                    return ResponseEntity.badRequest().body("Không tìm thấy nhà tuyển dụng hoặc danh mục.");
                }
            } else {
                return ResponseEntity.badRequest().body("Không tìm thấy công việc.");
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
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền thêm công việc.");
            }
            job.setFromDate(new Date());
            job.setId(UUID.randomUUID().toString());
            job.setState("active");
            jobService.save(job);
            return ResponseEntity.ok("Đã thêm công việc thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi thêm công việc.");
        }
    }

    @PutMapping("/job/update")
    public ResponseEntity<String> updateJob(@RequestHeader("Authorization") String token, @RequestParam String jobId, @RequestBody Job updatedJob) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền sửa công việc.");
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update job");
        }
    }

    @DeleteMapping("/job/delete")
    public ResponseEntity<String> deleteJob(@RequestHeader("Authorization") String token, @RequestParam String jobId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có xóa sửa công việc.");
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete job");
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
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập vào đây.");
            }

            Page<Category> categories = categoryService.findByName(name, pageable);

            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể tìm kiếm loại công việc.");
        }
    }

    @PostMapping("/category/create")
    public ResponseEntity<String> createCategory(@RequestHeader("Authorization") String token, @RequestBody Category category) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền thêm loại công việc.");
            }
            category.setId(UUID.randomUUID().toString());

            categoryService.save(category);
            return ResponseEntity.ok("Đã thêm loại công việc thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi khi thêm loại công việc.");
        }
    }

    @PutMapping("/category/update")
    public ResponseEntity<String> updateCategory(@RequestHeader("Authorization") String token, @RequestParam String categoryId, @RequestBody Category updateCategory) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền sửa loại công việc.");
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update category");
        }
    }

    @DeleteMapping("/category/delete")
    public ResponseEntity<String> deleteCategory(@RequestHeader("Authorization") String token, @RequestParam String categoryId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền xóa loại công việc.");
            }
            Optional<Category> existingCategory = categoryService.findById(categoryId);
            if (existingCategory.isPresent()) {
                Category category = existingCategory.get();
                List<Job> jobs = jobService.findByCategoryId(categoryId);
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete category");
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
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập vào đây.");
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
                        return profile;
                    });

            return ResponseEntity.ok(candidateProfiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể tìm kiếm loại công việc.");
        }
    }

    @PostMapping("/candidate/create")
    public ResponseEntity<?> addNewCandidate(@RequestHeader("Authorization") String token, @RequestBody CandidateRegistrationRequest candidateRegistrationRequest) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền xóa loại công việc.");
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the candidate.");
        }
    }

    @PutMapping("/candidate/update")
    public ResponseEntity<?> updateCandidate(@RequestHeader("Authorization") String token, @RequestParam String candidateId, @RequestBody Candidate candidate) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền làm việc này.");
            }
            Optional<Candidate> existingCandidate = candidateService.findById(candidateId);
            if (existingCandidate.isPresent()) {
                Candidate updateCandidate= existingCandidate.get();
                System.out.println(updateCandidate.getAccountId());
                updateCandidate.setDateOfBirth(candidate.getDateOfBirth());
                updateCandidate.setFirstName(candidate.getFirstName());
                updateCandidate.setLastName(candidate.getLastName());
                updateCandidate.setSex(candidate.getSex());

                candidateService.save(updateCandidate);
                return ResponseEntity.ok("Candidate updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The category with ID " + candidateId + " was not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate profile");
        }
    }

    @PutMapping("/candidate/updateImage")
    public ResponseEntity<?> updateCandidateImage(@RequestHeader("Authorization") String token,@RequestParam String candidateId, @RequestBody MultipartFile image) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền làm việc này.");
            }
            Candidate updateCandidate= candidateService.findById(candidateId).get();
            candidateService.saveWithImage(updateCandidate,image);

            return ResponseEntity.ok("Candidate image updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update candidate image");
        }
    }

    @PutMapping("candidate/updateState")
    public ResponseEntity<?> updateCandidateState(@RequestHeader("Authorization") String token, @RequestParam String candidateId, @RequestParam String state) {
        try {
            if (candidateId == null || candidateId.isEmpty() || state == null || state.isEmpty())
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("candidateId và state không được trống.");
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || !"admin".equals(account.getRole()))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền cập nhật thông tin ứng viên.");

            Account candidateAccount = accountService.findById(candidateId).orElse(null);
            if (candidateAccount == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy ứng viên với ID " + candidateId);

            candidateAccount.setState(state);
            accountService.save(candidateAccount);
            return ResponseEntity.ok("Trạng thái của ứng viên đã được cập nhật thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật trạng thái ứng viên.");
        }
    }

    @DeleteMapping("/candidate/delete")
    public ResponseEntity<?> deleteCandidate(@RequestHeader("Authorization") String token, @RequestParam String candidateId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không thể làm việc này.");
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete andidate");
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
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập vào đây.");
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
                        profile.setCreatedAt(employerAccount.getCreateAt());
                        profile.setState(employerAccount.getState());
                        profile.setAccountId(employerAccount.getId());
                        return profile;
                    });

            return ResponseEntity.ok(employerProfiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể tìm kiếm nhà tuyển dụng.");
        }
    }

    @PostMapping("/employer/create")
    public ResponseEntity<?> addNewEmployer(@RequestHeader("Authorization") String token, @RequestBody EmployerRegistrationRequest employerRegistrationRequest) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập vào đây.");
            }

            if (accountService.findByUsername(employerRegistrationRequest.getUsername()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tên đăng nhập đã tồn tại. Vui lòng chọn một tên đăng nhập khác.");
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
            employer.setBanner(employerRegistrationRequest.getBanner());
            employer.setImage(employerRegistrationRequest.getImage());
            employer.setDescription(employerRegistrationRequest.getDescription());
            employer.setAccountId(uuid.toString());

            employerService.save(employer);

            return ResponseEntity.ok("Nhà tuyển dụng đã được tạo thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi tạo nhà tuyển dụng.");
        }
    }

    @PutMapping("/employer/update")
    public ResponseEntity<String> updateEmployer(@RequestHeader("Authorization") String token, @RequestParam String employerId, @RequestBody Employer employer) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập vào đây.");
            }

            Employer updateEmployer = employerService.findById(employerId).orElse(null);

            if (employer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy nhà tuyển dụng với ID " + employerId);
            }

            updateEmployer.setAddress(employer.getAddress());
            updateEmployer.setDescription(employer.getDescription());
            updateEmployer.setName(employer.getName());

            employerService.save(updateEmployer);

            return ResponseEntity.ok("Hồ sơ nhà tuyển dụng đã được cập nhật thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật hồ sơ nhà tuyển dụng.");
        }
    }

    @PutMapping("/employer/updateImage")
    public ResponseEntity<String> updateEmployerImage(@RequestHeader("Authorization") String token,@RequestParam String employerId, @RequestBody MultipartFile image) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập vào đây.");
            }
            employerService.saveWithImage(employerService.findById(employerId).get(),image);

            return ResponseEntity.ok("Employer image updated successfully");
        } catch (Exception e) {
            // Handle the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update employer image");
        }
    }

    @PutMapping("/employer/updateBanner")
    public ResponseEntity<String> updateEmployerBanner(@RequestHeader("Authorization") String token,@RequestParam String employerId, @RequestBody MultipartFile banner) {

        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền truy cập vào đây.");
            }
            employerService.saveWithBanner(employerService.findById(employerId).get(),banner);

            return ResponseEntity.ok("Employer banner updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update employer banner");
        }
    }


    @PutMapping("/employer/updateState")
    public ResponseEntity<?> updateEmployerState(@RequestHeader("Authorization") String token, @RequestParam String employerId, @RequestParam String state) {
        try {
            if (employerId == null || employerId.isEmpty() || state == null || state.isEmpty())
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("candidateId và state không được trống.");
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || !"admin".equals(account.getRole()))
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền cập nhật thông tin ứng viên.");

            Account candidateAccount = accountService.findById(employerId).orElse(null);
            if (candidateAccount == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy ứng viên với ID " + employerId);

            candidateAccount.setState(state);
            accountService.save(candidateAccount);
            return ResponseEntity.ok("Trạng thái của ứng viên đã được cập nhật thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật trạng thái ứng viên.");
        }
    }

    @DeleteMapping("/employer/delete")
    public ResponseEntity<String> deleteEmployer(@RequestHeader("Authorization") String token, @RequestParam String employerId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || !"admin".equals(account.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền để làm việc này.");
            }
            Optional<Employer> existingEmployer = employerService.findById(employerId);
            if (existingEmployer.isPresent()) {
                Employer employer = existingEmployer.get();
                List<Job> jobs = jobService.findByEmployerId(employerId);
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to delete employer");
        }
    }

    //---------------------------Employers------------------------------------------------//

    //Applications

    //Blogs


}

