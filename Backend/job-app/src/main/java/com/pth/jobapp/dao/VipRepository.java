package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Vip;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VipRepository extends JpaRepository<Vip,String> {
    Page<Vip> findByNameContaining(String name, Pageable pageable);

     List<Vip> findAllByState(String state);
}
