package com.example.sbtimetableprj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.sbtimetableprj.model.Batch;
import com.example.sbtimetableprj.service.BatchService;

@RestController
@RequestMapping("/api/batches")
@CrossOrigin(origins = "http://localhost:3000")
public class BatchController {

    @Autowired
    private BatchService batchService;

    // Add Batch
    @PostMapping("/add")
    public Batch addBatch(@RequestBody Batch batch) {
        return batchService.saveBatch(batch);
    }

    // Get Batch by ID
    @GetMapping("/{id}")
    public Batch getBatchById(@PathVariable("id") Long batchId) {
        return batchService.getBatchById(batchId);
    }

    // Get All Batches
    @GetMapping("/all")
    public List<Batch> getAllBatches() {
        return batchService.getAllBatches();
    }

    // Update Batch
    @PutMapping("/update/{id}")
    public Batch updateBatch(@PathVariable("id") Long batchId,
                             @RequestBody Batch batch) {
        return batchService.updateBatch(batchId, batch);
    }

    // Delete Batch
    @DeleteMapping("/delete/{id}")
    public String deleteBatch(@PathVariable("id") Long batchId) {

        batchService.deleteBatch(batchId);

        return "Batch deleted successfully.";
    }
}