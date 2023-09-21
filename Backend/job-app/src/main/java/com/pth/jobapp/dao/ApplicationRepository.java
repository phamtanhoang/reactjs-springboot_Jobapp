package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Application findByJobIdAndCandidateId(String jobId,String candidateId);
}