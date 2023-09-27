package com.pth.jobapp.service;

import com.pth.jobapp.dao.FavoriteRepository;
import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Favorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {
    @Autowired
    FavoriteRepository favoriteRepository;

    public List<Favorite> findByCandidateId(String id){
        return favoriteRepository.findByCandidateId(id);
    }
    public Favorite save(Favorite favorite) {
        return favoriteRepository.save(favorite);}

    public Optional<Favorite> findByCandidateIdAndJobId(String candidateId, String jobId){
        return  favoriteRepository.findByCandidateIdAndJobId(candidateId,jobId);
    }

    public void delete(Favorite favorite) {
        favoriteRepository.delete(favorite);
    }
}
