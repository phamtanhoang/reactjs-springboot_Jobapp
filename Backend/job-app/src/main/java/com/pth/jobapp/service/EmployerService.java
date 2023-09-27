package com.pth.jobapp.service;

import com.pth.jobapp.dao.EmployerRepository;
import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployerService {
    @Autowired
    private EmployerRepository employerRepository;

    public Employer save(Employer employer) {
        return employerRepository.save(employer);
    }
    public Optional<Employer> findById(String id){return  employerRepository.findById(id);}
    public Employer findByAccountUsername(String username){return employerRepository.findByAccountUsername(username);}
}