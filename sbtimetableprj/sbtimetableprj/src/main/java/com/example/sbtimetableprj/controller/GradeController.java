package com.example.sbtimetableprj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.sbtimetableprj.model.Grade;
import com.example.sbtimetableprj.service.GradeService;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "http://localhost:3000")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    // Add Grade
    @PostMapping("/add")
    public Grade addGrade(@RequestBody Grade grade) {

        return gradeService.saveGrade(grade);

    }

    // Get Grade By Id
    @GetMapping("/{id}")
    public Grade getGradeById(@PathVariable Long id) {

        return gradeService.getGradeById(id);

    }

    // Get All Grades
    @GetMapping("/all")
    public List<Grade> getAllGrades() {

        return gradeService.getAllGrades();

    }

    // Update Grade
    @PutMapping("/update/{id}")
    public Grade updateGrade(@PathVariable Long id,
                             @RequestBody Grade grade) {

        return gradeService.updateGrade(id, grade);

    }

    // Delete Grade
    @DeleteMapping("/delete/{id}")
    public String deleteGrade(@PathVariable Long id) {

        gradeService.deleteGrade(id);

        return "Grade deleted successfully.";

    }

}