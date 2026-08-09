package com.example.sbtimetableprj.dto;

public class CourseDto {

    private Long courseId;
    private String courseName;
    private String courseCode;
    private Integer credits;
    private Long gradeId;

    public CourseDto() {
    }

    public CourseDto(Long courseId, String courseName, String courseCode,
                     Integer credits, Long gradeId) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.credits = credits;
        this.gradeId = gradeId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public Long getGradeId() {
        return gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
    }

    @Override
    public String toString() {
        return "CourseDto [courseId=" + courseId
                + ", courseName=" + courseName
                + ", courseCode=" + courseCode
                + ", credits=" + credits
                + ", gradeId=" + gradeId + "]";
    }
}