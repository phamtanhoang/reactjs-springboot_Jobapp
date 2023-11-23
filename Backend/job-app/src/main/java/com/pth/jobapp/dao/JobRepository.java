package com.pth.jobapp.dao;

import com.pth.jobapp.ResponseModels.PopularJobResponse;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, String> {

    @Query("SELECT j FROM Job j WHERE" +
            " (:title IS NULL OR j.title LIKE %:title%)" +
            " AND (:address IS NULL OR :address = '' OR j.address = :address)"+
            " AND j.state = 'active'" +
            " AND CURDATE() BETWEEN j.fromDate AND j.toDate")
    Page<Job> findByTitleContainingAndAddress(
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "address", required = false) String address,
            Pageable pageable
    );

    Page<Job>findByState(String state,Pageable pageable);
    @Query("SELECT j FROM Job j WHERE" +
            " (:title IS NULL OR j.title LIKE %:title%)" +
            " AND (:categoryId IS NULL OR :categoryId = '' OR j.categoryId = :categoryId)" +
            " AND j.state = 'active'" +
            " AND CURDATE() BETWEEN j.fromDate AND j.toDate")
    Page<Job> findByTitleContainingAndCategoryId(
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "categoryId", required = false) String categoryId,
            Pageable pageable
    );

    @Query("SELECT COUNT(e) FROM Job e")
    Long countAll();
    @Query("SELECT j FROM Job j WHERE j.categoryId = :categoryId")
    List<Job> findByCategoryIdWithList(
            @RequestParam(name = "category", required = false) String categoryId);


    @Query("SELECT j FROM Job j" +
            " WHERE" +
            " j.state = 'active'" +
            " AND CURDATE() BETWEEN j.fromDate AND j.toDate" +
            " and j.categoryId=:categoryId")
    Page<Job> findByCategoryId(
            @RequestParam(name = "category", required = false) String categoryId,
            Pageable pageable
    );
    @Query("SELECT j FROM Job j WHERE j.state = 'active' AND CURDATE() BETWEEN j.fromDate AND j.toDate AND j.employerId = :employerId")
    Page<Job> findByEmployerId(String employerId,
            Pageable pageable
    );
    @Query("SELECT j FROM Job j WHERE j.employerId = :employerId")
    List<Job> findByEmployerIdWithList(String employerId
    );
        @Query("SELECT j FROM Job j JOIN Employer e on j.employerId=e.id " +
                "WHERE e.id IN (SELECT e.id FROM Employer e JOIN EmployerVip v ON e.id = v.employerId " +
                "WHERE DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE()) And j.state='active'")
    Page<Job>findJobsWithVipEmployer(Pageable pageable);


    @Query("SELECT j FROM Job j WHERE j.toDate < CURRENT_DATE()")
    List<Job> findExpiredJobs();

    @Query("SELECT j FROM Job j\n" +
            "WHERE j.state = 'active'\n" +
            "AND j.toDate >= CURRENT_DATE()\n" +
            "ORDER BY j.toDate DESC")
    Page<Job> findAvailableJobs(Pageable pageable);
    @Query("SELECT j FROM Job j JOIN Application a ON j.id = a.jobId " +
            "WHERE a.id=:applicationId")
    Optional<Job> findJobByApplicationId( @RequestParam(name = "applicationId") String applicationId);


    Page<Job> findByEmployerIdAndTitleContainingAndState(
            @Param("employerId") String employerId,
            @Param("title") String title,
            String state,
            Pageable pageable
    );

    Optional<Job>findJobByEmployerIdAndId(String employerId,String id);

        Page<Job>findByEmployerIdAndState(String employerId,String state, Pageable pageable);

    @Query("SELECT j " +
            "FROM Job j " +
            "LEFT JOIN Application a ON j.id = a.jobId " +
            "WHERE j.employerId = :employerId " +
            "AND j.state = 'active' " +
            "GROUP BY j.id, j.title " +
            "ORDER BY COUNT(a.id) DESC")
    Page<Job> findTop5JobsByApplyCount(@Param("employerId") String employerId, Pageable pageable);


    @Query("SELECT COUNT(a.id) AS applyCount " +
            "FROM Job j " +
            "LEFT JOIN Application a ON j.id = a.jobId " +
            "WHERE j.employerId = :employerId " +
            "AND j.state = 'active' " +
            "GROUP BY j.id " +
            "ORDER BY applyCount DESC")
    List<Long> findTop5JobApplyCounts(@Param("employerId") String employerId, Pageable pageable);

}
