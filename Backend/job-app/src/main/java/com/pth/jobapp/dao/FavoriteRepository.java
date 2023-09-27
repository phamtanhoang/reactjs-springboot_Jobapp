package com.pth.jobapp.dao;

import com.pth.jobapp.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository  extends JpaRepository<Favorite,String> {
    List<Favorite> findByCandidateId(String id);
    Optional<Favorite> findByCandidateIdAndJobId(String candidateId,String jobId);

}
