package com.pth.jobapp.service;

import com.pth.jobapp.dao.CommentRepository;
import com.pth.jobapp.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public List<Comment>findByBlogId(String blogId){
        return commentRepository.findByBlogId(blogId);
    }
    public Comment saveComment(Comment comment){
        return commentRepository.save(comment);
    }
    public void deleteComment(String commentId){
        commentRepository.deleteById(commentId);
    }

}
