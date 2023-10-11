package com.pth.jobapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="candidate")
@Data
public class Candidate {
    @Id
    @Column(name = "id")
    private String id;

    @Getter
    @Column(name = "first_name")
    private String firstName;

    @Getter
    @Setter
    @Column(name = "last_name")
    private String lastName;

    @Getter
    @Setter
    @Column(name = "avatar")
    private String avatar;

        @Getter
        @Setter
    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Getter
    @Setter
    @Column(name = "sex")
    private String sex;


    @Getter
    @Setter
    @Column(name = "account_id")
    private String accountId;


    @Getter
    @Setter
    @Column(name = "skill")
    private String skill;

    @Getter
    @Setter
    @Column(name = "experience")
    private String experience;

    public Candidate() {

    };


}