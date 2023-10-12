package com.pth.jobapp.controller;

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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired JobService jobService;

    @Autowired ApplicationService applicationService;

    @Autowired CategoryService categoryService;
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
    public ResponseEntity<?> getJobsByTitleAndCategoryId(
            @RequestHeader("Authorization") String token,
            @RequestParam String title,
            @RequestParam String categoryId,
            @PageableDefault(page = 0, size = 10) Pageable pageable
    ) {
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

                if (!(job.getState().equals("active")||job.getState().equals("pending"))) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Job is not in an active state and cannot be updated.");
                }
                Date currentDate = new Date();
                if (job.getToDate().before(currentDate)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The updated toDate must be after the current date.");
                }
                job.setFromDate(new Date());
                job.setTitle(updatedJob.getTitle());
                job.setDescription(updatedJob.getDescription());
                job.setSalary(updatedJob.getSalary());
                job.setToDate(updatedJob.getToDate());
                job.setAddress(updatedJob.getAddress());
                job.setCategoryId(updatedJob.getCategoryId());
                job.setEmployerId(updatedJob.getEmployerId());
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
    public ResponseEntity<String> deleteJob(
            @RequestHeader("Authorization") String token,
            @RequestParam String jobId
    ) {
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
    public ResponseEntity<?> getCategoriesByNameContaining(
            @RequestHeader("Authorization") String token,
            @RequestParam String name,
            @PageableDefault(page = 0, size = 10) Pageable pageable
    ) {
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
    public ResponseEntity<String> deleteCategory(
            @RequestHeader("Authorization") String token,
            @RequestParam String categoryId
    ) {
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



    //Employers


    //Applications

    //Blogs

    //Employers

    //Accounts

}

