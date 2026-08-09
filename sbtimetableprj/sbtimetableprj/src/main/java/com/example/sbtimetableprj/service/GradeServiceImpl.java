package com.example.sbtimetableprj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sbtimetableprj.exception.ResourceNotFoundException;
import com.example.sbtimetableprj.model.Grade;
import com.example.sbtimetableprj.repository.GradeRepository;

@Service
public class GradeServiceImpl implements GradeService {

    @Autowired
    private GradeRepository gradeRepository;

    @Override
    public Grade saveGrade(Grade grade) {

        if (gradeRepository.existsByGradeName(grade.getGradeName())) {
            throw new RuntimeException("Grade already exists.");
        }

        return gradeRepository.save(grade);

    }

    @Override
    public Grade getGradeById(Long gradeId) {

        return gradeRepository.findById(gradeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Grade not found with ID : " + gradeId));

    }

    @Override
    public List<Grade> getAllGrades() {

        return gradeRepository.findAll();

    }

    @Override
    public Grade updateGrade(Long gradeId, Grade grade) {

        Grade existingGrade = getGradeById(gradeId);

        existingGrade.setGradeName(grade.getGradeName());
        existingGrade.setDescription(grade.getDescription());

        return gradeRepository.save(existingGrade);

    }

    @Override
    public void deleteGrade(Long gradeId) {

        Grade grade = getGradeById(gradeId);

        gradeRepository.delete(grade);

    }

}