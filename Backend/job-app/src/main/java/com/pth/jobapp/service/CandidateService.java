package com.pth.jobapp.service;

import com.pth.jobapp.dao.CandidateRepository;
import com.pth.jobapp.dao.EmployerRepository;
import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.entity.Employer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class CandidateService {
    @Autowired
    private CandidateRepository candidateRepository;

    public Candidate save(Candidate candidate) {
        return candidateRepository.save(candidate);
    }
    public Candidate updateCandidate(Candidate updatedCandidate) {
        Candidate existingCandidate = candidateRepository.findById(Long.parseLong(updatedCandidate.getId()))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ứng viên với ID: " + updatedCandidate.getId()));


        existingCandidate.setFirstName(updatedCandidate.getFirstName());
        existingCandidate.setLastName(updatedCandidate.getLastName());
        existingCandidate.setSex(updatedCandidate.getSex());
        existingCandidate.setDateOfBirth(updatedCandidate.getDateOfBirth());
        existingCandidate.setAvatar(updatedCandidate.getAvatar());

        return candidateRepository.save(existingCandidate);
    }
}