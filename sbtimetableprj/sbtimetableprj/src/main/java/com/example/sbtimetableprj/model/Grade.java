package com.example.sbtimetableprj.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "grade")
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id")
    private Long gradeId;

    @Column(name = "grade_name", nullable = false, unique = true)
    private String gradeName;

    @Column(name = "description")
    private String description;

    public Grade() {
    }

    public Grade(Long gradeId, String gradeName, String description) {
        this.gradeId = gradeId;
        this.gradeName = gradeName;
        this.description = description;
    }

    public Long getGradeId() {
        return gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
    }

    public String getGradeName() {
        return gradeName;
    }

    public void setGradeName(String gradeName) {
        this.gradeName = gradeName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Grade [gradeId=" + gradeId + ", gradeName=" + gradeName
                + ", description=" + description + "]";
    }
}