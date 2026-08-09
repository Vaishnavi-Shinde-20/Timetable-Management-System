package com.example.sbtimetableprj.service;

import java.util.List;

import com.example.sbtimetableprj.model.Course;

public interface CourseService {

    // Add Course
    Course saveCourse(Course course);

    // Get Course by Id
    Course getCourseById(Long courseId);

    // Get All Courses
    List<Course> getAllCourses();

    // Update Course
    Course updateCourse(Long courseId, Course course);

    // Delete Course
    void deleteCourse(Long courseId);

}