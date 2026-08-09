import React, { useEffect, useState } from "react";
import api from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function StudentManagement() {

    const navigate = useNavigate();

    // =========================
    // Theme Colors
    // =========================

    const NAVY = "#14213D";
    const SOFT_BLUE = "#EAF2F8";
    const LIGHT_BLUE = "#DCEAF5";
    const BORDER = "#D6E2EC";
    const TEXT = "#243447";
    const MUTED = "#64748B";
    const WHITE = "#FFFFFF";
    const SUCCESS = "#2E7D6F";
    const WARNING = "#C58A32";
    const DANGER = "#B84A4A";

    // =========================
    // Empty Student
    // =========================

    const emptyStudent = {
        studentName: "",
        email: "",
        phone: "",
        rollno: "",
        password: ""
    };

    // =========================
    // State
    // =========================

    const [student, setStudent] = useState(emptyStudent);

    const [students, setStudents] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    // =========================
    // Load Students
    // =========================

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        try {

            setLoading(true);

            const response = await api.get("/api/students/all");

            setStudents(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load students.");

        } finally {

            setLoading(false);

        }

    };

    // =========================
    // Handle Input Change
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setStudent({
            ...student,
            [name]: value
        });

    };

    // =========================
    // Validate Form
    // =========================

    const validateForm = () => {

        if (student.studentName.trim() === "") {

            alert("Student Name is required.");
            return false;

        }

        if (student.email.trim() === "") {

            alert("Email is required.");
            return false;

        }

        if (student.phone.trim() === "") {

            alert("Phone is required.");
            return false;

        }

        if (student.rollno.trim() === "") {

            alert("Roll Number is required.");
            return false;

        }

        /*
         * Password required while adding.
         * During editing, password can remain empty.
         */

        if (
            editingId === null &&
            student.password.trim() === ""
        ) {

            alert("Password is required.");
            return false;

        }

        return true;

    };

    // =========================
    // Add Student
    // =========================

    const saveStudent = async () => {

        if (!validateForm()) {
            return;
        }

        try {

            await api.post(
                "/api/students/register",
                student
            );

            alert("Student Added Successfully.");

            clearForm();

            await loadStudents();

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert("Unable to save student.");

        }

    };

    // =========================
    // Update Student
    // =========================

    const updateStudent = async () => {

        if (!validateForm()) {
            return;
        }

        try {

            const updateData = {

                studentName: student.studentName,

                email: student.email,

                phone: student.phone,

                rollno: student.rollno

            };

            /*
             * Only send password if user
             * entered a new password.
             */

            if (student.password.trim() !== "") {

                updateData.password =
                    student.password;

            }

            await api.put(
                "/api/students/update/" + editingId,
                updateData
            );

            alert("Student Updated Successfully.");

            clearForm();

            await loadStudents();

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert("Unable to update student.");

        }

    };

    // =========================
    // Edit Student
    // =========================

    const editStudent = (s) => {

        setEditingId(s.studentId);

        setStudent({

            studentName: s.studentName || "",

            email: s.email || "",

            phone: s.phone || "",

            rollno: s.rollno || "",

            password: ""

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    // =========================
    // Delete Student
    // =========================

    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                "/api/students/delete/" + id
            );

            alert("Student Deleted Successfully.");

            await loadStudents();

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert("Unable to delete student.");

        }

    };

    // =========================
    // Clear Form
    // =========================

    const clearForm = () => {

        setStudent({
            ...emptyStudent
        });

        setEditingId(null);

    };

    // =========================
    // Search
    // =========================

    const filteredStudents = students.filter((s) => {

        const studentName =
            s.studentName
                ? s.studentName.toLowerCase()
                : "";

        const email =
            s.email
                ? s.email.toLowerCase()
                : "";

        const phone =
            s.phone
                ? String(s.phone)
                : "";

        const rollno =
            s.rollno
                ? String(s.rollno).toLowerCase()
                : "";

        const searchText =
            search.toLowerCase();

        return (

            studentName.includes(searchText)

            ||

            email.includes(searchText)

            ||

            phone.includes(search)

            ||

            rollno.includes(searchText)

        );

    });

    // =========================
    // UI
    // =========================

    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #F5F9FC 0%, #EAF2F8 100%)",
                padding: "30px 15px 60px"
            }}
        >

            <div
                style={{
                    maxWidth: "1250px",
                    margin: "0 auto"
                }}
            >

                {/* ========================= */}
                {/* PAGE HEADER */}
                {/* ========================= */}

                <div
                    className="d-flex justify-content-between align-items-center flex-wrap gap-3"
                    style={{
                        marginBottom: "28px"
                    }}
                >

                    <div>

                        <div
                            style={{
                                fontSize: "13px",
                                color: MUTED,
                                fontWeight: "600",
                                letterSpacing: "0.5px",
                                marginBottom: "5px"
                            }}
                        >
                            ADMINISTRATION
                        </div>

                        <h2
                            style={{
                                color: NAVY,
                                fontWeight: "700",
                                margin: 0
                            }}
                        >
                            Student Management
                        </h2>

                        <p
                            style={{
                                color: MUTED,
                                marginTop: "7px",
                                marginBottom: 0
                            }}
                        >
                            Manage student records and account information
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        style={{
                            backgroundColor: WHITE,
                            color: NAVY,
                            border: `1px solid ${BORDER}`,
                            padding: "10px 20px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            boxShadow:
                                "0 2px 8px rgba(20,33,61,0.06)"
                        }}
                    >
                        Back to Dashboard
                    </button>

                </div>


                {/* ========================= */}
                {/* ADD / UPDATE STUDENT */}
                {/* ========================= */}

                <div
                    style={{
                        backgroundColor: WHITE,
                        borderRadius: "12px",
                        border: `1px solid ${BORDER}`,
                        boxShadow:
                            "0 5px 18px rgba(20,33,61,0.07)",
                        overflow: "hidden",
                        marginBottom: "28px"
                    }}
                >

                    {/* Header */}

                    <div
                        style={{
                            background:
                                "linear-gradient(90deg, #14213D, #274B73)",
                            padding: "20px 25px",
                            color: WHITE
                        }}
                    >

                        <h4
                            style={{
                                margin: 0,
                                fontWeight: "600"
                            }}
                        >
                            {editingId !== null
                                ? "Update Student"
                                : "Add Student"}
                        </h4>

                        <small
                            style={{
                                opacity: 0.85
                            }}
                        >
                            {editingId !== null
                                ? "Update the student's information below."
                                : "Enter the student's information to create a new record."}
                        </small>

                    </div>


                    {/* Form */}

                    <div
                        style={{
                            padding: "28px"
                        }}
                    >

                        <div className="row">

                            {/* Student Name */}

                            <div className="col-md-6 mb-4">

                                <label
                                    style={{
                                        color: TEXT,
                                        fontWeight: "600",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Student Name
                                </label>

                                <input
                                    type="text"
                                    name="studentName"
                                    className="form-control"
                                    placeholder="Enter student name"
                                    value={student.studentName}
                                    onChange={handleChange}
                                    style={{
                                        padding: "11px 13px",
                                        borderColor: BORDER,
                                        borderRadius: "7px"
                                    }}
                                />

                            </div>


                            {/* Email */}

                            <div className="col-md-6 mb-4">

                                <label
                                    style={{
                                        color: TEXT,
                                        fontWeight: "600",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter email address"
                                    value={student.email}
                                    onChange={handleChange}
                                    style={{
                                        padding: "11px 13px",
                                        borderColor: BORDER,
                                        borderRadius: "7px"
                                    }}
                                />

                            </div>


                            {/* Phone */}

                            <div className="col-md-6 mb-4">

                                <label
                                    style={{
                                        color: TEXT,
                                        fontWeight: "600",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Enter phone number"
                                    value={student.phone}
                                    onChange={handleChange}
                                    style={{
                                        padding: "11px 13px",
                                        borderColor: BORDER,
                                        borderRadius: "7px"
                                    }}
                                />

                            </div>


                            {/* Roll Number */}

                            <div className="col-md-6 mb-4">

                                <label
                                    style={{
                                        color: TEXT,
                                        fontWeight: "600",
                                        marginBottom: "8px"
                                    }}
                                >
                                    Roll Number
                                </label>

                                <input
                                    type="text"
                                    name="rollno"
                                    className="form-control"
                                    placeholder="Enter roll number"
                                    value={student.rollno}
                                    onChange={handleChange}
                                    style={{
                                        padding: "11px 13px",
                                        borderColor: BORDER,
                                        borderRadius: "7px"
                                    }}
                                />

                            </div>


                            {/* Password */}

                            <div className="col-md-6 mb-4">

                                <label
                                    style={{
                                        color: TEXT,
                                        fontWeight: "600",
                                        marginBottom: "8px"
                                    }}
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
                                    value={student.password}
                                    onChange={handleChange}
                                    style={{
                                        padding: "11px 13px",
                                        borderColor: BORDER,
                                        borderRadius: "7px"
                                    }}
                                />

                                {editingId !== null && (

                                    <small
                                        style={{
                                            color: MUTED,
                                            display: "block",
                                            marginTop: "6px"
                                        }}
                                    >
                                        Leave blank if the password should remain unchanged.
                                    </small>

                                )}

                            </div>

                        </div>


                        {/* Buttons */}

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "5px"
                            }}
                        >

                            {editingId !== null ? (

                                <button
                                    onClick={updateStudent}
                                    style={{
                                        backgroundColor: NAVY,
                                        color: WHITE,
                                        border: "none",
                                        padding: "11px 22px",
                                        borderRadius: "7px",
                                        fontWeight: "600"
                                    }}
                                >
                                    Update Student
                                </button>

                            ) : (

                                <button
                                    onClick={saveStudent}
                                    style={{
                                        backgroundColor: SUCCESS,
                                        color: WHITE,
                                        border: "none",
                                        padding: "11px 22px",
                                        borderRadius: "7px",
                                        fontWeight: "600"
                                    }}
                                >
                                    Save Student
                                </button>

                            )}

                            <button
                                onClick={clearForm}
                                style={{
                                    backgroundColor: "#F1F5F9",
                                    color: TEXT,
                                    border: `1px solid ${BORDER}`,
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
                {/* STUDENT LIST */}
                {/* ========================= */}

                <div
                    style={{
                        backgroundColor: WHITE,
                        borderRadius: "12px",
                        border: `1px solid ${BORDER}`,
                        boxShadow:
                            "0 5px 18px rgba(20,33,61,0.07)",
                        overflow: "hidden"
                    }}
                >

                    {/* List Header */}

                    <div
                        style={{
                            padding: "20px 25px",
                            backgroundColor: SOFT_BLUE,
                            borderBottom:
                                `1px solid ${BORDER}`
                        }}
                    >

                        <div className="row align-items-center">

                            <div className="col-md-6 mb-3 mb-md-0">

                                <h4
                                    style={{
                                        color: NAVY,
                                        fontWeight: "600",
                                        margin: 0
                                    }}
                                >
                                    Student List
                                </h4>

                                <small
                                    style={{
                                        color: MUTED
                                    }}
                                >
                                    {filteredStudents.length} student
                                    {filteredStudents.length !== 1
                                        ? "s"
                                        : ""} found
                                </small>

                            </div>


                            <div className="col-md-6">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by name, email, phone or roll number"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        padding: "11px 14px",
                                        borderColor: BORDER,
                                        borderRadius: "7px"
                                    }}
                                />

                            </div>

                        </div>

                    </div>


                    {/* Table */}

                    <div
                        style={{
                            padding: "22px"
                        }}
                    >

                        {loading ? (

                            <div
                                className="text-center"
                                style={{
                                    padding: "45px",
                                    color: MUTED
                                }}
                            >

                                <div
                                    className="spinner-border"
                                    role="status"
                                    style={{
                                        color: NAVY,
                                        marginBottom: "12px"
                                    }}
                                />

                                <div>
                                    Loading students...
                                </div>

                            </div>

                        ) : (

                            <div
                                className="table-responsive"
                            >

                                <table
                                    className="table align-middle"
                                    style={{
                                        marginBottom: 0
                                    }}
                                >

                                    <thead>

                                        <tr
                                            style={{
                                                backgroundColor: NAVY,
                                                color: WHITE
                                            }}
                                        >

                                            <th
                                                style={{
                                                    padding: "14px"
                                                }}
                                            >
                                                ID
                                            </th>

                                            <th
                                                style={{
                                                    padding: "14px"
                                                }}
                                            >
                                                Name
                                            </th>

                                            <th
                                                style={{
                                                    padding: "14px"
                                                }}
                                            >
                                                Email
                                            </th>

                                            <th
                                                style={{
                                                    padding: "14px"
                                                }}
                                            >
                                                Phone
                                            </th>

                                            <th
                                                style={{
                                                    padding: "14px"
                                                }}
                                            >
                                                Roll Number
                                            </th>

                                            <th
                                                style={{
                                                    padding: "14px",
                                                    textAlign: "center"
                                                }}
                                            >
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredStudents.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="text-center"
                                                    style={{
                                                        padding: "45px",
                                                        color: MUTED
                                                    }}
                                                >
                                                    No students found.
                                                </td>

                                            </tr>

                                        ) : (

                                            filteredStudents.map(
                                                (s) => (

                                                    <tr
                                                        key={
                                                            s.studentId
                                                        }
                                                        style={{
                                                            borderBottom:
                                                                `1px solid ${BORDER}`
                                                        }}
                                                    >

                                                        <td
                                                            style={{
                                                                color: NAVY,
                                                                fontWeight: "600"
                                                            }}
                                                        >
                                                            {
                                                                s.studentId
                                                            }
                                                        </td>

                                                        <td
                                                            style={{
                                                                color: TEXT,
                                                                fontWeight: "600"
                                                            }}
                                                        >
                                                            {
                                                                s.studentName
                                                            }
                                                        </td>

                                                        <td
                                                            style={{
                                                                color: MUTED
                                                            }}
                                                        >
                                                            {
                                                                s.email
                                                            }
                                                        </td>

                                                        <td
                                                            style={{
                                                                color: MUTED
                                                            }}
                                                        >
                                                            {
                                                                s.phone
                                                            }
                                                        </td>

                                                        <td
                                                            style={{
                                                                color: TEXT
                                                            }}
                                                        >
                                                            {
                                                                s.rollno
                                                            }
                                                        </td>

                                                        <td
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                                whiteSpace:
                                                                    "nowrap"
                                                            }}
                                                        >

                                                            <button
                                                                onClick={() =>
                                                                    editStudent(
                                                                        s
                                                                    )
                                                                }
                                                                style={{
                                                                    backgroundColor:
                                                                        LIGHT_BLUE,
                                                                    color: NAVY,
                                                                    border:
                                                                        "none",
                                                                    padding:
                                                                        "7px 15px",
                                                                    borderRadius:
                                                                        "6px",
                                                                    fontWeight:
                                                                        "600",
                                                                    marginRight:
                                                                        "7px"
                                                                }}
                                                            >
                                                                Edit
                                                            </button>


                                                            <button
                                                                onClick={() =>
                                                                    deleteStudent(
                                                                        s.studentId
                                                                    )
                                                                }
                                                                style={{
                                                                    backgroundColor:
                                                                        "#F8E7E7",
                                                                    color: DANGER,
                                                                    border:
                                                                        "none",
                                                                    padding:
                                                                        "7px 15px",
                                                                    borderRadius:
                                                                        "6px",
                                                                    fontWeight:
                                                                        "600"
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

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StudentManagement;