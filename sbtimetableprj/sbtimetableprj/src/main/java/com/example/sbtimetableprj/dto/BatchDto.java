package com.example.sbtimetableprj.dto;

public class BatchDto {

    private Long batchId;
    private String batchName;
    private Long gradeId;

    public BatchDto() {
    }

    public BatchDto(Long batchId, String batchName, Long gradeId) {
        this.batchId = batchId;
        this.batchName = batchName;
        this.gradeId = gradeId;
    }

    public Long getBatchId() {
        return batchId;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
    }

    public String getBatchName() {
        return batchName;
    }

    public void setBatchName(String batchName) {
        this.batchName = batchName;
    }

    public Long getGradeId() {
        return gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
    }

    @Override
    public String toString() {
        return "BatchDto [batchId=" + batchId
                + ", batchName=" + batchName
                + ", gradeId=" + gradeId + "]";
    }
}