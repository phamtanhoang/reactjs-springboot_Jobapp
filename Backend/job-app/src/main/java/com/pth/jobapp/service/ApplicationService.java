package com.pth.jobapp.service;

import com.pth.jobapp.dao.ApplicationRepository;
import com.pth.jobapp.dao.CandidateRepository;
import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Application;
import com.pth.jobapp.entity.Candidate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;
    public Application findByJobIdAndCandidateId(String jobId, String candidateId) {
        return applicationRepository.findByJobIdAndCandidateId(jobId,candidateId);
    }

    public Application save(Application application) {
        return applicationRepository.save(application);
    }
}
