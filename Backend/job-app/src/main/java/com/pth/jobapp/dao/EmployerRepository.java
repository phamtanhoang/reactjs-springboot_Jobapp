package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;


public interface EmployerRepository extends JpaRepository<Employer, String> {
    @Query("SELECT e FROM Employer e WHERE" +
            " (:name IS NULL OR e.name LIKE %:name%)")
    Page<Employer> findByNameContaining(
            @RequestParam(name = "name", required = false) String name,
            Pageable pageable
    );
}
