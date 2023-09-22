package com.pth.jobapp.controller;

import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.requestmodels.AuthRequest;
import com.pth.jobapp.requestmodels.CandidateRegistrationRequest;
import com.pth.jobapp.requestmodels.ChangePasswordRequest;
import com.pth.jobapp.requestmodels.EmployerRegistrationRequest;
import com.pth.jobapp.service.*;
import com.pth.jobapp.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AccountController {

    @Autowired
    private AccountInfoService service;
    @Autowired
    private AccountService accountService;
    @Autowired
    private  EmployerService employerService;
    @Autowired
    private CandidateService candidateService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/employer/addNewEmployer")
    public String addNewEmployer(@RequestBody EmployerRegistrationRequest employerRegistrationRequest) {

        if (accountService.findByUsername(employerRegistrationRequest.getUsername()) == null) {
            UUID uuid = UUID.randomUUID();
            Account account= new Account();
            account.setId(uuid.toString());
            account.setUsername(employerRegistrationRequest.getUsername());
            account.setPassword(employerRegistrationRequest.getPassword());
            account.setRole("employer");
            account.setState("pending");
            account.setCreateAt(new Date());
            UUID id = UUID.randomUUID();
            service.addUser(account);
            Employer employer = new Employer();
            employer.setId(id.toString());
            employer.setName(employerRegistrationRequest.getName());
            employer.setAddress(employerRegistrationRequest.getAddress());
            employer.setBanner(employerRegistrationRequest.getBanner());
            employer.setImage(employerRegistrationRequest.getImage());
            employer.setDescription(employerRegistrationRequest.getDescription());
            employer.setAccountId(uuid.toString());
            System.out.println(uuid);
            // Sử dụng thể hiện của EmployerService đã được Spring quản lý thông qua injection
            employerService.save(employer);
            return "add new employer successfully";

        }
    else
            return "add new employer failed";
    }


    @PostMapping("/candidate/addNewCandidate")
    public String addNewCandidate(@RequestBody CandidateRegistrationRequest candidateRegistrationRequest) {
        if (accountService.findByUsername(candidateRegistrationRequest.getUsername()) == null) {
            UUID uuid = UUID.randomUUID();
            Account account= new Account();
            account.setId(uuid.toString());
            account.setUsername(candidateRegistrationRequest.getUsername());
            account.setPassword(candidateRegistrationRequest.getPassword());
            account.setRole("candidate");
            account.setState("active");
            account.setCreateAt(new Date());
            UUID id = UUID.randomUUID();
            service.addUser(account);
            Candidate candidate = new Candidate();
            candidate.setId(id.toString());
            candidate.setFirstName(candidateRegistrationRequest.getFirstName());
            candidate.setLastName(candidateRegistrationRequest.getLastName());
            candidate.setAvatar(candidateRegistrationRequest.getAvatar());
            candidate.setDateOfBirth(candidateRegistrationRequest.getDateOfBirth());
            candidate.setSex(candidateRegistrationRequest.getSex());
            candidate.setAccountId(uuid.toString());
            System.out.println(uuid);
            // Sử dụng thể hiện của EmployerService đã được Spring quản lý thông qua injection
            candidateService.save(candidate);
            return "add new employer successfully";

        }
        else
            return "add new employer failed";
    }

    @GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('admin')")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }


    @PostMapping("/login")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(authRequest.getUsername(),authRequest.getState());
                System.out.println("User '" + authRequest.getUsername() + "' successfully authenticated and received JWT token: " + token);
                return token;
            } else {
                throw new UsernameNotFoundException("invalid user request !");
            }
        } catch (AuthenticationException e) {
            System.err.println("Authentication error: " + e.getMessage());
            throw e;
        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        try {
            String username = jwtService.extractUsername(changePasswordRequest.getToken()); // Trích xuất tên người dùng từ token
            Account account = accountService.findByUsername(username);

            if (account != null) {
                // Kiểm tra xác nhận mật khẩu
                if (changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
                    // Thay đổi mật khẩu và lưu vào cơ sở dữ liệu
                    account.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
                    accountService.save(account);
                    return ResponseEntity.ok("Mật khẩu đã được thay đổi thành công");
                } else {
                    return ResponseEntity.badRequest().body("Xác nhận mật khẩu không khớp");
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.badRequest().body("Tài khoản không tồn tại");
        } catch (Exception e) {
            // Handle other exceptions and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Thay đổi mật khẩu thất bại");
        }
    }

}
