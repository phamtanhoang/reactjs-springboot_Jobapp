package com.pth.jobapp.dao;

import com.pth.jobapp.entity.EmployerVip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EmployerVipRepository extends JpaRepository<EmployerVip,String> {

    @Query("SELECT e FROM EmployerVip e where e.vipId = :vipId")
    List<EmployerVip> findByVipIdWithList(String vipId);
    @Query("SELECT e FROM EmployerVip e JOIN Employer em on  e.employerId = em.id where em.name = :name")
    Page<EmployerVip> findByEmployerNameContaining(String name, Pageable pageable);

    Optional<EmployerVip> findByIdAndEmployerId(String id,String employerId);

    Page<EmployerVip>findByVipId(String vipId, Pageable pageable);

    @Query("SELECT v FROM EmployerVip v WHERE v.employerId = :employerId ")

    Page<EmployerVip>findByEmployerId(String employerId, Pageable pageable);

    @Query("SELECT v FROM EmployerVip v WHERE v.employerId = :employerId AND DATE(v.toDate) >= CURRENT_DATE() AND v.toDate = (SELECT MAX(e.toDate) FROM EmployerVip e WHERE e.employerId = :employerId)")
    Optional<EmployerVip> findLatestByEmployerId(@Param("employerId") String employerId);




}
