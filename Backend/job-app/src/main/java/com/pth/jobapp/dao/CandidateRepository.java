package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    @Query("SELECT c FROM Candidate c JOIN Account a on  c.accountId = a.id where a.username = :username")
    Optional<Candidate> findCandidateByAccountUsername(String username);

    @Query("SELECT c FROM Candidate c JOIN Application a on  c.id = a.candidateId where a.id = :applicationId")
    Optional<Candidate> findCandidateByApplicationId(String applicationId);
}