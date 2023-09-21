package com.pth.jobapp.service;

import com.pth.jobapp.dao.AccountRepository;
import com.pth.jobapp.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    public Account save(Account user) {
        return accountRepository.save(user);
    }
}
