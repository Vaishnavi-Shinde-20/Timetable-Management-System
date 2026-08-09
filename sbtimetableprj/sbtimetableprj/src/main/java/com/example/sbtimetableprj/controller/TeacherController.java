package com.example.sbtimetableprj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.sbtimetableprj.model.Teacher;
import com.example.sbtimetableprj.service.TeacherService;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    // Register Teacher
    @PostMapping("/register")
    public Teacher registerTeacher(@RequestBody Teacher teacher) {

        return teacherService.saveTeacher(teacher);
    }

    // Teacher Login
    @PostMapping("/login")
    public Teacher loginTeacher(@RequestParam String email,
                                @RequestParam String password) {

        return teacherService.loginTeacher(email, password);
    }

    // Get Teacher By Id
    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable Long id) {

        return teacherService.getTeacherById(id);
    }

    // Get All Teachers
    @GetMapping("/all")
    public List<Teacher> getAllTeachers() {

        return teacherService.getAllTeachers();
    }

    // Update Teacher
    @PutMapping("/update/{id}")
    public Teacher updateTeacher(@PathVariable Long id,
                                 @RequestBody Teacher teacher) {

        return teacherService.updateTeacher(id, teacher);
    }

    // Delete Teacher
    @DeleteMapping("/delete/{id}")
    public String deleteTeacher(@PathVariable Long id) {

        teacherService.deleteTeacher(id);

        return "Teacher deleted successfully.";
    }
}