package com.pth.jobapp.controller;

import com.pth.jobapp.service.BlogService;
import com.pth.jobapp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("http://127.0.0.1:5173/")
@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    @Autowired
    private BlogService blogService;
    @Autowired
    private CommentService commentService;

}
