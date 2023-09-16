package com.pth.jobapp.controller;

import com.pth.jobapp.entity.Job;
import com.pth.jobapp.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("localhost:5173/")
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    @Autowired
    private JobService jobService;
    @GetMapping("/api/jobs")
    public ResponseEntity<Page<Job>> getAllJobs(Pageable pageable) {
        Page<Job> jobs = jobService.findAll(pageable);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/findByTitleAndAddress")
    public ResponseEntity<PagedModel<EntityModel<Job>>> findByTitleAndAddress(
            @RequestParam("title") String title,
            @RequestParam("address") String address,
            Pageable pageable) {
        Page<Job> jobs = jobService.findByTitleAndAddress(title, address, pageable);

        // Tạo các liên kết cho phần tử "self" và phân trang
        Link selfLink = Link.of(WebMvcLinkBuilder.linkTo(JobController.class)
                .toUriComponentsBuilder()
                .replaceQueryParam("page", pageable.getPageNumber())
                .replaceQueryParam("size", pageable.getPageSize())
                .toUriString());
        Link profileLink = Link.of("http://localhost:8080/api/profile/jobs");
        Link searchLink = Link.of("http://localhost:8080/api/jobs/search");

        // Tạo danh sách EntityModel cho các công việc
        List<EntityModel<Job>> jobModels = jobs.getContent().stream()
                .map(job -> EntityModel.of(job,
                        selfLink,
                        WebMvcLinkBuilder.linkTo(JobController.class)
                                .slash(job.getId()).withRel("job")))
                .collect(Collectors.toList());

        // Tạo đối tượng PageMetadata cho phân trang
        PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(jobs.getNumberOfElements(), jobs.getNumber(), jobs.getTotalElements());

        // Tạo đối tượng PagedModel bao gồm danh sách công việc và các liên kết/phân trang
        PagedModel<EntityModel<Job>> pagedModel = PagedModel.of(jobModels, pageMetadata);
        pagedModel.add(selfLink, profileLink, searchLink);

        return ResponseEntity.ok(pagedModel);
    }
    @GetMapping("/findById")
    public ResponseEntity<PagedModel<EntityModel<Job>>>findById(@RequestParam("id")String id,Pageable pageable)
    {
        Page<Job> jobs = jobService.findById(id,pageable);
        PagedModel.PageMetadata pageMetadata = new PagedModel.PageMetadata(jobs.getNumberOfElements(), jobs.getNumber(), jobs.getTotalElements());
        // Tạo các liên kết cho phần tử "self" và phân trang
        Link selfLink = Link.of(WebMvcLinkBuilder.linkTo(JobController.class)
                .toUriComponentsBuilder()
                .replaceQueryParam("page", pageable.getPageNumber())
                .replaceQueryParam("size", pageable.getPageSize())
                .toUriString());
        Link profileLink = Link.of("http://localhost:8080/api/profile/jobs");
        Link searchLink = Link.of("http://localhost:8080/api/jobs/search");
        List<EntityModel<Job>> jobModels = jobs.getContent().stream()
                .map(job -> EntityModel.of(job,
                        selfLink,
                        WebMvcLinkBuilder.linkTo(JobController.class)
                                .slash(job.getId()).withRel("job")))
                .collect(Collectors.toList());

        // Tạo đối tượng PagedModel bao gồm danh sách công việc và các liên kết/phân trang
        PagedModel<EntityModel<Job>> pagedModel = PagedModel.of(jobModels, pageMetadata);
        pagedModel.add(selfLink, profileLink, searchLink);
        return ResponseEntity.ok(pagedModel);
    }
    @GetMapping("/findByCategoryId")
    public Page<Job> findByCategory(@RequestParam("categoryId") String categoryId, Pageable pageable){
        return jobService.findByCategoryId(categoryId, pageable);
    }
}
