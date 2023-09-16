package com.pth.jobapp.service;

import com.pth.jobapp.dao.JobRepository;
import com.pth.jobapp.entity.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class JobService {
    @Autowired
    private JobRepository jobRepository;

}
