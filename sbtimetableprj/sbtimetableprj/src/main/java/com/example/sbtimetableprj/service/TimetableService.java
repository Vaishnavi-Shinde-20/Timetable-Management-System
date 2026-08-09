package com.example.sbtimetableprj.service;

import java.util.List;

import com.example.sbtimetableprj.model.Batch;
import com.example.sbtimetableprj.model.Grade;
import com.example.sbtimetableprj.model.Teacher;
import com.example.sbtimetableprj.model.Timetable;

public interface TimetableService {

    Timetable saveTimetable(Timetable timetable);

    Timetable getTimetableById(Long timetableId);

    List<Timetable> getAllTimetables();

    Timetable updateTimetable(Long timetableId, Timetable timetable);

    void deleteTimetable(Long timetableId);

    List<Timetable> getTimetableByTeacher(Teacher teacher);

    List<Timetable> getTimetableByGrade(Grade grade);

    List<Timetable> getTimetableByBatch(Batch batch);

    List<Timetable> getTimetableByGradeAndBatch(Grade grade, Batch batch);

    List<Timetable> getTimetableByDay(String day);

    // Student Timetable
    List<Timetable> getTimetableByStudent(Long studentId);

}