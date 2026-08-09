package com.example.sbtimetableprj.service;

import java.util.List;

import com.example.sbtimetableprj.model.Teacher;

public interface TeacherService {

    // Register Teacher
    Teacher saveTeacher(Teacher teacher);

    // Get Teacher by Id
    Teacher getTeacherById(Long teacherId);

    // Get All Teachers
    List<Teacher> getAllTeachers();

    // Update Teacher
    Teacher updateTeacher(Long teacherId, Teacher teacher);

    // Delete Teacher
    void deleteTeacher(Long teacherId);

    // Login Teacher
    Teacher loginTeacher(String email, String password);
}