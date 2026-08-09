import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function StudentDashboard() {
    const navigate = useNavigate();

    const logout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.clear();
            navigate("/");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#f3f4f6",
                padding: "45px 20px"
            }}
        >
            <div className="container">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-5">

                    <div>
                        <h2
                            className="fw-bold mb-1"
                            style={{ color: "#343a40" }}
                        >
                            Student Dashboard
                        </h2>

                        <p
                            className="mb-0"
                            style={{ color: "#6c757d" }}
                        >
                            Timetable Management System
                        </p>
                    </div>

                    <button
                        className="btn"
                        onClick={logout}
                        style={{
                            backgroundColor: "#343a40",
                            color: "#fff",
                            padding: "9px 22px",
                            borderRadius: "6px",
                            border: "none"
                        }}
                    >
                        Logout
                    </button>

                </div>

                {/* Welcome Section */}
                <div
                    className="mb-4"
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #dee2e6",
                        borderRadius: "10px",
                        padding: "25px 30px"
                    }}
                >
                    <h4
                        className="fw-semibold mb-2"
                        style={{ color: "#343a40" }}
                    >
                        Welcome, Student
                    </h4>

                    <p
                        className="mb-0"
                        style={{ color: "#6c757d" }}
                    >
                        Manage your profile and view your class timetable
                        from the options below.
                    </p>
                </div>

                {/* Main Options */}
                <div className="row g-4">

                    {/* Profile */}
                    <div className="col-md-6">

                        <div
                            style={{
                                height: "100%",
                                backgroundColor: "#ffffff",
                                border: "1px solid #dee2e6",
                                borderRadius: "10px",
                                padding: "30px",
                                boxShadow: "0 3px 10px rgba(0,0,0,0.06)"
                            }}
                        >

                            <div
                                style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "8px",
                                    backgroundColor: "#e9ecef",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#343a40",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    marginBottom: "20px"
                                }}
                            >
                                P
                            </div>

                            <h4
                                className="fw-semibold"
                                style={{ color: "#343a40" }}
                            >
                                My Profile
                            </h4>

                            <p
                                style={{
                                    color: "#6c757d",
                                    minHeight: "48px"
                                }}
                            >
                                View your personal details and account
                                information.
                            </p>

                            <button
                                className="btn"
                                onClick={() =>
                                    navigate("/student/profile")
                                }
                                style={{
                                    backgroundColor: "#495057",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "9px 20px"
                                }}
                            >
                                View Profile
                            </button>

                        </div>

                    </div>

                    {/* Timetable */}
                    <div className="col-md-6">

                        <div
                            style={{
                                height: "100%",
                                backgroundColor: "#ffffff",
                                border: "1px solid #dee2e6",
                                borderRadius: "10px",
                                padding: "30px",
                                boxShadow: "0 3px 10px rgba(0,0,0,0.06)"
                            }}
                        >

                            <div
                                style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "8px",
                                    backgroundColor: "#e9ecef",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#343a40",
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    marginBottom: "20px"
                                }}
                            >
                                T
                            </div>

                            <h4
                                className="fw-semibold"
                                style={{ color: "#343a40" }}
                            >
                                My Timetable
                            </h4>

                            <p
                                style={{
                                    color: "#6c757d",
                                    minHeight: "48px"
                                }}
                            >
                                View your scheduled classes, timings, rooms
                                and courses.
                            </p>

                            <button
                                className="btn"
                                onClick={() =>
                                    navigate("/student/timetable")
                                }
                                style={{
                                    backgroundColor: "#495057",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "9px 20px"
                                }}
                            >
                                View Timetable
                            </button>

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div
                    className="text-center mt-5"
                    style={{
                        color: "#868e96",
                        fontSize: "14px"
                    }}
                >
                    Timetable Management System
                </div>

            </div>
        </div>
    );
}

export default StudentDashboard;