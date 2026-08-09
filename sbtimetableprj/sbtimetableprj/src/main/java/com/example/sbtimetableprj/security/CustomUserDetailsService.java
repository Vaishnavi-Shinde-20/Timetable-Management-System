package com.example.sbtimetableprj.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.sbtimetableprj.model.Admin;
import com.example.sbtimetableprj.model.Student;
import com.example.sbtimetableprj.model.Teacher;
import com.example.sbtimetableprj.repository.AdminRepository;
import com.example.sbtimetableprj.repository.StudentRepository;
import com.example.sbtimetableprj.repository.TeacherRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<Admin> admin = adminRepository.findByEmail(email);

        if (admin.isPresent()) {
        	return new CustomUserDetails(
        	        admin.get().getAdminId(),
        	        admin.get().getEmail(),
        	        admin.get().getPassword(),
        	        "ADMIN");
        }

        Optional<Teacher> teacher = teacherRepository.findByEmail(email);

        if (teacher.isPresent()) {
        	return new CustomUserDetails(
        	        teacher.get().getTeacherId(),
        	        teacher.get().getEmail(),
        	        teacher.get().getPassword(),
        	        "TEACHER");
        }

        Optional<Student> student = studentRepository.findByEmail(email);

        if (student.isPresent()) {
        	return new CustomUserDetails(
        	        student.get().getStudentId(),
        	        student.get().getEmail(),
        	        student.get().getPassword(),
        	        "STUDENT");
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}