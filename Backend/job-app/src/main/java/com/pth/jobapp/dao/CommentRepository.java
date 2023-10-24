package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface CommentRepository extends JpaRepository<Comment,String> {
    Page<Comment> findByBlogIdOrderByCommentedAtDesc(String blogId, Pageable pageable);

    Optional<Comment>findByAccountId(String accountId);
}
