import React, { useEffect, useState } from "react";
import api from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function TeacherManagement() {

    const navigate = useNavigate();

    // =========================
    // Empty Teacher
    // =========================

    const emptyTeacher = {
        teacherName: "",
        email: "",
        phone: "",
        qualification: "",
        specialization: "",
        password: ""
    };

    // =========================
    // State
    // =========================

    const [teacher, setTeacher] = useState(emptyTeacher);

    const [teachers, setTeachers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    // =========================
    // Load Teachers
    // =========================

    useEffect(() => {
        loadTeachers();
    }, []);

    const loadTeachers = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/api/teachers/all"
            );

            setTeachers(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load teachers.");

        } finally {

            setLoading(false);

        }

    };

    // =========================
    // Handle Input Change
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setTeacher({
            ...teacher,
            [name]: value
        });

    };

    // =========================
    // Validate Form
    // =========================

    const validateForm = () => {

        if (teacher.teacherName.trim() === "") {

            alert("Teacher Name is required.");
            return false;

        }

        if (teacher.email.trim() === "") {

            alert("Email is required.");
            return false;

        }

        if (teacher.phone.trim() === "") {

            alert("Phone is required.");
            return false;

        }

        if (teacher.qualification.trim() === "") {

            alert("Qualification is required.");
            return false;

        }

        if (teacher.specialization.trim() === "") {

            alert("Specialization is required.");
            return false;

        }

        if (
            editingId === null &&
            teacher.password.trim() === ""
        ) {

            alert("Password is required.");
            return false;

        }

        return true;

    };

    // =========================
    // Add Teacher
    // =========================

    const saveTeacher = async () => {

        if (!validateForm()) {
            return;
        }

        try {

            await api.post(
                "/api/teachers/register",
                teacher
            );

            alert("Teacher added successfully.");

            // Notify TimetableManagement
            window.dispatchEvent(
                new Event("teachersUpdated")
            );

            clearForm();

            await loadTeachers();

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert("Unable to save teacher.");

        }

    };

    // =========================
    // Update Teacher
    // =========================

    const updateTeacher = async () => {

        if (!validateForm()) {
            return;
        }

        try {

            const updateData = {

                teacherName: teacher.teacherName,

                email: teacher.email,

                phone: teacher.phone,

                qualification: teacher.qualification,

                specialization: teacher.specialization

            };

            // Only send password if entered
            if (teacher.password.trim() !== "") {

                updateData.password =
                    teacher.password;

            }

            await api.put(
                "/api/teachers/update/" + editingId,
                updateData
            );

            alert("Teacher updated successfully.");

            // Notify TimetableManagement
            window.dispatchEvent(
                new Event("teachersUpdated")
            );

            clearForm();

            await loadTeachers();

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert("Unable to update teacher.");

        }

    };

    // =========================
    // Edit Teacher
    // =========================

    const editTeacher = (t) => {

        setEditingId(t.teacherId);

        setTeacher({

            teacherName:
                t.teacherName || "",

            email:
                t.email || "",

            phone:
                t.phone || "",

            qualification:
                t.qualification || "",

            specialization:
                t.specialization || "",

            password: ""

        });

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    // =========================
    // Delete Teacher
    // =========================

    const deleteTeacher = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this teacher?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                "/api/teachers/delete/" + id
            );

            alert("Teacher deleted successfully.");

            // Notify TimetableManagement
            window.dispatchEvent(
                new Event("teachersUpdated")
            );

            await loadTeachers();

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert("Unable to delete teacher.");

        }

    };

    // =========================
    // Clear Form
    // =========================

    const clearForm = () => {

        setTeacher({
            ...emptyTeacher
        });

        setEditingId(null);

    };

    // =========================
    // Search
    // =========================

    const filteredTeachers =
        teachers.filter((t) => {

            const teacherName =
                t.teacherName
                    ? t.teacherName.toLowerCase()
                    : "";

            const email =
                t.email
                    ? t.email.toLowerCase()
                    : "";

            const phone =
                t.phone
                    ? String(t.phone)
                    : "";

            const searchText =
                search.toLowerCase();

            return (
                teacherName.includes(searchText) ||
                email.includes(searchText) ||
                phone.includes(search)
            );

        });

    // =========================
    // UI
    // =========================

    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#F4F7FA",
                padding: "30px 20px"
            }}
        >

            <div
                style={{
                    maxWidth: "1250px",
                    margin: "0 auto"
                }}
            >

                {/* ========================= */}
                {/* HEADER */}
                {/* ========================= */}

                <div
                    className="d-flex justify-content-between align-items-center flex-wrap"
                    style={{
                        marginBottom: "28px"
                    }}
                >

                    <div>

                        <h2
                            style={{
                                color: "#1E3A5F",
                                fontWeight: "700",
                                marginBottom: "5px"
                            }}
                        >
                            Teacher Management
                        </h2>

                        <p
                            style={{
                                color: "#6B7C93",
                                marginBottom: 0
                            }}
                        >
                            Manage teacher information and records
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        style={{
                            backgroundColor: "#FFFFFF",
                            color: "#1E3A5F",
                            border: "1px solid #D9E2EC",
                            padding: "10px 20px",
                            borderRadius: "7px",
                            fontWeight: "600",
                            marginTop: "10px"
                        }}
                    >
                        Back to Dashboard
                    </button>

                </div>


                {/* ========================= */}
                {/* FORM CARD */}
                {/* ========================= */}

                <div
                    style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        boxShadow:
                            "0 4px 18px rgba(30,58,95,0.08)",
                        marginBottom: "30px",
                        overflow: "hidden"
                    }}
                >

                    {/* Form Header */}

                    <div
                        style={{
                            backgroundColor: "#1E3A5F",
                            padding: "18px 25px",
                            color: "#FFFFFF"
                        }}
                    >

                        <h5
                            style={{
                                margin: 0,
                                fontWeight: "600"
                            }}
                        >
                            {editingId !== null
                                ? "Update Teacher"
                                : "Add Teacher"}
                        </h5>

                    </div>


                    {/* Form Body */}

                    <div
                        style={{
                            padding: "28px"
                        }}
                    >

                        <div className="row">

                            {/* Teacher Name */}

                            <div className="col-md-6 mb-4">

                                <label
                                    className="form-label"
                                    style={labelStyle}
                                >
                                    Teacher Name
                                </label>

                                <input
                                    type="text"
                                    name="teacherName"
                                    className="form-control"
                                    placeholder="Enter teacher name"
                                    value={
                                        teacher.teacherName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={inputStyle}
                                />

                            </div>


                            {/* Email */}

                            <div className="col-md-6 mb-4">

                                <label
                                    className="form-label"
                                    style={labelStyle}
                                >
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email address"
                                    value={
                                        teacher.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={inputStyle}
                                />

                            </div>


                            {/* Phone */}

                            <div className="col-md-6 mb-4">

                                <label
                                    className="form-label"
                                    style={labelStyle}
                                >
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Enter phone number"
                                    value={
                                        teacher.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={inputStyle}
                                />

                            </div>


                            {/* Qualification */}

                            <div className="col-md-6 mb-4">

                                <label
                                    className="form-label"
                                    style={labelStyle}
                                >
                                    Qualification
                                </label>

                                <input
                                    type="text"
                                    name="qualification"
                                    className="form-control"
                                    placeholder="Enter qualification"
                                    value={
                                        teacher.qualification
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={inputStyle}
                                />

                            </div>


                            {/* Specialization */}

                            <div className="col-md-6 mb-4">

                                <label
                                    className="form-label"
                                    style={labelStyle}
                                >
                                    Specialization
                                </label>

                                <input
                                    type="text"
                                    name="specialization"
                                    className="form-control"
                                    placeholder="Enter specialization"
                                    value={
                                        teacher.specialization
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={inputStyle}
                                />

                            </div>


                            {/* Password */}

                            <div className="col-md-6 mb-4">

                                <label
                                    className="form-label"
                                    style={labelStyle}
                                >
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder={
                                        editingId !== null
                                            ? "Leave blank to keep current password"
                                            : "Enter password"
                                    }
                                    value={
                                        teacher.password
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    style={inputStyle}
                                />

                            </div>

                        </div>


                        {/* Buttons */}

                        <div
                            style={{
                                marginTop: "5px"
                            }}
                        >

                            {editingId !== null ? (

                                <button
                                    onClick={updateTeacher}
                                    style={{
                                        backgroundColor:
                                            "#4F7CAC",
                                        color: "#FFFFFF",
                                        border: "none",
                                        padding: "11px 22px",
                                        borderRadius: "7px",
                                        fontWeight: "600",
                                        marginRight: "10px"
                                    }}
                                >
                                    Update Teacher
                                </button>

                            ) : (

                                <button
                                    onClick={saveTeacher}
                                    style={{
                                        backgroundColor:
                                            "#1E3A5F",
                                        color: "#FFFFFF",
                                        border: "none",
                                        padding: "11px 22px",
                                        borderRadius: "7px",
                                        fontWeight: "600",
                                        marginRight: "10px"
                                    }}
                                >
                                    Save Teacher
                                </button>

                            )}

                            <button
                                onClick={clearForm}
                                style={{
                                    backgroundColor:
                                        "#EEF2F6",
                                    color: "#475569",
                                    border:
                                        "1px solid #D9E2EC",
                                    padding: "11px 22px",
                                    borderRadius: "7px",
                                    fontWeight: "600"
                                }}
                            >
                                Clear
                            </button>

                        </div>

                    </div>

                </div>


                {/* ========================= */}
                {/* TEACHER LIST */}
                {/* ========================= */}

                <div
                    style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        boxShadow:
                            "0 4px 18px rgba(30,58,95,0.08)",
                        overflow: "hidden"
                    }}
                >

                    {/* List Header */}

                    <div
                        className="d-flex justify-content-between align-items-center flex-wrap"
                        style={{
                            padding: "20px 25px",
                            borderBottom:
                                "1px solid #E5EAF0"
                        }}
                    >

                        <div>

                            <h5
                                style={{
                                    color: "#1E3A5F",
                                    fontWeight: "600",
                                    marginBottom: "3px"
                                }}
                            >
                                Teacher Records
                            </h5>

                            <small
                                style={{
                                    color: "#6B7C93"
                                }}
                            >
                                {teachers.length} teacher
                                {teachers.length !== 1
                                    ? "s"
                                    : ""} registered
                            </small>

                        </div>


                        {/* Search */}

                        <div
                            style={{
                                minWidth: "280px",
                                marginTop: "8px"
                            }}
                        >

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name, email or phone"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                style={{
                                    border:
                                        "1px solid #D9E2EC",
                                    borderRadius: "7px",
                                    padding: "10px 13px"
                                }}
                            />

                        </div>

                    </div>


                    {/* Table */}

                    <div className="table-responsive">

                        {loading ? (

                            <div
                                style={{
                                    padding: "50px",
                                    textAlign: "center",
                                    color: "#6B7C93"
                                }}
                            >
                                Loading teacher records...
                            </div>

                        ) : (

                            <table
                                className="table mb-0"
                                style={{
                                    minWidth: "900px"
                                }}
                            >

                                <thead>

                                    <tr
                                        style={{
                                            backgroundColor:
                                                "#EEF4F9"
                                        }}
                                    >

                                        <th style={thStyle}>
                                            ID
                                        </th>

                                        <th style={thStyle}>
                                            Teacher Name
                                        </th>

                                        <th style={thStyle}>
                                            Email
                                        </th>

                                        <th style={thStyle}>
                                            Phone
                                        </th>

                                        <th style={thStyle}>
                                            Qualification
                                        </th>

                                        <th style={thStyle}>
                                            Specialization
                                        </th>

                                        <th
                                            style={{
                                                ...thStyle,
                                                textAlign:
                                                    "center"
                                            }}
                                        >
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredTeachers.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                style={{
                                                    textAlign:
                                                        "center",
                                                    padding:
                                                        "45px",
                                                    color:
                                                        "#6B7C93"
                                                }}
                                            >
                                                No teacher records found.
                                            </td>

                                        </tr>

                                    ) : (

                                        filteredTeachers.map(
                                            (t) => (

                                                <tr
                                                    key={
                                                        t.teacherId
                                                    }
                                                >

                                                    <td
                                                        style={
                                                            tdStyle
                                                        }
                                                    >
                                                        {
                                                            t.teacherId
                                                        }
                                                    </td>

                                                    <td
                                                        style={{
                                                            ...tdStyle,
                                                            fontWeight:
                                                                "600",
                                                            color:
                                                                "#243447"
                                                        }}
                                                    >
                                                        {
                                                            t.teacherName
                                                        }
                                                    </td>

                                                    <td
                                                        style={
                                                            tdStyle
                                                        }
                                                    >
                                                        {
                                                            t.email
                                                        }
                                                    </td>

                                                    <td
                                                        style={
                                                            tdStyle
                                                        }
                                                    >
                                                        {
                                                            t.phone
                                                        }
                                                    </td>

                                                    <td
                                                        style={
                                                            tdStyle
                                                        }
                                                    >
                                                        {
                                                            t.qualification
                                                        }
                                                    </td>

                                                    <td
                                                        style={
                                                            tdStyle
                                                        }
                                                    >
                                                        <span
                                                            style={{
                                                                backgroundColor:
                                                                    "#E8F0F7",
                                                                color:
                                                                    "#1E3A5F",
                                                                padding:
                                                                    "5px 10px",
                                                                borderRadius:
                                                                    "5px",
                                                                fontSize:
                                                                    "13px",
                                                                fontWeight:
                                                                    "600"
                                                            }}
                                                        >
                                                            {
                                                                t.specialization
                                                            }
                                                        </span>
                                                    </td>

                                                    <td
                                                        style={{
                                                            ...tdStyle,
                                                            textAlign:
                                                                "center"
                                                        }}
                                                    >

                                                        <button
                                                            onClick={() =>
                                                                editTeacher(
                                                                    t
                                                                )
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    "#4F7CAC",
                                                                color:
                                                                    "#FFFFFF",
                                                                border:
                                                                    "none",
                                                                padding:
                                                                    "7px 15px",
                                                                borderRadius:
                                                                    "6px",
                                                                fontWeight:
                                                                    "500",
                                                                marginRight:
                                                                    "7px"
                                                            }}
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            onClick={() =>
                                                                deleteTeacher(
                                                                    t.teacherId
                                                                )
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    "#C94C4C",
                                                                color:
                                                                    "#FFFFFF",
                                                                border:
                                                                    "none",
                                                                padding:
                                                                    "7px 15px",
                                                                borderRadius:
                                                                    "6px",
                                                                fontWeight:
                                                                    "500"
                                                            }}
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}


// =========================
// Styles
// =========================

const labelStyle = {

    fontWeight: "600",

    color: "#243447",

    marginBottom: "7px"

};


const inputStyle = {

    border: "1px solid #D9E2EC",

    borderRadius: "7px",

    padding: "11px 13px",

    color: "#243447",

    backgroundColor: "#FAFCFE",

    boxShadow: "none"

};


const thStyle = {

    padding: "14px 15px",

    color: "#1E3A5F",

    fontWeight: "600",

    borderBottom:
        "1px solid #D9E2EC",

    whiteSpace: "nowrap"

};


const tdStyle = {

    padding: "13px 15px",

    color: "#526477",

    verticalAlign: "middle",

    borderBottom:
        "1px solid #EEF2F6"

};


export default TeacherManagement;