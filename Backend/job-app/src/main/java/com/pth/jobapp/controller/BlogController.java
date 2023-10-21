package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.ApplicationResponse;
import com.pth.jobapp.ResponseModels.BlogResponse;
import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Blog;
import com.pth.jobapp.entity.Candidate;
import com.pth.jobapp.service.AccountService;
import com.pth.jobapp.service.BlogService;
import com.pth.jobapp.service.CommentService;
import com.pth.jobapp.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.support.DefaultedPageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.parser.Entity;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    @Autowired
    private BlogService blogService;
    @Autowired
    private CommentService commentService;
    @Autowired
    JwtService jwtService;

    @Autowired
    AccountService accountService;

    @GetMapping("/create")
    public ResponseEntity<?> createBlog(@RequestHeader("Authorization") String token, @RequestPart Blog blog, @RequestPart MultipartFile image) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || !account.getRole().equals("candidate")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }
            blog.setState("pending");
            blogService.saveWithImage(blog, image);
            return ResponseEntity.ok("Add new blog successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("")
    public ResponseEntity<?>getBlogs(@RequestParam String title,
                                     @PageableDefault(page = 0, size = 10) Pageable pageable){
        try{
            Page<Blog> blogs= blogService.findAllByTitleContainingAndStateOrderByCreatedAtDesc(title,"active",pageable);
            Page<BlogResponse> blogResponses = blogs.map(blog -> {
                BlogResponse dto = new BlogResponse();
                dto.setBlogId(blog.getId());
                dto.setAccountId(blog.getAccountId());
                dto.setTitle(blog.getTitle());
                dto.setImage(blog.getImage());
                dto.setCreatedAt(blog.getCreatedAt());
                dto.setState(blog.getState());
                dto.setAccountUserName(accountService.findById(blog.getAccountId()).get().getUsername());
                return dto;
            });
            return ResponseEntity.ok(blogResponses);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(("An eror occurred"));
        }


    }

}
