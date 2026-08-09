package com.example.sbtimetableprj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.sbtimetableprj.exception.ResourceNotFoundException;
import com.example.sbtimetableprj.model.Teacher;
import com.example.sbtimetableprj.repository.TeacherRepository;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Teacher saveTeacher(Teacher teacher) {

        teacher.setPassword(passwordEncoder.encode(teacher.getPassword()));

        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher getTeacherById(Long teacherId) {

        return teacherRepository.findById(teacherId)
                .orElseThrow(() ->
                new ResourceNotFoundException("Teacher not found with ID : " + teacherId));
    }

    @Override
    public List<Teacher> getAllTeachers() {

        return teacherRepository.findAll();
    }

    @Override
    public Teacher updateTeacher(Long teacherId, Teacher teacher) {

        Teacher existingTeacher = getTeacherById(teacherId);

        existingTeacher.setTeacherName(teacher.getTeacherName());
        existingTeacher.setEmail(teacher.getEmail());
        existingTeacher.setPhone(teacher.getPhone());
        existingTeacher.setQualification(teacher.getQualification());
        existingTeacher.setSpecialization(teacher.getSpecialization());

        if (teacher.getPassword() != null && !teacher.getPassword().isEmpty()) {

            if (!teacher.getPassword().startsWith("$2a$")
                    && !teacher.getPassword().startsWith("$2b$")
                    && !teacher.getPassword().startsWith("$2y$")) {

                existingTeacher.setPassword(
                        passwordEncoder.encode(teacher.getPassword()));

            } else {

                existingTeacher.setPassword(teacher.getPassword());
            }
        }

        return teacherRepository.save(existingTeacher);
    }

    @Override
    public void deleteTeacher(Long teacherId) {

        Teacher teacher = getTeacherById(teacherId);

        teacherRepository.delete(teacher);
    }

    @Override
    public Teacher loginTeacher(String email, String password) {

        Teacher teacher = teacherRepository.findByEmail(email)
                .orElseThrow(() ->
                new ResourceNotFoundException("Invalid Email"));

        if (!passwordEncoder.matches(password, teacher.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

        return teacher;
    }
}