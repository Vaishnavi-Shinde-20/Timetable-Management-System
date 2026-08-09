package com.example.sbtimetableprj.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sbtimetableprj.model.Batch;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

    Optional<Batch> findByBatchName(String batchName);

    boolean existsByBatchName(String batchName);

}