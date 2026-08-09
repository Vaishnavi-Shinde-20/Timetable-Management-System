package com.example.sbtimetableprj.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sbtimetableprj.model.Grade;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {

    Optional<Grade> findByGradeName(String gradeName);

    boolean existsByGradeName(String gradeName);

}