package com.pth.jobapp.service;

import com.pth.jobapp.dao.EmployerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class EmployerService {
    @Autowired
    private EmployerRepository employerRepository;
}