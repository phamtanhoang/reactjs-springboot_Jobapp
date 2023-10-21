package com.pth.jobapp.service;


import com.pth.jobapp.dao.VipRepository;
import com.pth.jobapp.entity.Vip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VipService {
    @Autowired
    VipRepository vipRepository;

    public Page<Vip>findByNameContaining(String name, Pageable pageable){return vipRepository.findByNameContaining(name,pageable);}

    public Vip save(Vip vip){return vipRepository.save(vip);}

    public  void  delete(String vipId){vipRepository.deleteById(vipId);}

    public Optional<Vip>findById(String vipId){return  vipRepository.findById(vipId);}

    public List<Vip> findAll(){return vipRepository.findAll();}

    public List<Vip>findAllByState(String state){return  vipRepository.findAllByState(state);}

}
