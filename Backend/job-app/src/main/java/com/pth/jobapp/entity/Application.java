package com.pth.jobapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="application")
@Data
public class Application {
    @Id
    @Getter
    @Setter
    @Column(name = "id")
    private String id;

    @Getter
    @Setter
    @Column(name = "apply_date")
    private Date applyDate;

    @Getter
    @Setter
    @Column(name = "CV")
    private String cV;

    @Getter
    @Setter
    @Column(name = "letter")
    private String letter;

    @Getter
    @Setter
    @Column(name = "state")
    private String state;

    @Getter
    @Setter
    @Column(name = "job_id")
    private String jobId;

    @Getter
    @Setter
    @Column(name="name")
    private String name;

    @Getter
    @Setter
    @Column(name="email")
    private String email;

    @Getter
    @Setter
    @Column(name = "phone_number")
    private String phoneNumber;

    @Getter
    @Setter
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

}