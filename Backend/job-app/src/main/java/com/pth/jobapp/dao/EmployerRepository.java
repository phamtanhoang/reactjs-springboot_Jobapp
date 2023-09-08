package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepository extends JpaRepository<Employer, String> {
}
