package com.pth.jobapp.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="favorite")
@Data
public class Favorite {

    @Id
    @Column(name = "candidate_id")
    private String candidateId;

    @Column(name = "job_id")
    private String jobId;

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public Favorite() {
    }

    public Favorite(String candidateId, String jobId) {
        this.candidateId = candidateId;
        this.jobId = jobId;
    }
}