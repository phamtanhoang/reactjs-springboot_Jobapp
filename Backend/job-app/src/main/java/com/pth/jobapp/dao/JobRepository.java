package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("select j from Job j where j.id in :id")
    List<Job> findById (@Param("id") String id, Pageable pageable);
}
