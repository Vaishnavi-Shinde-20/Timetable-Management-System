package com.example.sbtimetableprj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.sbtimetableprj.model.Course;
import com.example.sbtimetableprj.service.CourseService;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Add Course
    @PostMapping("/add")
    public Course addCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    // Get Course by ID
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable("id") Long courseId) {
        return courseService.getCourseById(courseId);
    }

    // Get All Courses
    @GetMapping("/all")
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // Update Course
    @PutMapping("/update/{id}")
    public Course updateCourse(@PathVariable("id") Long courseId,
                               @RequestBody Course course) {
        return courseService.updateCourse(courseId, course);
    }

    // Delete Course
    @DeleteMapping("/delete/{id}")
    public String deleteCourse(@PathVariable("id") Long courseId) {

        courseService.deleteCourse(courseId);

        return "Course deleted successfully.";
    }
}