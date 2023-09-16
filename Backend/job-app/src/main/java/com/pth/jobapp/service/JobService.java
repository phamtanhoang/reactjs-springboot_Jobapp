package com.pth.jobapp.service;

import com.pth.jobapp.dao.JobRepository;
import com.pth.jobapp.entity.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    public Page<Job> findByTitleAndAddress(String title, String address, @PageableDefault(size = 20) Pageable pageable) {


        if (title != null && !title.isEmpty())
            if (!address.equalsIgnoreCase("all"))
                return jobRepository.findByTitleContainingAndAddress(title, address, pageable);
            else
                return jobRepository.findByTitleContaining(title, pageable);
        else
            if (!address.equalsIgnoreCase("all"))
                return jobRepository.findByAddress(address, pageable);
            else
                return jobRepository.findAll(pageable);
    }
    public Page<Job> findAll(Pageable pageable)
    {
        return jobRepository.findAll( pageable);
    }
    public Page<Job>findById(String id,Pageable pageable){
        return jobRepository.findById(id,pageable);
    }
    public Page<Job> findByCategoryId(String categoryId, Pageable pageable){
        return jobRepository.findByCategoryId(categoryId, pageable);
    }
}
