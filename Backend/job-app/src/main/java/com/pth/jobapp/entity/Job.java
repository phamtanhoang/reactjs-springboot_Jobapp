package com.pth.jobapp.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="job")
@Data
public class Job {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "salary")
    private String salary;

    @Column(name = "fromDate")
    private String fromDate;

    @Column(name = "toDate")
    private String toDate;

    @Column(name = "address")
    private String address;

    @Column(name = "categoryID")
    private String categoryId;

    @Column(name = "employerID")
    private String employerId;

    @Column(name = "active")
    private boolean active;

    public Job(){
    }
    public Job(String title, String description, String salary, String fromDate, String toDate, String address, String categoryId, String employerId, boolean active) {
        this.id = String.valueOf(UUID.randomUUID());
        this.title = title;
        this.description = description;
        this.salary = salary;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.address = address;
        this.categoryId = categoryId;
        this.employerId = employerId;
        this.active = active;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getEmployerId() {
        return employerId;
    }

    public void setEmployerId(String employerId) {
        this.employerId = employerId;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}

