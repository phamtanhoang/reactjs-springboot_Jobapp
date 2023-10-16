    package com.pth.jobapp.ResponseModels;

    import java.util.Date;

    public class ApplicationResponse {
        String id;
        String accountId;
        String accountName;
        String userName;
        String image;
        String jobId;
        Date applyDate;
        String title;
        String state;
        String employerId;

        String employerName;

        Date expiredDate;

        public String getEmployerId() {
            return employerId;
        }

        public void setEmployerId(String employerId) {
            this.employerId = employerId;
        }

        public String getEmployerName() {
            return employerName;
        }

        public void setEmployerName(String employerName) {
            this.employerName = employerName;
        }



        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getAccountId() {
            return accountId;
        }

        public void setAccountId(String accountId) {
            this.accountId = accountId;
        }

        public String getAccountName() {
            return accountName;
        }

        public void setAccountName(String accountName) {
            this.accountName = accountName;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getJobId() {
            return jobId;
        }

        public void setJobId(String jobId) {
            this.jobId = jobId;
        }

        public Date getApplyDate() {
            return applyDate;
        }

        public void setApplyDate(Date applyDate) {
            this.applyDate = applyDate;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }

        public Date getExpiredDate() {
            return expiredDate;
        }

        public void setExpiredDate(Date expiredDate) {
            this.expiredDate = expiredDate;
        }
    }
