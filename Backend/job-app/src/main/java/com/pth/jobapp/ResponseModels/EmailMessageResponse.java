package com.pth.jobapp.ResponseModels;

public class EmailMessageResponse {

    private String to;
    private String jobName;
    private String jobId;

    private String name;

    public EmailMessageResponse() {
    }

    public EmailMessageResponse(String to, String jobName, String jobId, String name) {
        this.to = to;
        this.jobName = jobName;
        this.jobId = jobId;
        this.name = name;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
