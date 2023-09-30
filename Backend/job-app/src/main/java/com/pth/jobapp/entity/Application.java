package com.pth.jobapp.entity;

import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="application")
@Data
public class Application {
    @Id
    @Column(name = "id")
    private String id;

    @Getter
    @Column(name = "apply_date")
    private Date applyDate;

    @Getter
    @Column(name = "CV")
    private String cV;

    @Getter
    @Column(name = "letter")
    private String letter;
    @Getter
    @Column(name = "state")
    private String state;

    @Getter
    @Column(name = "job_id")
    private String jobId;
    @Column(name="name")
    private String name;
    @Column(name="email")
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;

    @Getter
    @Column(name = "candidate_id")
    private String candidateId;



    public Application() {
    }

    public Application(String cV, String letter, String jobId, String name, String email, String phoneNumber) {
        this.cV = cV;
        this.letter = letter;
        this.jobId = jobId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(Date applyDate) {
        this.applyDate = applyDate;
    }

    public String getLetter() {
        return letter;
    }

    public void setLetter(String letter) {
        this.letter = letter;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getCV() {
        return cV;
    }

    public void setCV(String CV) {
        this.cV = CV;
    }

    public String getcV() {
        return cV;
    }

    public void setcV(String cV) {
        this.cV = cV;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}