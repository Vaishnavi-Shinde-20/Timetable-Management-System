package com.example.sbtimetableprj.service;

import java.util.List;

import com.example.sbtimetableprj.model.Grade;

public interface GradeService {

    // Add Grade
    Grade saveGrade(Grade grade);

    // Get Grade by Id
    Grade getGradeById(Long gradeId);

    // Get All Grades
    List<Grade> getAllGrades();

    // Update Grade
    Grade updateGrade(Long gradeId, Grade grade);

    // Delete Grade
    void deleteGrade(Long gradeId);

}