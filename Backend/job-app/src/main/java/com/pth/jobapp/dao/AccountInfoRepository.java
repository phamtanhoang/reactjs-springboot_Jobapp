package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountInfoRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);
}
