package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, String> {

    Page<Job> findByTitleContaining(String title, Pageable pageable);

    Page<Job> findByAddress(String address, Pageable pageable);

    Page<Job> findByTitleContainingAndAddress(String title, String address, Pageable pageable);

    Page<Job> findByCategoryId(String categoryId, Pageable pageable);
}
