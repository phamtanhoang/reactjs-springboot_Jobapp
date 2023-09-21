package com.pth.jobapp.entity;

import lombok.Data;
import lombok.Getter;

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
    @Column(name = "last_name")
    private String lastName;

    @Getter
    @Column(name = "avatar")
    private String avatar;

    @Getter
    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    @Getter
    @Column(name = "sex")
    private String sex;


    @Getter
    @Column(name = "account_id")
    private String accountId;

    public Candidate() {

    };

    public Candidate(String firstName, String lastName, String avatar, Date dateOfBirth, String sex, String accountId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.accountId = accountId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }
}