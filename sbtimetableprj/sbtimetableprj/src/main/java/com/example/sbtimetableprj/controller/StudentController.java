package com.example.sbtimetableprj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.sbtimetableprj.model.Student;
import com.example.sbtimetableprj.service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Register Student
    @PostMapping("/register")
    public Student registerStudent(@RequestBody Student student) {

        return studentService.saveStudent(student);
    }

    // Student Login
    @PostMapping("/login")
    public Student loginStudent(@RequestParam String email,
                                @RequestParam String password) {

        return studentService.loginStudent(email, password);
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {

        return studentService.getStudentById(id);
    }

    // Get All Students
    @GetMapping("/all")
    public List<Student> getAllStudents() {

        return studentService.getAllStudents();
    }

    // Update Student
    @PutMapping("/update/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @RequestBody Student student) {

        return studentService.updateStudent(id, student);
    }

    // Delete Student
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully.";
    }

}