package com.pth.jobapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="account")
@Data
public class Account {

    @Id
    @Getter
    @Setter
    @Column(name = "id")
    private String id;

    @Getter
    @Setter
    @Column(name = "created_at")
    private Date createAt;

    @Getter
    @Setter
    @Column(name = "state")
    private String state;

    @Getter
    @Setter
    @Column(name = "role")
    private String role;

    @Getter
    @Setter
    @Column(name = "username")
    private String username;

    @Getter
    @Setter
    @Column(name = "password")
    private String password;

    public Account(){

    }

    public Account(Date createAt, String state, String role, String username, String password) {
        this.id = String.valueOf(UUID.randomUUID());
        this.createAt = createAt;
        this.state = state;
        this.role = role;
        this.username = username;
        this.password = password;
    }


}
