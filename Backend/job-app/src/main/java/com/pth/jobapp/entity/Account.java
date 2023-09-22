package com.pth.jobapp.entity;

import lombok.Data;

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
    @Column(name = "id")
    private String id;

    @Column(name = "created_at")
    private Date createAt;

    @Column(name = "state")
    private String state;

    @Column(name = "role")
    private String role;

    @Column(name = "username")
    private String username;

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
