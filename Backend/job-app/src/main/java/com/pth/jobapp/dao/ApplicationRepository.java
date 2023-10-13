package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, String> {
    Application findByJobIdAndCandidateId(String jobId,String candidateId);
    Page <Application> findApplicationsByJobId(String jobId, Pageable pageable );
    List<Application> findApplicationsByJobId(String jobId );
    List<Application> findApplicationsByCandidateId(String candidateId );
    @Query("SELECT a FROM Application a " +
            "JOIN Job j ON a.jobId = j.id " +
            "JOIN Employer e ON j.employerId = e.id " +
            "WHERE e.name = :employerName " +
            "AND a.state = 'pending'")
    Page<Application> findPendingApplicationsByEmployerName(@Param("employerName") String employerName, Pageable pageable);

    @Query("SELECT a FROM Application a " +
            "JOIN Job j ON a.jobId = j.id " +
            "JOIN Employer e ON j.employerId = e.id " +
            "WHERE e.id = :id and j.title like  %:title%")
    Page<Application> findApplicationsByEmployerIdAndContainingTitle(@Param("id") String id, Pageable pageable,@Param("title")String title);


    @Query("DELETE FROM Application a WHERE a.jobId = :jobId")
    void deleteAllByJobId(String jobId);

    void deleteByJobId(String jobId);

    @Query("SELECT a FROM Application a " +
            "JOIN Job j ON a.jobId = j.id " +
            "WHERE j.employerId = :employerId " +
            "AND a.id = :id")
    Optional<Application>findByIdAndEmployerId(String id, String employerId);
}