package com.pth.jobapp.service;

import com.pth.jobapp.dao.CategoryRepository;
import com.pth.jobapp.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Optional<Category>findById(String id){return categoryRepository.findById(id);}
}