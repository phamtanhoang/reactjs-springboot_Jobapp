package com.pth.jobapp.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="vip")
@Data
public class Vip {
    @Id
    @Column(name = "id")
    String id;

    @Getter
    @Setter
    @Column(name = "name")
    String name;

    @Getter
    @Setter
    @Column(name = "amount")
    int amount;

    @Getter
    @Setter
    @Column(name = "price")
    float price;

    @Getter
    @Setter
    @Column(name = "state")
    String state;

}
