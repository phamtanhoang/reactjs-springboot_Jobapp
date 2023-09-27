package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CommentRepository extends JpaRepository<Comment,String> {
    List<Comment> findByBlogId(String blogId);

}
