package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Candidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, String> {

    @Query("SELECT c FROM Candidate c JOIN Account a on c.accountId =a.id WHERE a.username = :username")
    Optional<Candidate> findCandidateByAccountUsername(String username);

    @Query("SELECT c FROM Candidate c JOIN Application a on  c.id = a.candidateId where a.id = :applicationId")
    Optional<Candidate> findCandidateByApplicationId(String applicationId);

    @Query("SELECT c FROM Candidate c " +
            "JOIN Account a ON c.accountId = a.id " +
            "WHERE CONCAT(c.firstName, ' ', c.lastName) LIKE %:keyword% " +
            "OR a.username LIKE %:keyword%")
    Page<Candidate> findCandidatesByKeyword(String keyword, Pageable pageable);

}