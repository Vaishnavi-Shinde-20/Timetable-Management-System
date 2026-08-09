import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const logout = () => {

        if (window.confirm("Are you sure you want to logout?")) {

            localStorage.clear();

            navigate("/");

        }

    };

    const modules = [
        {
            title: "Teacher Management",
            description: "Add, update and manage teachers",
            icon: "👨‍🏫",
            color: "#635bff",
            background: "#f0efff",
            path: "/admin/teachers"
        },
        {
            title: "Student Management",
            description: "Manage student records and details",
            icon: "🎓",
            color: "#00a878",
            background: "#eaf9f4",
            path: "/admin/students"
        },
        {
            title: "Grade Management",
            description: "Manage grades and academic levels",
            icon: "🏫",
            color: "#e88900",
            background: "#fff6e9",
            path: "/admin/grades"
        },
        {
            title: "Batch Management",
            description: "Create and manage student batches",
            icon: "👥",
            color: "#5b4bb7",
            background: "#f0efff",
            path: "/admin/batches"
        },
        {
            title: "Course Management",
            description: "Manage courses, credits and grades",
            icon: "📚",
            color: "#635bff",
            background: "#f0efff",
            path: "/admin/courses"
        },
        {
            title: "Timetable Management",
            description: "Create and manage class schedules",
            icon: "📅",
            color: "#343a40",
            background: "#f1f2f3",
            path: "/admin/timetable"
        }
    ];

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fb",
                display: "flex"
            }}
        >

            {/* ================================================= */}
            {/* SIDEBAR */}
            {/* ================================================= */}

            <aside
                style={{
                    width: "300px",
                    minHeight: "100vh",
                    background:
                        "linear-gradient(180deg, #111827 0%, #182235 100%)",
                    color: "white",
                    padding: "28px 22px",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                {/* ================================================= */}
                {/* LOGO */}
                {/* ================================================= */}

                <div
                    style={{
                        textAlign: "center",
                        paddingBottom: "28px",
                        borderBottom:
                            "1px solid rgba(255,255,255,0.12)"
                    }}
                >

                    <div
                        style={{
                            width: "66px",
                            height: "66px",
                            margin: "0 auto 15px",
                            borderRadius: "18px",
                            background:
                                "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "32px",
                            boxShadow:
                                "0 8px 25px rgba(99,102,241,0.3)"
                        }}
                    >
                        📅
                    </div>

                    <h4
                        style={{
                            fontWeight: "700",
                            marginBottom: "5px"
                        }}
                    >
                        Timetable System
                    </h4>

                    <p
                        style={{
                            margin: 0,
                            color: "#94a3b8",
                            fontSize: "14px"
                        }}
                    >
                        Administration Panel
                    </p>

                </div>


                {/* ================================================= */}
                {/* MAIN MENU */}
                {/* ================================================= */}

                <div
                    style={{
                        marginTop: "32px"
                    }}
                >

                    <div
                        style={{
                            color: "#718096",
                            fontSize: "13px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            marginBottom: "15px",
                            paddingLeft: "14px"
                        }}
                    >
                        MAIN MENU
                    </div>


                    {/* DASHBOARD */}

                    <button
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        style={{
                            width: "100%",
                            border: "none",
                            background:
                                "linear-gradient(90deg, #5b4ff1, #6258ef)",
                            color: "white",
                            borderRadius: "12px",
                            padding: "14px 16px",
                            marginBottom: "8px",
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "600",
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            cursor: "pointer"
                        }}
                    >

                        <span
                            style={{
                                fontSize: "20px"
                            }}
                        >
                            📊
                        </span>

                        Dashboard

                    </button>


                    {/* TEACHERS */}

                    <button
                        onClick={() =>
                            navigate("/admin/teachers")
                        }
                        style={menuButtonStyle}
                    >

                        <span style={menuIconStyle}>
                            👨‍🏫
                        </span>

                        Teachers

                    </button>


                    {/* STUDENTS */}

                    <button
                        onClick={() =>
                            navigate("/admin/students")
                        }
                        style={menuButtonStyle}
                    >

                        <span style={menuIconStyle}>
                            🎓
                        </span>

                        Students

                    </button>


                    {/* COURSES */}

                    <button
                        onClick={() =>
                            navigate("/admin/courses")
                        }
                        style={menuButtonStyle}
                    >

                        <span style={menuIconStyle}>
                            📚
                        </span>

                        Courses

                    </button>


                    {/* TIMETABLE */}

                    <button
                        onClick={() =>
                            navigate("/admin/timetable")
                        }
                        style={menuButtonStyle}
                    >

                        <span style={menuIconStyle}>
                            📅
                        </span>

                        Timetable

                    </button>

                </div>


                {/* ================================================= */}
                {/* LOGOUT */}
                {/* ================================================= */}

                <div
                    style={{
                        marginTop: "auto",
                        paddingTop: "20px",
                        borderTop:
                            "1px solid rgba(255,255,255,0.12)"
                    }}
                >

                    <button
                        onClick={logout}
                        style={{
                            width: "100%",
                            border:
                                "1px solid rgba(239,68,68,0.35)",
                            backgroundColor:
                                "rgba(239,68,68,0.10)",
                            color: "#fca5a5",
                            borderRadius: "10px",
                            padding: "13px",
                            fontSize: "15px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        🚪 &nbsp; Logout
                    </button>

                </div>

            </aside>


            {/* ================================================= */}
            {/* MAIN CONTENT */}
            {/* ================================================= */}

            <main
                style={{
                    marginLeft: "300px",
                    width: "calc(100% - 300px)",
                    minHeight: "100vh"
                }}
            >

                {/* ================================================= */}
                {/* TOP HEADER */}
                {/* ================================================= */}

                <header
                    style={{
                        height: "72px",
                        backgroundColor: "white",
                        borderBottom:
                            "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 40px"
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
                            Admin Dashboard
                        </h4>

                        <small
                            style={{
                                color: "#64748b"
                            }}
                        >
                            Manage your timetable system
                        </small>

                    </div>


                    <div
                        style={{
                            textAlign: "right"
                        }}
                    >

                        <div
                            style={{
                                fontWeight: "700",
                                color: "#111827"
                            }}
                        >
                            Administrator
                        </div>

                        <small
                            style={{
                                color: "#64748b"
                            }}
                        >
                            System Admin
                        </small>

                    </div>

                </header>


                {/* ================================================= */}
                {/* WELCOME SECTION */}
                {/* ================================================= */}

                <section
                    style={{
                        padding: "55px 55px 35px"
                    }}
                >

                    <h1
                        style={{
                            fontSize: "38px",
                            fontWeight: "750",
                            color: "#111827",
                            marginBottom: "12px"
                        }}
                    >
                        Welcome back, Admin
                    </h1>

                    <p
                        style={{
                            fontSize: "18px",
                            color: "#64748b",
                            margin: 0
                        }}
                    >
                        Here's an overview of your Timetable
                        Management System.
                    </p>

                </section>


                {/* ================================================= */}
                {/* MANAGEMENT MODULES */}
                {/* ================================================= */}

                <section
                    style={{
                        padding: "0 55px 50px"
                    }}
                >

                    <div
                        style={{
                            marginBottom: "28px"
                        }}
                    >

                        <h2
                            style={{
                                fontSize: "28px",
                                fontWeight: "700",
                                color: "#111827",
                                marginBottom: "6px"
                            }}
                        >
                            Management Modules
                        </h2>

                        <p
                            style={{
                                color: "#64748b",
                                fontSize: "16px",
                                margin: 0
                            }}
                        >
                            Select a module to manage your system
                        </p>

                    </div>


                    {/* ================================================= */}
                    {/* MODULE GRID */}
                    {/* ================================================= */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(360px, 1fr))",
                            gap: "28px"
                        }}
                    >

                        {modules.map((module) => (

                            <div
                                key={module.title}
                                onClick={() =>
                                    navigate(module.path)
                                }

                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "18px",
                                    padding: "28px",
                                    minHeight: "165px",
                                    boxShadow:
                                        "0 5px 20px rgba(15,23,42,0.07)",
                                    border:
                                        "1px solid rgba(226,232,240,0.8)",
                                    cursor: "pointer",
                                    transition:
                                        "all 0.25s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "22px"
                                }}

                                onMouseEnter={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(-5px)";

                                    e.currentTarget.style.boxShadow =
                                        "0 12px 30px rgba(15,23,42,0.12)";

                                }}

                                onMouseLeave={(e) => {

                                    e.currentTarget.style.transform =
                                        "translateY(0)";

                                    e.currentTarget.style.boxShadow =
                                        "0 5px 20px rgba(15,23,42,0.07)";

                                }}
                            >

                                {/* ICON */}

                                <div
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        minWidth: "70px",
                                        borderRadius: "17px",
                                        backgroundColor:
                                            module.background,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "31px"
                                    }}
                                >
                                    {module.icon}
                                </div>


                                {/* CONTENT */}

                                <div>

                                    <h3
                                        style={{
                                            fontSize: "21px",
                                            fontWeight: "700",
                                            color: "#111827",
                                            marginBottom: "8px"
                                        }}
                                    >
                                        {module.title}
                                    </h3>

                                    <p
                                        style={{
                                            color: "#64748b",
                                            marginBottom: "13px",
                                            fontSize: "15px"
                                        }}
                                    >
                                        {module.description}
                                    </p>

                                    <span
                                        style={{
                                            color: module.color,
                                            fontWeight: "700",
                                            fontSize: "15px"
                                        }}
                                    >
                                        Open Module →
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            </main>

        </div>
    );
}


/* ================================================= */
/* SIDEBAR BUTTON STYLE */
/* ================================================= */

const menuButtonStyle = {
    width: "100%",
    border: "none",
    backgroundColor: "transparent",
    color: "#d1d5db",
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "5px",
    textAlign: "left",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    cursor: "pointer"
};


/* ================================================= */
/* SIDEBAR ICON STYLE */
/* ================================================= */

const menuIconStyle = {
    width: "24px",
    textAlign: "center",
    fontSize: "19px"
};


export default AdminDashboard;