package com.pth.jobapp.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="category")
@Data
public class Category {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    public Category(){
    };

    public Category(String name) {
        this.id = String.valueOf(UUID.randomUUID());
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
