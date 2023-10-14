package com.pth.jobapp.service;

import com.pth.jobapp.dao.CategoryRepository;
import com.pth.jobapp.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public Optional<Category> findById(String id) {
        return categoryRepository.findById(id);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public void deleteById(String id) {
        categoryRepository.deleteById(id);
    }

    public Page<Category> findByName(String name, Pageable pageable){return  categoryRepository.findByName(name,pageable);}



}
