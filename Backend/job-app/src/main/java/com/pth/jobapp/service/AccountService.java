package com.pth.jobapp.service;

import com.pth.jobapp.dao.AccountRepository;
import com.pth.jobapp.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }
    public Optional<Account> findById(String accountId){return accountRepository.findById(Long.parseLong(accountId));}
    public Account save(Account user) {
        return accountRepository.save(user);
    }
}
