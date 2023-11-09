package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Blog;
import com.pth.jobapp.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog,String> {
    Page<Blog> findByAccountId(String accountId,Pageable pageable);

    Page<Blog> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Blog> findAllByTitleContainingOrderByCreatedAtDesc(String title, Pageable pageable);

    Page<Blog> findAllByTitleContainingAndStateContainingOrderByCreatedAtDesc(String title,String state, Pageable pageable);

    Page<Blog>findAllByTitleContainingAndStateOrderByCreatedAtDesc(String title,String state, Pageable pageable);
    Page<Blog>findAllByTitleContainingAndAccountIdAndStateOrderByCreatedAtDesc(String title,String accountId,String state,Pageable pageable);
    void deleteByIdAndAccountId(String id, String accountId);

    Optional<Blog>findByIdAndAccountId(String id, String accountId);

    Optional<Blog>findByIdAndState(String id, String state);

    @Query("SELECT b FROM Blog b join Comment c On b.id=c.blogId where b.state= 'active' GROUP BY b.id ORDER BY COUNT(c) DESC")
    Page<Blog> findTop5BlogsByCommentCount(Pageable pageable);

    @Query("SELECT COUNT(b) FROM Blog b")
    Long countAll();

}
