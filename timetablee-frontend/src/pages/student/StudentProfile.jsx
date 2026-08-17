import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/ApiService";
import "bootstrap/dist/css/bootstrap.min.css";

function StudentProfile() {

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);

    const studentId = localStorage.getItem("id");

    // =====================================================
    // LOAD STUDENT
    // =====================================================

    const loadStudent = useCallback(async () => {

        try {

            const response = await api.get(
                `/api/students/${studentId}`
            );

            setStudent(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load profile.");

        }

    }, [studentId]);

    // =====================================================
    // LOAD PROFILE
    // =====================================================

    useEffect(() => {

        loadStudent();

    }, [loadStudent]);

    // =====================================================
    // LOADING
    // =====================================================

    if (!student) {

        return (
            <div className="container mt-5">

                <h4 className="text-center">
                    Loading Profile...
                </h4>

            </div>
        );

    }

    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-header bg-success text-white">

                            <h3 className="text-center">
                                Student Profile
                            </h3>

                        </div>

                        <div className="card-body">

                            <table className="table table-bordered">

                                <tbody>

                                    <tr>
                                        <th width="30%">
                                            Student ID
                                        </th>

                                        <td>
                                            {student.studentId}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>
                                            Name
                                        </th>

                                        <td>
                                            {student.studentName}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>
                                            Email
                                        </th>

                                        <td>
                                            {student.email}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>
                                            Phone
                                        </th>

                                        <td>
                                            {student.phone}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>
                                            Roll Number
                                        </th>

                                        <td>
                                            {student.rollNumber}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>
                                            Grade
                                        </th>

                                        <td>
                                            {student.grade
                                                ? student.grade.gradeName
                                                : "N/A"}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>
                                            Batch
                                        </th>

                                        <td>
                                            {student.batch
                                                ? student.batch.batchName
                                                : "N/A"}
                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                            <div className="text-center mt-4">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() =>
                                        navigate(
                                            "/student/dashboard"
                                        )
                                    }
                                >
                                    Back to Dashboard
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StudentProfile;