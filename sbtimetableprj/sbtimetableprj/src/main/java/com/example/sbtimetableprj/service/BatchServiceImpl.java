package com.example.sbtimetableprj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.sbtimetableprj.exception.ResourceNotFoundException;
import com.example.sbtimetableprj.model.Batch;
import com.example.sbtimetableprj.repository.BatchRepository;

@Service
public class BatchServiceImpl implements BatchService {

    @Autowired
    private BatchRepository batchRepository;

    @Override
    public Batch saveBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    @Override
    public Batch getBatchById(Long batchId) {
        return batchRepository.findById(batchId)
                .orElseThrow(() -> new ResourceNotFoundException("Batch not found with ID : " + batchId));
    }

    @Override
    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    @Override
    public Batch updateBatch(Long batchId, Batch batch) {

        Batch existingBatch = getBatchById(batchId);

        existingBatch.setBatchName(batch.getBatchName());
        existingBatch.setGrade(batch.getGrade());

        return batchRepository.save(existingBatch);
    }

    @Override
    public void deleteBatch(Long batchId) {

        Batch batch = getBatchById(batchId);
        batchRepository.delete(batch);
    }
}