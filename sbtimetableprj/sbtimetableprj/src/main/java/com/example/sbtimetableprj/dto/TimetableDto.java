package com.example.sbtimetableprj.dto;

public class TimetableDto {

    private Long timetableId;
    private String day;
    private String startTime;
    private String endTime;
    private String roomNumber;

    private Long teacherId;
    private Long courseId;
    private Long gradeId;
    private Long batchId;

    public TimetableDto() {
    }

    public TimetableDto(Long timetableId, String day, String startTime,
            String endTime, String roomNumber,
            Long teacherId, Long courseId,
            Long gradeId, Long batchId) {

        this.timetableId = timetableId;
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.roomNumber = roomNumber;
        this.teacherId = teacherId;
        this.courseId = courseId;
        this.gradeId = gradeId;
        this.batchId = batchId;
    }

    public Long getTimetableId() {
        return timetableId;
    }

    public void setTimetableId(Long timetableId) {
        this.timetableId = timetableId;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getGradeId() {
        return gradeId;
    }

    public void setGradeId(Long gradeId) {
        this.gradeId = gradeId;
    }

    public Long getBatchId() {
        return batchId;
    }

    public void setBatchId(Long batchId) {
        this.batchId = batchId;
    }

    @Override
    public String toString() {
        return "TimetableDto [timetableId=" + timetableId
                + ", day=" + day
                + ", startTime=" + startTime
                + ", endTime=" + endTime
                + ", roomNumber=" + roomNumber
                + ", teacherId=" + teacherId
                + ", courseId=" + courseId
                + ", gradeId=" + gradeId
                + ", batchId=" + batchId + "]";
    }
}