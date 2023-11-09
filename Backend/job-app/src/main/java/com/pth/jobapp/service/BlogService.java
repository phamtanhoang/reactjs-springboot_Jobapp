package com.pth.jobapp.service;

import com.pth.jobapp.dao.BlogRepository;
import com.pth.jobapp.entity.Blog;
import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.entity.Job;
import com.pth.jobapp.util.FileUploader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    public Page<Blog> findByAccountId(String accountId, Pageable pageable){
        return blogRepository.findByAccountId(accountId,pageable);

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

    public Page<Blog> findAllByTitleContainingAndStateOrderByCreatedAtDesc(String title,String state,Pageable pageable){return  blogRepository.findAllByTitleContainingAndStateContainingOrderByCreatedAtDesc(title,state,pageable);}

    public Page<Blog>findAllByTitleContainingAndActive(String title,String state, Pageable pageable){
        return  blogRepository.findAllByTitleContainingAndStateOrderByCreatedAtDesc(title, state,pageable);
    }
    public Page<Blog> findAllByTitleContainingAndAccountIdAndStateOrderByCreatedAtDesc(String title,String accountId,String state,Pageable pageable){return  blogRepository.findAllByTitleContainingAndAccountIdAndStateOrderByCreatedAtDesc(title,accountId,state,pageable);}

    public void deleteByIdAndAccountId(String id,String accountId){blogRepository.deleteByIdAndAccountId(id,accountId);}
    public void deleteById(String id){blogRepository.deleteById(id);}
    public Optional<Blog>findById(String id){return  blogRepository.findById(id);}
    public Optional<Blog>findByIdAndAccountId(String id,String accountId){return blogRepository.findByIdAndAccountId(id,accountId);}
    public Optional<Blog>findByIdAndState(String id,String state){return  blogRepository.findByIdAndState(id,state);}
    public Page<Blog> findTop5JobsByApplyCount(){
        Pageable pageable = PageRequest.of(0, 5);
        return blogRepository.findTop5BlogsByCommentCount(pageable);
    }

    public Long countAll(){return blogRepository.countAll();}
}
