package com.pth.jobapp.controller;

import com.pth.jobapp.ResponseModels.ApplicationResponse;
import com.pth.jobapp.ResponseModels.BlogResponse;
import com.pth.jobapp.ResponseModels.CommentResponse;
import com.pth.jobapp.entity.*;
import com.pth.jobapp.service.*;
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
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

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

    @Autowired
    EmployerService employerService;

    @Autowired CandidateService candidateService;
    @GetMapping("")
    public ResponseEntity<?>getBlogs(@RequestParam String title,
                                     @PageableDefault(page = 0, size = 10) Pageable pageable){
        try{
            Page<Blog> blogs= blogService.findAllByTitleContainingAndActive(title,"active",pageable);
            Page<BlogResponse> blogResponses = blogs.map(blog -> {
                BlogResponse dto = new BlogResponse();
                dto.setBlogId(blog.getId());
                dto.setAccountId(blog.getAccountId());
                dto.setTitle(blog.getTitle());
                dto.setBlogImage(blog.getImage());
                dto.setName("admin");
                dto.setUserImage("https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg");
                dto.setContent(blog.getContent());
                if(accountService.findById(blog.getAccountId()).get().getRole().equals("employer")) {
                    dto.setName(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getName());
                    dto.setUserImage(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getImage());
                }
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

    @GetMapping("/blogDetails")
    public ResponseEntity<?>getBlogDetails(@RequestParam String blogId) {
        try {
            Optional<Blog> blogOptional = blogService.findByIdAndState(blogId, "active");
            if (blogOptional.isPresent()) {
                Blog blog = blogOptional.get();

                BlogResponse dto = new BlogResponse();
                dto.setBlogId(blog.getId());
                dto.setAccountId(blog.getAccountId());
                dto.setTitle(blog.getTitle());
                dto.setBlogImage(blog.getImage());
                dto.setContent(blog.getContent());
                dto.setName("admin");
                dto.setUserImage("https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg");
                if(accountService.findById(blog.getAccountId()).get().getRole().equals("employer")) {
                    dto.setName(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getName());
                    dto.setUserImage(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getImage());
                }
                dto.setCreatedAt(blog.getCreatedAt());
                dto.setState(blog.getState());
                dto.setAccountUserName(accountService.findById(blog.getAccountId()).get().getUsername());
                return ResponseEntity.ok(dto);
            } else {
                return ResponseEntity.badRequest().body("Can't find blog.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(("An eror occurred"));
        }
    }
    @GetMapping("/topBlogs")
    public ResponseEntity<?>getTopBlogs(){
        try{
            Page<Blog> blogs= blogService.findTop5JobsByApplyCount();
            Page<BlogResponse> blogResponses = blogs.map(blog -> {
                BlogResponse dto = new BlogResponse();
                dto.setBlogId(blog.getId());
                dto.setAccountId(blog.getAccountId());
                dto.setTitle(blog.getTitle());
                dto.setBlogImage(blog.getImage());
                dto.setName("admin");
                dto.setUserImage("https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg");
                dto.setContent(blog.getContent());
                if(accountService.findById(blog.getAccountId()).get().getRole().equals("employer")) {
                    dto.setName(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getName());
                    dto.setUserImage(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getImage());
                }
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


    @GetMapping("/employerBlogs")
    public ResponseEntity<?>getBlogs(@RequestHeader("Authorization")String token, @RequestParam String title,
                                     @PageableDefault(page = 0, size = 10) Pageable pageable){
        try{
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || !account.getRole().equals("employer")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }

            Page<Blog> blogs= blogService.findAllByTitleContainingAndAccountIdAndStateOrderByCreatedAtDesc(title, account.getId(), "active",pageable);
            Page<BlogResponse> blogResponses = blogs.map(blog -> {
                BlogResponse dto = new BlogResponse();
                dto.setBlogId(blog.getId());
                dto.setAccountId(blog.getAccountId());
                dto.setTitle(blog.getTitle());
                dto.setBlogImage(blog.getImage());
                dto.setContent(blog.getContent());
                dto.setName(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getName());
                dto.setUserImage(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getImage());
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
    @GetMapping("/employerBlogsById")
    public ResponseEntity<?>getemployerBlogsById( @RequestParam String employerId,
                                                  @PageableDefault(page = 0, size = 10) Pageable pageable){
        try{
            Account account = accountService.findById(employerService.findById(employerId).get().getAccountId()).get();

            Page<Blog> blogs= blogService.findAllByTitleContainingAndAccountIdAndStateOrderByCreatedAtDesc("",account.getId(), "active",pageable);
            Page<BlogResponse> blogResponses = blogs.map(blog -> {
                BlogResponse dto = new BlogResponse();
                dto.setBlogId(blog.getId());
                dto.setAccountId(blog.getAccountId());
                dto.setTitle(blog.getTitle());
                dto.setBlogImage(blog.getImage());
                dto.setContent(blog.getContent());
                dto.setName(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getName());
                dto.setUserImage(employerService.findByAccountUsername(accountService.findById(blog.getAccountId()).get().getUsername()).getImage());
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


    @GetMapping("/comments")
    public ResponseEntity<?>getComments(@RequestParam String blogId,Pageable pageable) {
        try {

            Page<Comment> comments = commentService.findByBlogId(blogId, pageable);

            Page<CommentResponse> commentResponses = comments.map(comment -> {
                CommentResponse dto = new CommentResponse();
                Account account = accountService.findById(comment.getAccountId()).get();
                dto.setId(comment.getId());
                dto.setAccountId(comment.getAccountId());
                dto.setAccountUserName(accountService.findById(comment.getAccountId()).get().getUsername());
                if (account.getRole().equals("candidate")) {
                    dto.setName(candidateService.findCandidateByAccountUsername(account.getUsername()).get().getFirstName() + " " + candidateService.findCandidateByAccountUsername(account.getUsername()).get().getLastName());
                    dto.setAvatar(candidateService.findCandidateByAccountUsername(account.getUsername()).get().getAvatar());
                }
                else if (account.getRole().equals("employer")) {
                    dto.setName(employerService.findByAccountUsername(account.getUsername()).getName());
                    dto.setAvatar(employerService.findByAccountUsername(account.getUsername()).getImage());
                } else {
                    dto.setName("admin");
                    dto.setAvatar("https://res.cloudinary.com/dcpatkvcu/image/upload/v1696784020/DoAnNganh/Host_And_Admin_Marketing_Job_Vacancies_Vector_Recruitment_Open_Job_Office_Girls_PNG_and_Vector_with_Transparent_Background_for_Free_Download_unyj7i.jpg");
                }
                dto.setComment(comment.getComment());
                dto.setBlogId(comment.getBlogId());
                dto.setCommentedAt(comment.getCommentedAt());
                dto.setCommentId(comment.getCommentId());
                return dto;
            });
            return ResponseEntity.ok(commentResponses);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(("An eror occurred"));

        }
    }
    @PostMapping("/create")
    public ResponseEntity<?> createBlog(@RequestHeader("Authorization") String token, @RequestPart Blog blog, @RequestPart(required = false) MultipartFile image) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            if (account == null || account.getRole().equals("candidate")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }
            blog.setAccountId(account.getId());
            blog.setId(UUID.randomUUID().toString());
            blog.setState("active");
            blog.setCreatedAt(new Date());
            if(image!=null)
                blogService.saveWithImage(blog, image);
            else
                blogService.saveBlog(blog);

            return ResponseEntity.ok("Add new blog successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }



    @PutMapping("/update")
    public ResponseEntity<?> updateBlog(@RequestHeader("Authorization") String token,@RequestParam String blogId,  @RequestPart Blog updatedBlog, @RequestPart(required = false) MultipartFile image) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || account.getRole().equals("candidate")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }

            Blog existingBlog = blogService.findById(blogId).get();

            if (existingBlog == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found");
            }

            if (!existingBlog.getAccountId().equals(account.getId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized to update this blog");
            }

            existingBlog.setTitle(updatedBlog.getTitle());
            existingBlog.setContent(updatedBlog.getContent());
            existingBlog.setCreatedAt(new Date());

            blogService.saveWithImage(existingBlog, image);

            return ResponseEntity.ok("Blog updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteBlog(@RequestHeader("Authorization") String token, @RequestParam String blogId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (account == null || account.getRole().equals("candidate")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization required!");
            }

            Blog blog = blogService.findById(blogId).get();
            if (blog == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Blog not found");
            }

            if (!blog.getAccountId().equals(account.getId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized to delete this blog");
            }

            blogService.deleteByIdAndAccountId(blogId, account.getId());

            return ResponseEntity.ok("Blog deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


    @PostMapping("/comment")
    public ResponseEntity<?>comment(@RequestHeader("Authorization")String token, @RequestParam String blogId, @RequestBody Comment comment){
        try{
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);
            comment.setCommentedAt(new Date());
            comment.setAccountId(account.getId());
            comment.setBlogId(blogId);
            comment.setId(UUID.randomUUID().toString());
            commentService.saveComment(comment);

            return  ResponseEntity.ok().body("Comment successfully");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PostMapping("/reply")
    public ResponseEntity<?>reply(@RequestHeader("Authorization")String token, @RequestParam String commentId, @RequestBody Comment reply){
        try{
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            String blogId = commentService.findById(commentId).get().getBlogId();
            reply.setCommentedAt(new Date());
            reply.setAccountId(account.getId());
            reply.setBlogId(blogId);
            reply.setId(UUID.randomUUID().toString());
            reply.setCommentId(commentId);
            commentService.saveComment(reply);

            return  ResponseEntity.ok().body("Reply successfully");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @DeleteMapping("/deleteSelfComment")
    public ResponseEntity<?> deleteComment(@RequestHeader("Authorization") String token, @RequestParam String commentId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (!commentService.findById(commentId).get().getAccountId().equals(account.getId())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized to delete this comment");
            }

            commentService.deleteComment(commentId);

            return ResponseEntity.ok("Comment deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }
    @GetMapping("/checkComment")
    public ResponseEntity<?> checkComment(@RequestHeader("Authorization") String token, @RequestParam String commentId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (commentService.findById(commentId).get().getAccountId().equals(account.getId())) {
                return ResponseEntity.ok(true);
            }

            return ResponseEntity.badRequest().body(false);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @DeleteMapping("/deleteBlogComment")
    public ResponseEntity<?> deleteBlogComment(@RequestHeader("Authorization") String token, @RequestParam String commentId) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            Account account = accountService.findByUsername(email);

            if (blogService.findByIdAndAccountId(commentService.findById(commentId).get().getBlogId(), account.getId()).isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized to delete this comment");
            }
            commentService.deleteComment(commentId);

            return ResponseEntity.ok("Comment deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

}
