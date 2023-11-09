package com.pth.jobapp.service;

import javax.mail.MessagingException;

public interface EmailSenderService {
    void sendEmail(String to, String name, String jobName, String jobId, String state, String templateName) throws MessagingException;
}
