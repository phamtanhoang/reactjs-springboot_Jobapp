package com.pth.jobapp.controller;

import com.pth.jobapp.dao.EmployerRepository;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://127.0.0.1:5173/")
@RestController
@RequestMapping("/api/employers")
public class EmployerController {
    @Autowired
    private EmployerService employerService;

}