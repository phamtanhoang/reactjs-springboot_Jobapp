package com.pth.jobapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="blog")
@Data
public class Blog {

    @Id
    @Column(name = "id")
    private String id;

    @Getter
    @Setter
    @Column(name = "title")
    private String title;

    @Getter
    @Setter
    @Column(name = "created_at")
    private Date createdAt ;

    @Getter
    @Setter
    @Column(name = "updated_at")
    private Date updatedAt ;

    @Getter
    @Setter
    @Column(name = "account_id")
    private String accountId;


    public Blog(){

    }


}
