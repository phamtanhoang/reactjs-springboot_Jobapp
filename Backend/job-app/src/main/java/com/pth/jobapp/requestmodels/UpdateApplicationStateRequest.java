package com.pth.jobapp.requestmodels;

public class UpdateApplicationStateRequest {
    private String newState;
    private String applicationId;

    public String getNewState() {
        return newState;
    }

    public void setNewState(String newState) {
        this.newState = newState;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }
}