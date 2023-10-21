package com.pth.jobapp.ResponseModels;

import java.util.Date;

public class VipResponse {
    String employerVipId;
    Date fromDate;
    Date toDate;
    float price;
    String employerId;
    String vipId;
    String vipName;
    String employerName;
    String employerUsername;
    String image;

    public String getEmployerVipId() {
        return employerVipId;
    }

    public void setEmployerVipId(String employerVipId) {
        this.employerVipId = employerVipId;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getEmployerId() {
        return employerId;
    }

    public void setEmployerId(String employerId) {
        this.employerId = employerId;
    }

    public String getVipId() {
        return vipId;
    }

    public void setVipId(String vipId) {
        this.vipId = vipId;
    }

    public String getVipName() {
        return vipName;
    }

    public void setVipName(String vipName) {
        this.vipName = vipName;
    }

    public String getEmployerName() {
        return employerName;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public String getEmployerUsername() {
        return employerUsername;
    }

    public void setEmployerUsername(String employerUsername) {
        this.employerUsername = employerUsername;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
