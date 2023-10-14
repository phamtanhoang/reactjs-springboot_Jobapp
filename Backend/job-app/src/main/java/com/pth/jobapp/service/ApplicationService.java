package com.pth.jobapp.service;

import com.dropbox.core.DbxException;
import com.pth.jobapp.dao.ApplicationRepository;
import com.pth.jobapp.dao.CandidateRepository;
import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Application;
import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.util.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private FileUploader fileUploader;
    public Application findByJobIdAndCandidateId(String jobId, String candidateId) {
        return applicationRepository.findByJobIdAndCandidateId(jobId,candidateId);
    }
    public Page <Application> findApplicationsByJobId(String jobId,Pageable pageable ){return applicationRepository.findApplicationsByJobId(jobId,pageable);}
    public Application save(Application application) {
        return applicationRepository.save(application);
    }
    public Optional<Application> findById(String id) {
        return applicationRepository.findById(id);
    }
    public Page<Application> findPendingApplicationsByEmployerName(String username, Pageable pageable ){
        return applicationRepository.findPendingApplicationsByEmployerName(username,pageable);
    }
    public void delete(Application application){
         applicationRepository.delete(application);
    }
    public List<Application> findApplicationsByJobId(String jobId){return applicationRepository.findApplicationsByJobId(jobId);}
    public List<Application> findApplicationsByCandidateId(String candidateId){return applicationRepository.findApplicationsByCandidateId(candidateId);}
    public Page<Application>findApplicationsByEmployerIdAndContainingTitle(String id,Pageable pageable,String title){
        return applicationRepository.findApplicationsByEmployerIdAndContainingTitle(id,pageable,title);
    }
    public void deleteAllByJobId(String jobId) {
        applicationRepository.deleteAllByJobId(jobId);
    }

    public void deleteByJobId(String jobId){
        applicationRepository.deleteByJobId(jobId);
    }

    public Application saveWithCV(Application application, MultipartFile cvFile) {
        try {
            if (cvFile != null && !cvFile.isEmpty()) {
                if (!cvFile.getContentType().equals("application/pdf")) {
                    throw new IllegalArgumentException("Only PDF files are allowed");
                }
                byte[] cvBytes = cvFile.getBytes();
                String cvUrl = fileUploader.uploadPdfToDropbox(cvBytes);
                application.setCV(cvUrl);
                application.setApplyDate(new Date());
                application.setState("pending");
                return applicationRepository.save(application);
            } else {
                throw new IllegalArgumentException("CV file is empty");
            }

        } catch (DbxException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Optional<Application>findByIdAndEmployerId(String id, String employerId){
        return applicationRepository.findByIdAndEmployerId(id,employerId);
    }
}
