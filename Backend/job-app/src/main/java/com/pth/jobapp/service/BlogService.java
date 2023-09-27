package com.pth.jobapp.service;

import com.pth.jobapp.dao.BlogRepository;
import com.pth.jobapp.entity.Blog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    public Optional<Blog> findByAccountId(String accountId){
        return blogRepository.findByAccountId(accountId);

    }
    public Page<Blog> findAllOrderByUpdatedAtDesc(Pageable pageable){
        return blogRepository.findAllByOrderByUpdatedAtDesc(pageable);
    }

    public Blog saveBlog(Blog blog){
        return  blogRepository.save(blog);
    }
}
