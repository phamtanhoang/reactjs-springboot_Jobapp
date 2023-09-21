package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
}