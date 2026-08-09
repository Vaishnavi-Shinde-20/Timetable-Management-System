package com.example.sbtimetableprj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sbtimetableprj.exception.ResourceNotFoundException;
import com.example.sbtimetableprj.model.Batch;
import com.example.sbtimetableprj.model.Grade;
import com.example.sbtimetableprj.model.Student;
import com.example.sbtimetableprj.model.Teacher;
import com.example.sbtimetableprj.model.Timetable;
import com.example.sbtimetableprj.repository.StudentRepository;
import com.example.sbtimetableprj.repository.TimetableRepository;

@Service
public class TimetableServiceImpl implements TimetableService {

    @Autowired
    private TimetableRepository timetableRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Timetable saveTimetable(Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    @Override
    public Timetable getTimetableById(Long timetableId) {

        return timetableRepository.findById(timetableId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Timetable not found with ID : " + timetableId));
    }

    @Override
    public List<Timetable> getAllTimetables() {
        return timetableRepository.findAll();
    }

    @Override
    public Timetable updateTimetable(Long timetableId, Timetable timetable) {

        Timetable existingTimetable = getTimetableById(timetableId);

        existingTimetable.setDay(timetable.getDay());
        existingTimetable.setStartTime(timetable.getStartTime());
        existingTimetable.setEndTime(timetable.getEndTime());
        existingTimetable.setRoomNumber(timetable.getRoomNumber());
        existingTimetable.setTeacher(timetable.getTeacher());
        existingTimetable.setCourse(timetable.getCourse());
        existingTimetable.setGrade(timetable.getGrade());
        existingTimetable.setBatch(timetable.getBatch());

        return timetableRepository.save(existingTimetable);
    }

    @Override
    public void deleteTimetable(Long timetableId) {

        Timetable timetable = getTimetableById(timetableId);

        timetableRepository.delete(timetable);
    }

    @Override
    public List<Timetable> getTimetableByTeacher(Teacher teacher) {

        return timetableRepository.findByTeacher(teacher);
    }

    @Override
    public List<Timetable> getTimetableByGrade(Grade grade) {

        return timetableRepository.findByGrade(grade);
    }

    @Override
    public List<Timetable> getTimetableByBatch(Batch batch) {

        return timetableRepository.findByBatch(batch);
    }

    @Override
    public List<Timetable> getTimetableByGradeAndBatch(Grade grade, Batch batch) {

        return timetableRepository.findByGradeAndBatch(grade, batch);
    }

    @Override
    public List<Timetable> getTimetableByDay(String day) {

        return timetableRepository.findByDay(day);
    }

    @Override
    public List<Timetable> getTimetableByStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with ID : " + studentId));

        return timetableRepository.findByGradeAndBatch(
                student.getGrade(),
                student.getBatch());
    }

}