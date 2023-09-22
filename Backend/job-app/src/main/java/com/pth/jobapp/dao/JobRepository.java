package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, String> {
    @Query("SELECT j FROM Job j WHERE" +
            " (:title IS NULL OR j.title LIKE %:title%)" +
            " AND (:address IS NULL OR :address = '' OR j.address = :address)")
    Page<Job> findByTitleContainingAndAddress(
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "address", required = false) String address,
            Pageable pageable
    );


    Page<Job> findByCategoryId(
            @RequestParam(name = "category", required = false) String categoryId,
            Pageable pageable
    );

    Page<Job> findByEmployerId(
            @RequestParam(name = "employer", required = false) String employerId,
            Pageable pageable
    );
    @Query("SELECT j FROM Job j JOIN Employer e on j.employerId=e.id " +
            "WHERE e.id IN (SELECT e.id FROM Employer e JOIN Vip v ON e.id = v.employerId " +
            "WHERE DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE())")
    Page<Job>findJobsWithVipEmployer(Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.toDate < CURRENT_DATE()")
    List<Job> findExpiredJobs();
    @Query("SELECT j FROM Job j JOIN Application a ON j.id = a.jobId " +
            "WHERE a.id=:applicationId")
    Optional<Job> findJobByApplicationId( @RequestParam(name = "applicationId") String applicationId);
}
