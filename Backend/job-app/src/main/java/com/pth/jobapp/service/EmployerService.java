package com.pth.jobapp.service;

import com.pth.jobapp.dao.EmployerRepository;
import com.pth.jobapp.entity.Employer;
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
public class EmployerService {
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    FileUploader imageUploader;
    public Employer save(Employer employer) {
        return employerRepository.save(employer);
    }
    public Optional<Employer> findById(String id){return  employerRepository.findById(id);}
    public Employer findByAccountUsername(String username){return employerRepository.findByAccountUsername(username);}

    public Page<Employer> findByNameContaining(String name, Pageable pageable){return employerRepository.findByNameContaining(name,pageable);}
    public Employer saveWithImage(Employer employer, MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            try {
                byte[] imageBytes = image.getBytes();

                if (employer.getImage() != null) {
                    String existingImageUrl = employer.getImage();
                    String updatedImageUrl = imageUploader.updateImage(existingImageUrl, imageBytes);
                    employer.setImage(updatedImageUrl);
                } else {
                    String imgUrl = imageUploader.uploadImage(imageBytes);

                    employer.setImage(imgUrl);

                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return employerRepository.save(employer);
    }
    public Employer saveWithBanner(Employer employer, MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            try {
                byte[] imageBytes = image.getBytes();

                if (employer.getImage() != null) {
                    String existingBannerUrl = employer.getBanner();
                    String updatedBannerUrl = imageUploader.updateImage(existingBannerUrl, imageBytes);
                    employer.setBanner(updatedBannerUrl);
                } else {
                    String bannerUrl = imageUploader.uploadImage(imageBytes);

                    employer.setBanner(bannerUrl);

                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return employerRepository.save(employer);
    }
    public void deleteById(String id){employerRepository.deleteById(id);}
}
