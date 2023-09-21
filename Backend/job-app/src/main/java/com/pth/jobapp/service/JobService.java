package com.pth.jobapp.service;

import com.pth.jobapp.dao.JobRepository;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class JobService {
    @Autowired
    private JobRepository jobRepository;
    public Job save(Job job) {
        return jobRepository.save(job);
    }
    public Optional<Job> findById(String id){return jobRepository.findById(id);}
    public void delete(Job job){ jobRepository.delete(job);}
    public Page<Job> findByEmployerId(String employerId,Pageable pageable){
        return jobRepository.findByEmployerId(employerId,pageable);
    }

}
