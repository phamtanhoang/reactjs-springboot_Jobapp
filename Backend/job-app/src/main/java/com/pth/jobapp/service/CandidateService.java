package com.pth.jobapp.service;

import com.pth.jobapp.dao.CandidateRepository;
import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.util.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
public class CandidateService {
    @Autowired
    private CandidateRepository candidateRepository;
    @Autowired
    private FileUploader fileUploader;
    public Candidate save(Candidate candidate) {
        return candidateRepository.save(candidate);
    }
    public Candidate saveWithImage(Candidate candidate, MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            try {
                byte[] imageBytes = image.getBytes();

                if (candidate.getAvatar() != null) {
                    String existingImageUrl = candidate.getAvatar();
                    String updatedImageUrl = fileUploader.updateImage(existingImageUrl, imageBytes);
                    candidate.setAvatar(updatedImageUrl);
                } else {
                    String imgUrl = fileUploader.uploadImage(imageBytes);

                    candidate.setAvatar(imgUrl);

                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return candidateRepository.save(candidate);
    }


    public Optional<Candidate> findCandidateByAccountUsername(String username){
        return candidateRepository.findCandidateByAccountUsername(username);
    }
    public Optional<Candidate> findById(String id){return candidateRepository.findById(id);}

    public Page<Candidate> findCandidatesByKeyword(String keyword, Pageable pageable){return candidateRepository.findCandidatesByKeyword(keyword,pageable);}

    public void deleteById(String candidateId){ candidateRepository.deleteById(candidateId);}
}