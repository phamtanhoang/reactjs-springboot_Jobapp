package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Employer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface EmployerRepository extends JpaRepository<Employer, String> {
    @Query("SELECT e FROM Employer e WHERE" +
            " (:name IS NULL OR e.name LIKE %:name%)")
    Page<Employer> findByName(
            @RequestParam(name = "name", required = false) String name,
            Pageable pageable
    );

    @Query("select e from Employer e where e.id in :id")
    List<Employer> findById (@Param("id") String id, Pageable pageable);
}
