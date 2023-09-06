package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, String> {
}
