package com.pth.jobapp.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="employer")
@Data
public class Employer {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "banner")
    private String banner;


    @Column(name = "account_id")
    private String accountId;

    public Employer(){

    };

    public Employer(String name, String address, String description, String image, String banner, String accountId) {
        this.id = String.valueOf(UUID.randomUUID());
        this.name = name;
        this.address = address;
        this.description = description;
        this.image = image;
        this.banner = banner;
        this.accountId = accountId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String coverImage) {
        this.banner = banner;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String email) {
        this.accountId = accountId;
    }


}
