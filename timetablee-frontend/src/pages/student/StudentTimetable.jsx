import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/ApiService";
import "bootstrap/dist/css/bootstrap.min.css";

function StudentTimetable() {

    const navigate = useNavigate();

    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        loadTimetable();
    }, []);

    const loadTimetable = async () => {

        try {

            const studentId = localStorage.getItem("id");

            const response = await api.get(
                `/api/timetables/student/${studentId}`
            );

            setTimetable(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load timetable.");

        }

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center text-success mb-4">
                My Timetable
            </h2>

            <table className="table table-bordered table-striped table-hover">

                <thead className="table-success">

                    <tr>

                        <th>Day</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Room</th>
                        <th>Course</th>
                        <th>Teacher</th>
                        <th>Grade</th>
                        <th>Batch</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        timetable.length > 0 ?

                            timetable.map((row) => (

                                <tr key={row.timetableId}>

                                    <td>{row.day}</td>

                                    <td>{row.startTime}</td>

                                    <td>{row.endTime}</td>

                                    <td>{row.roomNumber}</td>

                                    <td>
                                        {row.course
                                            ? row.course.courseName
                                            : "N/A"}
                                    </td>

                                    <td>
                                        {row.teacher
                                            ? row.teacher.teacherName
                                            : "N/A"}
                                    </td>

                                    <td>
                                        {row.grade
                                            ? row.grade.gradeName
                                            : "N/A"}
                                    </td>

                                    <td>
                                        {row.batch
                                            ? row.batch.batchName
                                            : "N/A"}
                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td colSpan="8" className="text-center">

                                    No Timetable Found

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

            <div className="text-center">

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/student/dashboard")}
                >
                    Back
                </button>

            </div>

        </div>

    );

}

export default StudentTimetable;