package com.pth.jobapp.service;

import com.pth.jobapp.dao.ApplicationRepository;
import com.pth.jobapp.dao.CandidateRepository;
import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Application;
import com.pth.jobapp.entity.Candidate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;
    public Application findByJobIdAndCandidateId(String jobId, String candidateId) {
        return applicationRepository.findByJobIdAndCandidateId(jobId,candidateId);
    }
    public Page <Application> findApplicationsByJobId(String jobId,Pageable pageable){return applicationRepository.findApplicationsByJobId(jobId,pageable);}
    public Application save(Application application) {
        return applicationRepository.save(application);
    }
    public Optional<Application> findById(String id) {
        return applicationRepository.findById(Long.parseLong(id));
    }
    public Page<Application> findPendingApplicationsByEmployerName(String username, Pageable pageable ){
        return applicationRepository.findPendingApplicationsByEmployerName(username,pageable);
    }
}
