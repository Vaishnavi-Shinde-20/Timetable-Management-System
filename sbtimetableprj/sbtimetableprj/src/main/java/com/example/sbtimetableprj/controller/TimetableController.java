package com.example.sbtimetableprj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.sbtimetableprj.model.Batch;
import com.example.sbtimetableprj.model.Grade;
import com.example.sbtimetableprj.model.Teacher;
import com.example.sbtimetableprj.model.Timetable;
import com.example.sbtimetableprj.service.TimetableService;

@RestController
@RequestMapping("/api/timetables")
@CrossOrigin(origins = "http://localhost:3000")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    // Add Timetable
    @PostMapping("/add")
    public Timetable addTimetable(@RequestBody Timetable timetable) {

        return timetableService.saveTimetable(timetable);
    }

    // Get Timetable By ID
    @GetMapping("/{id}")
    public Timetable getTimetableById(@PathVariable Long id) {

        return timetableService.getTimetableById(id);
    }

    // Get All Timetables
    @GetMapping("/all")
    public List<Timetable> getAllTimetables() {

        return timetableService.getAllTimetables();
    }

    // Update Timetable
    @PutMapping("/update/{id}")
    public Timetable updateTimetable(
            @PathVariable Long id,
            @RequestBody Timetable timetable) {

        return timetableService.updateTimetable(id, timetable);
    }

    // Delete Timetable
    @DeleteMapping("/delete/{id}")
    public String deleteTimetable(@PathVariable Long id) {

        timetableService.deleteTimetable(id);

        return "Timetable deleted successfully.";
    }

    // Get Timetable By Teacher
    @PostMapping("/teacher")
    public List<Timetable> getTimetableByTeacher(
            @RequestBody Teacher teacher) {

        return timetableService.getTimetableByTeacher(teacher);
    }

    // Teacher Dashboard Timetable
    @GetMapping("/teacher/{teacherId}")
    public List<Timetable> getTeacherTimetable(
            @PathVariable Long teacherId) {

        Teacher teacher = new Teacher();
        teacher.setTeacherId(teacherId);

        return timetableService.getTimetableByTeacher(teacher);
    }

    // Student Dashboard Timetable
    @GetMapping("/student/{studentId}")
    public List<Timetable> getStudentTimetable(
            @PathVariable Long studentId) {

        return timetableService.getTimetableByStudent(studentId);
    }

    // Get Timetable By Grade
    @PostMapping("/grade")
    public List<Timetable> getTimetableByGrade(
            @RequestBody Grade grade) {

        return timetableService.getTimetableByGrade(grade);
    }

    // Get Timetable By Batch
    @PostMapping("/batch")
    public List<Timetable> getTimetableByBatch(
            @RequestBody Batch batch) {

        return timetableService.getTimetableByBatch(batch);
    }

    // Get Timetable By Grade And Batch
    @PostMapping("/grade-batch")
    public List<Timetable> getTimetableByGradeAndBatch(
            @RequestParam Long gradeId,
            @RequestParam Long batchId) {

        Grade grade = new Grade();
        grade.setGradeId(gradeId);

        Batch batch = new Batch();
        batch.setBatchId(batchId);

        return timetableService.getTimetableByGradeAndBatch(
                grade,
                batch);
    }

    // Get Timetable By Day
    @GetMapping("/day/{day}")
    public List<Timetable> getTimetableByDay(
            @PathVariable String day) {

        return timetableService.getTimetableByDay(day);
    }
}