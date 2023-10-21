package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Employer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;

public interface EmployerRepository extends JpaRepository<Employer, String> {
    @Query("SELECT e FROM Employer e " +
            "JOIN  Account a on e.accountId=a.id " +
            "WHERE (:name IS NULL OR e.name LIKE %:name%)" +
            "AND a.state = 'active'")
    Page<Employer> findByNameContaining(
            @RequestParam(name = "name", required = false) String name,
            Pageable pageable
    );
    @Query("SELECT distinct e FROM Employer e " +
            "JOIN  Account a on e.accountId=a.id "+
            "JOIN EmployerVip v ON e.id = v.employerId " +
            "WHERE DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE()" +
            "And a.state='active'")
    Page<Employer> findVipEmployers(Pageable pageable);

    @Query("SELECT e FROM Employer e JOIN Account a on  e.accountId = a.id where a.username = :username")
    Employer findByAccountUsername(@Param("username") String username);


}
