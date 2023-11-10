package com.example.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "results", schema = "s368982")
@Setter
@EqualsAndHashCode
@ToString
public class PointsResultEntity {
    private long id;
    private double x;
    private double y;
    private double r;
    private boolean result;
    private LocalDateTime time;
    private LocalDateTime executionTime;

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence-generator")
    @SequenceGenerator(name = "sequence-generator", sequenceName = "lab3_x_test_table_id_seq", allocationSize = 1)
    public long getId() {
        return id;
    }

    @Column
    public double getX() {
        return x;
    }

    @Column
    public double getY() {
        return y;
    }

    @Column
    public double getR() {
        return r;
    }

    @Column
    public boolean isResult() {
        return result;
    }

    @Column
    public LocalDateTime getTime() {
        return time;
    }

    @Column
    public LocalDateTime getExecutionTime() {
        return executionTime;
    }



}
