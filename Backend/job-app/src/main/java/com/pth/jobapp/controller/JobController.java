package com.pth.jobapp.controller;

import com.pth.jobapp.entity.Job;
import com.pth.jobapp.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://127.0.0.1:5173/")
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService jobService;

    @GetMapping("/findByTitleAndAddress")
    public Page<Job> findByTitleAndAddress(
            @RequestParam("title") String title,
            @RequestParam("address") String address,
            Pageable pageable) {
       return jobService.findByTitleAndAddress(title, address, pageable);
    }

    @GetMapping("/findByCategoryId")
    public Page<Job> findByCategory(@RequestParam("categoryId") String categoryId, Pageable pageable){
        return jobService.findByCategoryId(categoryId, pageable);
    }
}
