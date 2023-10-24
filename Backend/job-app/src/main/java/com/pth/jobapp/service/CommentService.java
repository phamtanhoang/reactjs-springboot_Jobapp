package com.pth.jobapp.service;

import com.pth.jobapp.dao.CommentRepository;
import com.pth.jobapp.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public Page<Comment> findByBlogId(String blogId, Pageable pageable){
        return commentRepository.findByBlogIdOrderByCommentedAtDesc(blogId,pageable);
    }
    public Optional<Comment>findById(String commentId){return commentRepository.findById(commentId);}
    public Optional<Comment>findByAccountId(String accountId){return commentRepository.findByAccountId(accountId);}
    public Comment saveComment(Comment comment){
        return commentRepository.save(comment);
    }
    public void deleteComment(String commentId){
        commentRepository.deleteById(commentId);
    }

}
