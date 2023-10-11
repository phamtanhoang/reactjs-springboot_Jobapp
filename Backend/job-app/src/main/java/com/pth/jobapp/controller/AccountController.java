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
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AccountController {

//    @Autowired
//    private HttpSession httpSession;

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

    @PostMapping("/employer/register")
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
            candidateService.save(candidate);
            return "add new employer successfully";

        }
        else
            return "add new employer failed";
    }

//    @GetMapping("/admin/adminProfile")
//    @PreAuthorize("hasAuthority('employer')")
//    public String adminProfile() {
//        return "Welcome to Admin Profile";
//    }


    @PostMapping("/candidate/login")
    public ResponseEntity<String> authenticateCandidate(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

            if (authentication.isAuthenticated()) {
                Account account = accountService.findByUsername(authentication.getName());

                if ("candidate".equals(account.getRole()) && "active".equals(account.getState())) {
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



    @PostMapping("/employer/login")
    public ResponseEntity<?> authenticateEmployer(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

            if (authentication.isAuthenticated()) {
                if (accountService.findByUsername(authentication.getName()).getRole().equals("employer") && accountService.findByUsername(authentication.getName()).getState().equals("active")) {
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
            throw new UsernameNotFoundException("Authentication error: " + e.getMessage()); // Replace YourCustomException with the appropriate exception class
        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String tokenHeader, @RequestBody ChangePasswordRequest changePasswordRequest) {
        String token = tokenHeader.substring(7);
        String username = jwtService.extractUsername(token);
        Account account = accountService.findByUsername(username);

        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tài khoản không tồn tại"); // Mã lỗi 1: Tài khoản không tồn tại
        }

        if (!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), account.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu hiện tại không đúng"); // Mã lỗi 2: Mật khẩu hiện tại không đúng
        }

        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Xác nhận mật khẩu không khớp"); // Mã lỗi 3: Xác nhận mật khẩu không khớp
        }

        account.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        accountService.save(account);
        return ResponseEntity.ok("Thay đổi mật khẩu thành công!!!");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> performLogout(HttpServletRequest request, HttpServletResponse response) throws UsernameNotFoundException {
        try {
            String tokenHeader = request.getHeader("Authorization");

            if (tokenHeader != null ) {
                String token = tokenHeader.substring(7);
                jwtService.invalidateToken(token);
                SecurityContextHolder.clearContext();
                return ResponseEntity.ok("Logout thành công");
            } else {
                throw new UsernameNotFoundException("Invalid user request!");
            }
        } catch (Exception e) {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }




}
