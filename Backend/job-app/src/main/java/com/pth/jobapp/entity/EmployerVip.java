package com.pth.jobapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name="employer_vip")
@Data
public class EmployerVip {
    @Id
    @Column(name = "id")
    private String id;

    @Getter
    @Setter
    @Column(name = "from_date")
    private Date fromDate;

    @Getter
    @Setter
    @Column(name = "to_date")
    private Date toDate;

    @Getter
    @Setter
    @Column(name ="price")
    private float price;

    @Getter
    @Setter
    @Column(name = "employer_id")
    private String employerId;

    @Getter
    @Setter
    @Column(name = "vip_id")
    private String vipId;


}
