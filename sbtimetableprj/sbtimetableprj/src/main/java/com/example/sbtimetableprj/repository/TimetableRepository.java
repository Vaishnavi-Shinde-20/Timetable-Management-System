package com.example.sbtimetableprj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sbtimetableprj.model.Batch;
import com.example.sbtimetableprj.model.Course;
import com.example.sbtimetableprj.model.Grade;
import com.example.sbtimetableprj.model.Teacher;
import com.example.sbtimetableprj.model.Timetable;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {

    // Find timetable by teacher
    List<Timetable> findByTeacher(Teacher teacher);

    // Find timetable by course
    List<Timetable> findByCourse(Course course);

    // Find timetable by grade
    List<Timetable> findByGrade(Grade grade);

    // Find timetable by batch
    List<Timetable> findByBatch(Batch batch);

    // Find timetable by day
    List<Timetable> findByDay(String day);

    // Find timetable by grade and batch
    List<Timetable> findByGradeAndBatch(Grade grade, Batch batch);

}