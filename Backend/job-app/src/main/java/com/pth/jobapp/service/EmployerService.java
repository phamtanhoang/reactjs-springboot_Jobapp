package com.pth.jobapp.service;

import com.pth.jobapp.dao.EmployerRepository;
import com.pth.jobapp.entity.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class EmployerService {
    @Autowired
    private EmployerRepository employerRepository;

}