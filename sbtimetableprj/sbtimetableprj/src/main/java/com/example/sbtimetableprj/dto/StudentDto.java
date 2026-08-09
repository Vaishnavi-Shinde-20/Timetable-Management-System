package com.example.sbtimetableprj.dto;

public class StudentDto {

    private Long studentId;
    private String studentName;
    private String email;
    private String phone;
    private String rollNumber;

    public StudentDto() {
    }

    public StudentDto(Long studentId, String studentName, String email,
                      String phone, String rollNumber) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.email = email;
        this.phone = phone;
        this.rollNumber = rollNumber;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
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

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    @Override
    public String toString() {
        return "StudentDto [studentId=" + studentId
                + ", studentName=" + studentName
                + ", email=" + email
                + ", phone=" + phone
                + ", rollNumber=" + rollNumber + "]";
    }
}