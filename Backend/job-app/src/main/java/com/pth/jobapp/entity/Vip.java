package com.pth.jobapp.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name="vip")
@Data
public class Vip {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "fromDate")
    private String fromDate;

    @Column(name = "toDate")
    private String toDate;

    @Column(name = "employerId")
    private String employerId;

    public Vip(){

    }

    public Vip(String fromDate, String toDate, String employerId) {
        this.id = String.valueOf(UUID.randomUUID());
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.employerId = employerId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getEmployerId() {
        return employerId;
    }

    public void setEmployerId(String employerId) {
        this.employerId = employerId;
    }
}
