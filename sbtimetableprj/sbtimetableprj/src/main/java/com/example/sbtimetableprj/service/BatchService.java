package com.example.sbtimetableprj.service;

import java.util.List;

import com.example.sbtimetableprj.model.Batch;

public interface BatchService {

    // Add Batch
    Batch saveBatch(Batch batch);

    // Get Batch by Id
    Batch getBatchById(Long batchId);

    // Get All Batches
    List<Batch> getAllBatches();

    // Update Batch
    Batch updateBatch(Long batchId, Batch batch);

    // Delete Batch
    void deleteBatch(Long batchId);

}