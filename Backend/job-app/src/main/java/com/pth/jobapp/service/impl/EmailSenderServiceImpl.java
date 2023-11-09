package com.pth.jobapp.service.impl;
import com.pth.jobapp.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {

    private final JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    public EmailSenderServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendEmail(String to, String name, String jobName, String jobId , String state, String templateName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("jobName", jobName);
        context.setVariable("jobId", jobId);
        System.out.println(state);
        context.setVariable("state", state);
        String html = templateEngine.process(templateName, context);

        helper.setFrom("${EMAIL}");
        helper.setTo(to);
        helper.setSubject("JOBS THÔNG BÁO");
        helper.setText(html, true);

        mailSender.send(message);
    }
}
