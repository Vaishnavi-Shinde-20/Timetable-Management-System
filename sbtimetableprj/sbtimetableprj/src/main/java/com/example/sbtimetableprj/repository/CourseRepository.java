package com.example.sbtimetableprj.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sbtimetableprj.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCourseCode(String courseCode);

    Optional<Course> findByCourseName(String courseName);

    boolean existsByCourseCode(String courseCode);

    boolean existsByCourseName(String courseName);

}