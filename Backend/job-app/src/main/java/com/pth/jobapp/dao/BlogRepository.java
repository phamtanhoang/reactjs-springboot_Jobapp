package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Blog;
import com.pth.jobapp.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog,String> {
    Optional<Blog> findByAccountId(String accountId);

    Page<Blog> findAllByOrderByUpdatedAtDesc(Pageable pageable);

}
