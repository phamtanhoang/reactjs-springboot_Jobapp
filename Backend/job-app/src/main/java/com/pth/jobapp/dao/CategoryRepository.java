package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, String> {
    @Query("SELECT c FROM Category c WHERE" +
            " (:name IS NULL OR c.name LIKE %:name%)")
    Page<Category> findByName(
            @RequestParam(name = "name", required = false) String name,
            Pageable pageable
    );

    @Query("select c from Category c where c.id in :id")
    List<Category> findById (@Param("id") String id, Pageable pageable);
}
