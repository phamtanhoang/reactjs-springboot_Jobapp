package com.pth.jobapp.dao;

import com.pth.jobapp.entity.EmployerVip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployerVipRepository extends JpaRepository<EmployerVip,String> {

    @Query("SELECT e FROM EmployerVip e where e.vipId = :vipId")
    List<EmployerVip> findByVipIdWithList(String vipId);
    @Query("SELECT e FROM EmployerVip e JOIN Employer em on  e.employerId = em.id where em.name = :name")
    Page<EmployerVip> findByEmployerNameContaining(String name, Pageable pageable);


    Page<EmployerVip>findByVipId(String vipId,Pageable pageable);


}
