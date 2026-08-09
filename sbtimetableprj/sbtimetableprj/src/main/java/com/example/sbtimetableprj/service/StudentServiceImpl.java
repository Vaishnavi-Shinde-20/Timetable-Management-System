package com.example.sbtimetableprj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.sbtimetableprj.exception.ResourceNotFoundException;
import com.example.sbtimetableprj.model.Student;
import com.example.sbtimetableprj.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Student saveStudent(Student student) {

        student.setPassword(passwordEncoder.encode(student.getPassword()));

        return studentRepository.save(student);
    }

    @Override
    public Student getStudentById(Long studentId) {

        return studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with ID : " + studentId));
    }

    @Override
    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }

    @Override
    public Student updateStudent(Long studentId, Student student) {

        Student existingStudent = getStudentById(studentId);

        existingStudent.setStudentName(student.getStudentName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setRollNumber(student.getRollNumber());

        // Update Grade
        existingStudent.setGrade(student.getGrade());

        // Update Batch
        existingStudent.setBatch(student.getBatch());

        if (student.getPassword() != null && !student.getPassword().isEmpty()) {

            if (!student.getPassword().startsWith("$2a$")
                    && !student.getPassword().startsWith("$2b$")
                    && !student.getPassword().startsWith("$2y$")) {

                existingStudent.setPassword(
                        passwordEncoder.encode(student.getPassword()));

            } else {

                existingStudent.setPassword(student.getPassword());
            }
        }

        return studentRepository.save(existingStudent);
    }

    @Override
    public void deleteStudent(Long studentId) {

        Student student = getStudentById(studentId);

        studentRepository.delete(student);
    }

    @Override
    public Student loginStudent(String email, String password) {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!passwordEncoder.matches(password, student.getPassword())) {
            throw new RuntimeException("Invalid Email or Password");
        }

        return student;
    }
}