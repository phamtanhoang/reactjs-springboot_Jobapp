package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.web.PageableDefault;

public interface JobRepository extends JpaRepository<Job, String> {

    Page<Job> findByTitleContaining(String title, @PageableDefault(size = 20) Pageable pageable);

    Page<Job> findByAddress(String address, @PageableDefault(size = 20) Pageable pageable);
    Page<Job>findAll( @PageableDefault(size = 20)Pageable pageable);
    Page<Job> findByTitleContainingAndAddress(String title, String address,  @PageableDefault(size = 20) Pageable pageable);
    Page<Job> findById(String id, @PageableDefault(size = 20) Pageable pageable);
    Page<Job> findByCategoryId(String categoryId, @PageableDefault(size = 20) Pageable pageable);
}
