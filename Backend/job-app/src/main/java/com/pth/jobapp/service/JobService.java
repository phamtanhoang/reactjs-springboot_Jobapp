package com.pth.jobapp.service;

import com.google.api.PageOrBuilder;
import com.pth.jobapp.ResponseModels.PopularJobResponse;
import com.pth.jobapp.dao.JobRepository;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.Objects;
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
    public List<Job> findByEmployerIdWithList(String employerId){
        return jobRepository.findByEmployerIdWithList(employerId);
    }

    public  Page<Job> findAvailableJobs(Pageable pageable){
        return jobRepository.findAvailableJobs(pageable);
    }

    public Optional<Job> findJobByApplicationId( String applicationId){
        return jobRepository.findJobByApplicationId(applicationId);
    };

    public Page<Job>findByEmployerIdAndTitleContaining(String employerId,String title ,Pageable pageable){
        return jobRepository.findByEmployerIdAndTitleContaining(employerId,title,pageable);
    }

    public Page<Job> findByTitleContainingAndCategoryId(String title, String categoryId, Pageable pageable){return jobRepository.findByTitleContainingAndCategoryId(title,categoryId,pageable);}
    public Optional<Job>findJobByEmployerIdAndId(String employerId,String id){return jobRepository.findJobByEmployerIdAndId(employerId,id);}


    public List<Job>findByCategoryIdWithList(String categoryId){return  jobRepository.findByCategoryIdWithList(categoryId);}
    @Scheduled(cron = "0 0 0 * * ?") // Chạy vào lúc 00:00:00 hàng ngày
    public void updateJobStatus() {

        List<Job> expiredJobs = jobRepository.findExpiredJobs();

        for (Job job : expiredJobs) {
            job.setState("expired");
            jobRepository.save(job);
        }
    }

    public Page<Job> findByTitleContainingAndAddress(Pageable pageable){return  jobRepository.findByTitleContainingAndAddress("","",pageable);}


    public Page<Job> findByEmployerIdAndState(String employerId, String state, Pageable pageable){return jobRepository.findByEmployerIdAndState(employerId,state,pageable);}

    public Page<Job> findTop5JobsByApplyCount(String employerId){
        Pageable pageable = PageRequest.of(0, 5);
        return jobRepository.findTop5JobsByApplyCount(employerId,pageable);
    }
    public List<Long> findTop5JobApplyCounts(String employerId){
        Pageable pageable = PageRequest.of(0, 5);
        return jobRepository.findTop5JobApplyCounts(employerId,pageable);
    }
    public Page<Job> findByState(String state,Pageable pageable){
        return jobRepository.findByState(state,pageable);
    }
}
