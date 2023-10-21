package com.pth.jobapp.service;

import com.pth.jobapp.dao.EmployerVipRepository;
import com.pth.jobapp.entity.EmployerVip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployerVipService {
    @Autowired
    EmployerVipRepository employerVipRepository;
    public Page<EmployerVip> findByVipId(String vipId, Pageable pageable){return employerVipRepository.findByVipId(vipId,pageable);  }
    public Page<EmployerVip>findByEmployerNameContaining(String name,Pageable pageable){return  employerVipRepository.findByEmployerNameContaining(name,pageable);}
    public List<EmployerVip> findByVipIdWithList(String vipId){return employerVipRepository.findByVipIdWithList(vipId);  }
    public Optional<EmployerVip>findById(String id){return employerVipRepository.findById(id);}

    public Optional<EmployerVip>findByIdAndEmployerId(String id,String employerId){return employerVipRepository.findByIdAndEmployerId(id,employerId);}

    public EmployerVip save(EmployerVip employerVip){return employerVipRepository.save(employerVip);}

    public Optional<EmployerVip>findByEmployerIdAndAvailable(String employerId){return  employerVipRepository.findLatestByEmployerId(employerId);}

    public Page<EmployerVip>findByEmployerId(String employerId,Pageable pageable){return employerVipRepository.findByEmployerId(employerId,pageable);}
    public void delete(String employerVipId){ employerVipRepository.deleteById(employerVipId);}


}
