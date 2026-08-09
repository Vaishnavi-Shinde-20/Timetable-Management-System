package com.example.sbtimetableprj.service;

import java.util.List;

import com.example.sbtimetableprj.model.Student;

public interface StudentService {

    // Register Student
    Student saveStudent(Student student);

    // Get Student By Id
    Student getStudentById(Long studentId);

    // Get All Students
    List<Student> getAllStudents();

    // Update Student
    Student updateStudent(Long studentId, Student student);

    // Delete Student
    void deleteStudent(Long studentId);

    // Login Student
    Student loginStudent(String email, String password);
}