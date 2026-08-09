package com.example.sbtimetableprj.dto;

public class TeacherDto {

    private Long teacherId;
    private String teacherName;
    private String email;
    private String phone;
    private String specialization;
    private String qualification;

    public TeacherDto() {
    }

    public TeacherDto(Long teacherId, String teacherName, String email,
                      String phone, String specialization, String qualification) {
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.email = email;
        this.phone = phone;
        this.specialization = specialization;
        this.qualification = qualification;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    @Override
    public String toString() {
        return "TeacherDto [teacherId=" + teacherId
                + ", teacherName=" + teacherName
                + ", email=" + email
                + ", phone=" + phone
                + ", specialization=" + specialization
                + ", qualification=" + qualification + "]";
    }
}