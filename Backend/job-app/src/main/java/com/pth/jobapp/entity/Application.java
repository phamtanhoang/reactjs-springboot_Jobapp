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
    private String CV;

    @Getter
    @Column(name = "letter")
    private String letter;
    @Getter
    @Column(name = "state")
    private String state;

    @Getter
    @Column(name = "job_id")
    private String jobId;

    @Getter
    @Column(name = "candidate_id")
    private String candidateId;



    public Application() {
    }

    public Application(Date applyDate, String letter, String state, String jobId, String candidateId  ) {
        this.applyDate = applyDate;
        this.letter = letter;
        this.state = state;
        this.jobId = jobId;
        this.candidateId = candidateId;
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
        return CV;
    }

    public void setCV(String CV) {
        this.CV = CV;
    }
}