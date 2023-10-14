package com.pth.jobapp.controller;

import com.pth.jobapp.dao.EmployerRepository;
import com.pth.jobapp.entity.Category;
import com.pth.jobapp.entity.Employer;
import com.pth.jobapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.awt.print.Pageable;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

}
