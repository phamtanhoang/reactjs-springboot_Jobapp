package com.pth.jobapp.service;

import com.pth.jobapp.dao.BlogRepository;
import com.pth.jobapp.entity.Blog;
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
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    FileUploader fileUploader;

    public Optional<Blog> findByAccountId(String accountId){
        return blogRepository.findByAccountId(accountId);

    }
    public Page<Blog> findAllByOrderByCreatedAtDesc(Pageable pageable){
        return blogRepository.findAllByOrderByCreatedAtDesc(pageable);
    }

    public Blog saveWithImage(Blog blog, MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            try {
                byte[] imageBytes = image.getBytes();

                if (blog.getImage() != null) {
                    String existingImageUrl = blog.getImage();
                    String updatedImageUrl = fileUploader.updateImage(existingImageUrl, imageBytes);
                    blog.setImage(updatedImageUrl);
                } else {
                    String imgUrl = fileUploader.uploadImage(imageBytes);

                    blog.setImage(imgUrl);

                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return blogRepository.save(blog);
    }
    public Blog saveBlog(Blog blog){
        return  blogRepository.save(blog);
    }

    public Page<Blog>findAllByTitleContainingOrderByCreatedAtDesc(String title,Pageable pageable){return blogRepository.findAllByTitleContainingOrderByCreatedAtDesc(title,pageable);}

    public Page<Blog> findAllByTitleContainingAndStateOrderByCreatedAtDesc(String title,String state,Pageable pageable){return  blogRepository.findAllByTitleContainingAndStateOrderByCreatedAtDesc(title,state,pageable);}
}
