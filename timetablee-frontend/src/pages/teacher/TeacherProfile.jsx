import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/ApiService";
import "bootstrap/dist/css/bootstrap.min.css";

function TeacherProfile() {

    const navigate = useNavigate();

    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);

    const teacherId = localStorage.getItem("id");

    // ==========================================
    // Load Teacher Profile
    // ==========================================

    useEffect(() => {
        loadTeacher();
    }, []);

    const loadTeacher = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                `/api/teachers/${teacherId}`
            );

            setTeacher(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load profile.");

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (
            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#F7F8FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                <div className="text-center">

                    <div
                        className="spinner-border"
                        role="status"
                        style={{
                            color: "#26324A"
                        }}
                    >
                    </div>

                    <p
                        className="mt-3 mb-0"
                        style={{
                            color: "#687083",
                            fontSize: "14px"
                        }}
                    >
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }

    // ==========================================
    // Profile Not Found
    // ==========================================

    if (!teacher) {

        return (
            <div
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#F7F8FB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px"
                }}
            >

                <div
                    style={{
                        width: "100%",
                        maxWidth: "450px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "14px",
                        padding: "40px",
                        textAlign: "center",
                        boxShadow: "0 6px 25px rgba(38,50,74,0.08)"
                    }}
                >

                    <h4
                        style={{
                            color: "#26324A",
                            fontWeight: "600",
                            marginBottom: "12px"
                        }}
                    >
                        Profile Not Found
                    </h4>

                    <p
                        style={{
                            color: "#687083",
                            fontSize: "14px",
                            marginBottom: "25px"
                        }}
                    >
                        Unable to retrieve your teacher profile.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/teacher/dashboard")
                        }
                        style={{
                            backgroundColor: "#26324A",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "7px",
                            padding: "10px 24px",
                            fontSize: "14px",
                            cursor: "pointer"
                        }}
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>
        );
    }

    // ==========================================
    // Main Profile
    // ==========================================

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#F7F8FB",
                padding: "40px 20px"
            }}
        >

            <div
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto"
                }}
            >

                {/* ================================= */}
                {/* PAGE HEADER */}
                {/* ================================= */}

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                >

                    <div>

                        <h2
                            style={{
                                color: "#26324A",
                                fontSize: "28px",
                                fontWeight: "600",
                                marginBottom: "6px"
                            }}
                        >
                            Teacher Profile
                        </h2>

                        <p
                            style={{
                                color: "#687083",
                                fontSize: "14px",
                                marginBottom: "0"
                            }}
                        >
                            Personal and professional information
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/teacher/dashboard")
                        }
                        style={{
                            backgroundColor: "#FFFFFF",
                            color: "#26324A",
                            border: "1px solid #D9DDE7",
                            borderRadius: "7px",
                            padding: "9px 18px",
                            fontSize: "14px",
                            cursor: "pointer"
                        }}
                    >
                        Back to Dashboard
                    </button>

                </div>


                {/* ================================= */}
                {/* MAIN PROFILE CARD */}
                {/* ================================= */}

                <div
                    style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow:
                            "0 6px 25px rgba(38,50,74,0.08)"
                    }}
                >

                    {/* ================================= */}
                    {/* PROFILE HEADER */}
                    {/* ================================= */}

                    <div
                        style={{
                            backgroundColor: "#26324A",
                            padding: "35px 40px"
                        }}
                    >

                        <div
                            className="d-flex align-items-center"
                        >

                            {/* Initial */}

                            <div
                                style={{
                                    width: "82px",
                                    height: "82px",
                                    minWidth: "82px",
                                    borderRadius: "50%",
                                    backgroundColor: "#EEF0F7",
                                    color: "#26324A",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "30px",
                                    fontWeight: "600",
                                    marginRight: "24px"
                                }}
                            >
                                {teacher.teacherName
                                    ? teacher.teacherName
                                        .charAt(0)
                                        .toUpperCase()
                                    : "T"}
                            </div>


                            <div>

                                <h3
                                    style={{
                                        color: "#FFFFFF",
                                        fontSize: "24px",
                                        fontWeight: "600",
                                        marginBottom: "7px"
                                    }}
                                >
                                    {teacher.teacherName}
                                </h3>

                                <p
                                    style={{
                                        color: "#D9DDE7",
                                        fontSize: "15px",
                                        marginBottom: "5px"
                                    }}
                                >
                                    {teacher.specialization ||
                                        "Teacher"}
                                </p>

                                <p
                                    style={{
                                        color: "#AEB6C7",
                                        fontSize: "13px",
                                        marginBottom: "0"
                                    }}
                                >
                                    Teacher ID: {teacher.teacherId}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* PROFILE DETAILS */}
                    {/* ================================= */}

                    <div
                        style={{
                            padding: "38px 40px"
                        }}
                    >

                        <h5
                            style={{
                                color: "#26324A",
                                fontSize: "18px",
                                fontWeight: "600",
                                marginBottom: "24px"
                            }}
                        >
                            Professional Information
                        </h5>


                        <div className="row g-4">

                            {/* Full Name */}

                            <div className="col-md-6">

                                <div
                                    style={{
                                        backgroundColor: "#EEF0F7",
                                        border: "1px solid #E0E3EC",
                                        borderRadius: "9px",
                                        padding: "18px 20px"
                                    }}
                                >

                                    <div
                                        style={{
                                            color: "#687083",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Full Name
                                    </div>

                                    <div
                                        style={{
                                            color: "#26324A",
                                            fontSize: "15px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {teacher.teacherName ||
                                            "Not available"}
                                    </div>

                                </div>

                            </div>


                            {/* Email */}

                            <div className="col-md-6">

                                <div
                                    style={{
                                        backgroundColor: "#EEF0F7",
                                        border: "1px solid #E0E3EC",
                                        borderRadius: "9px",
                                        padding: "18px 20px"
                                    }}
                                >

                                    <div
                                        style={{
                                            color: "#687083",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Email Address
                                    </div>

                                    <div
                                        style={{
                                            color: "#26324A",
                                            fontSize: "15px",
                                            fontWeight: "500",
                                            wordBreak: "break-word"
                                        }}
                                    >
                                        {teacher.email ||
                                            "Not available"}
                                    </div>

                                </div>

                            </div>


                            {/* Phone */}

                            <div className="col-md-6">

                                <div
                                    style={{
                                        backgroundColor: "#EEF0F7",
                                        border: "1px solid #E0E3EC",
                                        borderRadius: "9px",
                                        padding: "18px 20px"
                                    }}
                                >

                                    <div
                                        style={{
                                            color: "#687083",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Phone Number
                                    </div>

                                    <div
                                        style={{
                                            color: "#26324A",
                                            fontSize: "15px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {teacher.phone ||
                                            "Not available"}
                                    </div>

                                </div>

                            </div>


                            {/* Qualification */}

                            <div className="col-md-6">

                                <div
                                    style={{
                                        backgroundColor: "#EEF0F7",
                                        border: "1px solid #E0E3EC",
                                        borderRadius: "9px",
                                        padding: "18px 20px"
                                    }}
                                >

                                    <div
                                        style={{
                                            color: "#687083",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Qualification
                                    </div>

                                    <div
                                        style={{
                                            color: "#26324A",
                                            fontSize: "15px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {teacher.qualification ||
                                            "Not available"}
                                    </div>

                                </div>

                            </div>


                            {/* Specialization */}

                            <div className="col-md-6">

                                <div
                                    style={{
                                        backgroundColor: "#EEF0F7",
                                        border: "1px solid #E0E3EC",
                                        borderRadius: "9px",
                                        padding: "18px 20px"
                                    }}
                                >

                                    <div
                                        style={{
                                            color: "#687083",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Specialization
                                    </div>

                                    <div
                                        style={{
                                            color: "#26324A",
                                            fontSize: "15px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {teacher.specialization ||
                                            "Not available"}
                                    </div>

                                </div>

                            </div>


                            {/* Teacher ID */}

                            <div className="col-md-6">

                                <div
                                    style={{
                                        backgroundColor: "#EEF0F7",
                                        border: "1px solid #E0E3EC",
                                        borderRadius: "9px",
                                        padding: "18px 20px"
                                    }}
                                >

                                    <div
                                        style={{
                                            color: "#687083",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        Teacher ID
                                    </div>

                                    <div
                                        style={{
                                            color: "#26324A",
                                            fontSize: "15px",
                                            fontWeight: "500"
                                        }}
                                    >
                                        {teacher.teacherId}
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================================= */}
                        {/* FOOTER */}
                        {/* ================================= */}

                        <div
                            style={{
                                marginTop: "35px",
                                paddingTop: "24px",
                                borderTop: "1px solid #E4E6EC",
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/teacher/dashboard"
                                    )
                                }
                                style={{
                                    backgroundColor: "#26324A",
                                    color: "#FFFFFF",
                                    border: "none",
                                    borderRadius: "7px",
                                    padding: "10px 24px",
                                    fontSize: "14px",
                                    cursor: "pointer"
                                }}
                            >
                                Back to Dashboard
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default TeacherProfile;