package com.pth.jobapp.requestmodels;

import com.pth.jobapp.entity.Account;
import com.pth.jobapp.entity.Employer;

public class EmployerRegistrationRequest {
    private String username;
    private String password;
    private String name;
    private String address;
    private String description;



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


}
