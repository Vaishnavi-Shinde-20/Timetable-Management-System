import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TeacherDashboard() {

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
                backgroundColor: "#f5f7fb",
                display: "flex",
                fontFamily: "Arial, sans-serif"
            }}
        >

            {/* ================================================= */}
            {/* SIDEBAR */}
            {/* ================================================= */}

            <div
                style={{
                    width: "270px",
                    minHeight: "100vh",
                    background: "linear-gradient(180deg, #111827, #182235)",
                    color: "white",
                    padding: "28px 22px",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0
                }}
            >

                {/* Logo */}

                <div
                    style={{
                        textAlign: "center",
                        paddingBottom: "28px",
                        borderBottom: "1px solid rgba(255,255,255,0.15)"
                    }}
                >

                    <div
                        style={{
                            width: "65px",
                            height: "65px",
                            margin: "0 auto 15px",
                            borderRadius: "18px",
                            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "32px",
                            boxShadow: "0 8px 20px rgba(79,70,229,0.35)"
                        }}
                    >
                        👨‍🏫
                    </div>

                    <h4
                        style={{
                            fontWeight: "700",
                            marginBottom: "6px"
                        }}
                    >
                        Timetable System
                    </h4>

                    <small
                        style={{
                            color: "#aab4c8",
                            fontSize: "14px"
                        }}
                    >
                        Teacher Portal
                    </small>

                </div>


                {/* Main Menu */}

                <div style={{ marginTop: "35px" }}>

                    <div
                        style={{
                            color: "#7f8ba3",
                            fontSize: "13px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            marginBottom: "15px",
                            paddingLeft: "14px"
                        }}
                    >
                        MAIN MENU
                    </div>


                    {/* Dashboard */}

                    <button
                        onClick={() => navigate("/teacher/dashboard")}
                        style={{
                            width: "100%",
                            border: "none",
                            borderRadius: "12px",
                            padding: "13px 16px",
                            marginBottom: "8px",
                            background:
                                "linear-gradient(90deg, #4f46e5, #6366f1)",
                            color: "white",
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: "pointer",
                            boxShadow:
                                "0 6px 15px rgba(79,70,229,0.25)"
                        }}
                    >
                        📊 &nbsp;&nbsp; Dashboard
                    </button>


                    {/* Timetable */}

                    <button
                        onClick={() => navigate("/teacher/timetable")}
                        style={{
                            width: "100%",
                            border: "none",
                            borderRadius: "12px",
                            padding: "13px 16px",
                            marginBottom: "8px",
                            background: "transparent",
                            color: "#e5e7eb",
                            textAlign: "left",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "rgba(255,255,255,0.08)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                        }}
                    >
                        📅 &nbsp;&nbsp; My Timetable
                    </button>


                    {/* Profile */}

                    <button
                        onClick={() => navigate("/teacher/profile")}
                        style={{
                            width: "100%",
                            border: "none",
                            borderRadius: "12px",
                            padding: "13px 16px",
                            background: "transparent",
                            color: "#e5e7eb",
                            textAlign: "left",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "rgba(255,255,255,0.08)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                        }}
                    >
                        👤 &nbsp;&nbsp; My Profile
                    </button>

                </div>


                {/* Logout */}

                <div
                    style={{
                        position: "absolute",
                        bottom: "25px",
                        left: "22px",
                        right: "22px",
                        borderTop:
                            "1px solid rgba(255,255,255,0.15)",
                        paddingTop: "20px"
                    }}
                >

                    <button
                        onClick={logout}
                        style={{
                            width: "100%",
                            padding: "13px",
                            borderRadius: "10px",
                            border:
                                "1px solid rgba(239,68,68,0.35)",
                            background:
                                "rgba(239,68,68,0.12)",
                            color: "#fca5a5",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        🚪 &nbsp; Logout
                    </button>

                </div>

            </div>


            {/* ================================================= */}
            {/* MAIN CONTENT */}
            {/* ================================================= */}

            <div
                style={{
                    marginLeft: "270px",
                    width: "calc(100% - 270px)"
                }}
            >

                {/* ================================================= */}
                {/* TOP HEADER */}
                {/* ================================================= */}

                <div
                    style={{
                        height: "72px",
                        backgroundColor: "white",
                        borderBottom: "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 38px"
                    }}
                >

                    <div>

                        <h4
                            style={{
                                margin: 0,
                                fontWeight: "700",
                                color: "#111827"
                            }}
                        >
                            Teacher Dashboard
                        </h4>

                        <small
                            style={{
                                color: "#64748b"
                            }}
                        >
                            Manage your teaching activities
                        </small>

                    </div>


                    <div
                        style={{
                            textAlign: "right"
                        }}
                    >

                        <strong
                            style={{
                                color: "#111827"
                            }}
                        >
                            Teacher
                        </strong>

                        <br />

                        <small
                            style={{
                                color: "#64748b"
                            }}
                        >
                            Faculty Portal
                        </small>

                    </div>

                </div>


                {/* ================================================= */}
                {/* PAGE CONTENT */}
                {/* ================================================= */}

                <div
                    style={{
                        padding: "45px"
                    }}
                >

                    {/* Welcome */}

                    <div
                        style={{
                            marginBottom: "40px"
                        }}
                    >

                        <h1
                            style={{
                                fontSize: "38px",
                                fontWeight: "700",
                                color: "#111827",
                                marginBottom: "10px"
                            }}
                        >
                            Welcome back, Teacher
                        </h1>

                        <p
                            style={{
                                color: "#64748b",
                                fontSize: "17px",
                                margin: 0
                            }}
                        >
                            Here's an overview of your teaching portal.
                        </p>

                    </div>


                    {/* ================================================= */}
                    {/* QUICK ACCESS */}
                    {/* ================================================= */}

                    <h3
                        style={{
                            fontWeight: "700",
                            color: "#111827",
                            marginBottom: "8px"
                        }}
                    >
                        Quick Access
                    </h3>

                    <p
                        style={{
                            color: "#64748b",
                            marginBottom: "25px"
                        }}
                    >
                        Access your timetable and profile information.
                    </p>


                    <div className="row g-4">


                        {/* ================================================= */}
                        {/* MY TIMETABLE */}
                        {/* ================================================= */}

                        <div className="col-md-6">

                            <div
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "18px",
                                    padding: "30px",
                                    minHeight: "230px",
                                    boxShadow:
                                        "0 5px 20px rgba(15,23,42,0.07)",
                                    border:
                                        "1px solid #eef0f4",
                                    transition:
                                        "all 0.25s ease"
                                }}
                                onMouseEnter={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 12px 28px rgba(15,23,42,0.12)";

                                }}
                                onMouseLeave={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.boxShadow =
                                        "0 5px 20px rgba(15,23,42,0.07)";

                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent:
                                            "space-between"
                                    }}
                                >

                                    <div>

                                        <div
                                            style={{
                                                width: "58px",
                                                height: "58px",
                                                borderRadius: "15px",
                                                backgroundColor:
                                                    "#eef2ff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent:
                                                    "center",
                                                fontSize: "28px",
                                                marginBottom: "20px"
                                            }}
                                        >
                                            📅
                                        </div>

                                        <h4
                                            style={{
                                                fontWeight: "700",
                                                color: "#111827",
                                                marginBottom: "8px"
                                            }}
                                        >
                                            My Timetable
                                        </h4>

                                        <p
                                            style={{
                                                color: "#64748b",
                                                marginBottom: "20px"
                                            }}
                                        >
                                            View your assigned classes,
                                            timings and rooms.
                                        </p>

                                    </div>

                                </div>


                                <button
                                    onClick={() =>
                                        navigate(
                                            "/teacher/timetable"
                                        )
                                    }
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        color: "#4f46e5",
                                        fontWeight: "700",
                                        padding: 0,
                                        fontSize: "15px",
                                        cursor: "pointer"
                                    }}
                                >
                                    View Timetable →
                                </button>

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* MY PROFILE */}
                        {/* ================================================= */}

                        <div className="col-md-6">

                            <div
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "18px",
                                    padding: "30px",
                                    minHeight: "230px",
                                    boxShadow:
                                        "0 5px 20px rgba(15,23,42,0.07)",
                                    border:
                                        "1px solid #eef0f4",
                                    transition:
                                        "all 0.25s ease"
                                }}
                                onMouseEnter={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 12px 28px rgba(15,23,42,0.12)";

                                }}
                                onMouseLeave={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.boxShadow =
                                        "0 5px 20px rgba(15,23,42,0.07)";

                                }}
                            >

                                <div
                                    style={{
                                        width: "58px",
                                        height: "58px",
                                        borderRadius: "15px",
                                        backgroundColor:
                                            "#ecfdf5",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent:
                                            "center",
                                        fontSize: "28px",
                                        marginBottom: "20px"
                                    }}
                                >
                                    👤
                                </div>

                                <h4
                                    style={{
                                        fontWeight: "700",
                                        color: "#111827",
                                        marginBottom: "8px"
                                    }}
                                >
                                    My Profile
                                </h4>

                                <p
                                    style={{
                                        color: "#64748b",
                                        marginBottom: "20px"
                                    }}
                                >
                                    View your personal and professional
                                    information.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/teacher/profile"
                                        )
                                    }
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        color: "#059669",
                                        fontWeight: "700",
                                        padding: 0,
                                        fontSize: "15px",
                                        cursor: "pointer"
                                    }}
                                >
                                    View Profile →
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* INFORMATION SECTION */}
                    {/* ================================================= */}

                    <div
                        style={{
                            marginTop: "45px",
                            background:
                                "linear-gradient(135deg, #eef2ff, #f5f3ff)",
                            borderRadius: "18px",
                            padding: "28px 32px",
                            border: "1px solid #e0e7ff"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "18px"
                            }}
                        >

                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "12px",
                                    backgroundColor: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "22px"
                                }}
                            >
                                💡
                            </div>

                            <div>

                                <h5
                                    style={{
                                        margin: 0,
                                        fontWeight: "700",
                                        color: "#1e293b"
                                    }}
                                >
                                    Teacher Portal
                                </h5>

                                <p
                                    style={{
                                        margin: "5px 0 0",
                                        color: "#64748b"
                                    }}
                                >
                                    Use the timetable section to check
                                    your assigned classes and schedule.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default TeacherDashboard;