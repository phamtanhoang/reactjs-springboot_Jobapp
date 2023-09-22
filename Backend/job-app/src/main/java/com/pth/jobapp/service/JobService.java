package com.pth.jobapp.service;

import com.pth.jobapp.dao.JobRepository;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
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
    @Scheduled(cron = "0 0 0 * * ?") // Chạy vào lúc 00:00:00 hàng ngày
    public void updateJobStatus() {

        List<Job> expiredJobs = jobRepository.findExpiredJobs();

        for (Job job : expiredJobs) {
            job.setState("expired");
            jobRepository.save(job);
        }
    }
    public Optional<Job> findJobByApplicationId( String applicationId){
        return jobRepository.findJobByApplicationId(applicationId);
    };
}
