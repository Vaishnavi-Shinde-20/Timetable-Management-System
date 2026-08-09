package com.example.sbtimetableprj.dto;

public class GradeDto {

    private Long gradeId;
    private String gradeName;
    private String description;

    public GradeDto() {
    }

    public GradeDto(Long gradeId, String gradeName, String description) {
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
        return "GradeDto [gradeId=" + gradeId
                + ", gradeName=" + gradeName
                + ", description=" + description + "]";
    }
}