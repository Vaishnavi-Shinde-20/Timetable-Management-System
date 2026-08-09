import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CourseManagement() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [grades, setGrades] = useState([]);

    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [credits, setCredits] = useState("");
    const [gradeId, setGradeId] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const COURSE_API = "http://localhost:9000/api/courses";
    const GRADE_API = "http://localhost:9000/api/grades";


    // ==============================
    // Load Data
    // ==============================

    useEffect(() => {

        fetchCourses();
        fetchGrades();

    }, []);


    // ==============================
    // Fetch Courses
    // ==============================

    const fetchCourses = async () => {

        try {

            setLoading(true);

            const response = await fetch(
                `${COURSE_API}/all`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }

            const data = await response.json();

            setCourses(data);

        } catch (error) {

            console.error(
                "Error fetching courses:",
                error
            );

            alert("Unable to load courses.");

        } finally {

            setLoading(false);

        }

    };


    // ==============================
    // Fetch Grades
    // ==============================

    const fetchGrades = async () => {

        try {

            const response = await fetch(
                `${GRADE_API}/all`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch grades");
            }

            const data = await response.json();

            setGrades(data);

        } catch (error) {

            console.error(
                "Error fetching grades:",
                error
            );

            alert("Unable to load grades.");

        }

    };


    // ==============================
    // Clear Form
    // ==============================

    const clearForm = () => {

        setCourseName("");
        setCourseCode("");
        setCredits("");
        setGradeId("");
        setEditingId(null);

    };


    // ==============================
    // Handle Submit
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!courseName.trim()) {

            alert("Please enter course name.");
            return;

        }

        if (!courseCode.trim()) {

            alert("Please enter course code.");
            return;

        }

        if (!credits) {

            alert("Please enter credits.");
            return;

        }

        if (!gradeId) {

            alert("Please select a grade.");
            return;

        }

        const courseData = {

            courseName: courseName.trim(),

            courseCode: courseCode.trim(),

            credits: Number(credits),

            grade: {
                gradeId: Number(gradeId)
            }

        };

        setLoading(true);

        try {

            let response;

            // ==============================
            // Update
            // ==============================

            if (editingId !== null) {

                response = await fetch(
                    `${COURSE_API}/update/${editingId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(courseData)
                    }
                );

            }

            // ==============================
            // Add
            // ==============================

            else {

                response = await fetch(
                    `${COURSE_API}/add`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(courseData)
                    }
                );

            }


            if (!response.ok) {

                const errorText =
                    await response.text();

                console.error(
                    "Server error:",
                    errorText
                );

                throw new Error(
                    "Operation failed"
                );

            }


            const savedCourse =
                await response.json();


            // ==============================
            // Update Existing
            // ==============================

            if (editingId !== null) {

                setCourses(
                    courses.map((course) =>
                        course.courseId === editingId
                            ? savedCourse
                            : course
                    )
                );

                alert(
                    "Course updated successfully."
                );

            }

            // ==============================
            // Add New
            // ==============================

            else {

                setCourses([
                    ...courses,
                    savedCourse
                ]);

                alert(
                    "Course added successfully."
                );

            }

            clearForm();

        } catch (error) {

            console.error(
                "Error saving course:",
                error
            );

            alert(
                "Unable to save course. Please check the backend."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==============================
    // Edit Course
    // ==============================

    const handleEdit = (course) => {

        setEditingId(course.courseId);

        setCourseName(
            course.courseName || ""
        );

        setCourseCode(
            course.courseCode || ""
        );

        setCredits(
            course.credits || ""
        );

        if (course.grade) {

            setGradeId(
                course.grade.gradeId
            );

        } else {

            setGradeId("");

        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ==============================
    // Delete Course
    // ==============================

    const handleDelete = async (courseId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this course?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${COURSE_API}/delete/${courseId}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to delete course"
                );

            }

            setCourses(
                courses.filter(
                    (course) =>
                        course.courseId !== courseId
                )
            );

            alert(
                "Course deleted successfully."
            );

        } catch (error) {

            console.error(
                "Error deleting course:",
                error
            );

            alert(
                "Unable to delete course. It may be used in a timetable."
            );

        }

    };


    // ==============================
    // Filter Courses
    // ==============================

    const filteredCourses =
        courses.filter((course) => {

            const searchText =
                search.toLowerCase();

            return (

                (course.courseName || "")
                    .toLowerCase()
                    .includes(searchText)

                ||

                (course.courseCode || "")
                    .toLowerCase()
                    .includes(searchText)

                ||

                (
                    course.grade?.gradeName || ""
                )
                    .toLowerCase()
                    .includes(searchText)

            );

        });


    // ==============================
    // UI
    // ==============================

    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #eef4fb 0%, #f7faff 100%)",
                padding: "30px 15px",
                fontFamily:
                    "'Segoe UI', Arial, sans-serif"
            }}
        >

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >

                {/* =========================
                    HEADER
                ========================= */}

                <div
                    style={{
                        background:
                            "linear-gradient(135deg, #102a43, #1f4e79)",
                        borderRadius: "14px",
                        padding: "22px 28px",
                        marginBottom: "25px",
                        boxShadow:
                            "0 8px 22px rgba(16,42,67,0.18)",
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "center",
                        gap: "15px"
                    }}
                >

                    <div>

                        <h2
                            style={{
                                color: "#ffffff",
                                margin: 0,
                                fontWeight: "600",
                                letterSpacing: "0.3px"
                            }}
                        >
                            Course Management
                        </h2>

                        <p
                            style={{
                                color: "#cbdbea",
                                margin:
                                    "5px 0 0",
                                fontSize: "14px"
                            }}
                        >
                            Manage courses and their academic grades
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/dashboard"
                            )
                        }
                        style={{
                            backgroundColor:
                                "#dbeafe",
                            color: "#163a5f",
                            border: "none",
                            padding:
                                "10px 18px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            cursor: "pointer",
                            whiteSpace:
                                "nowrap"
                        }}
                    >
                        Back to Dashboard
                    </button>

                </div>


                {/* =========================
                    FORM CARD
                ========================= */}

                <div
                    style={{
                        backgroundColor:
                            "#ffffff",
                        borderRadius: "14px",
                        boxShadow:
                            "0 5px 20px rgba(31,78,121,0.10)",
                        marginBottom: "25px",
                        overflow: "hidden",
                        border:
                            "1px solid #dce8f3"
                    }}
                >

                    {/* Form Header */}

                    <div
                        style={{
                            background:
                                "#edf4fb",
                            padding:
                                "17px 24px",
                            borderBottom:
                                "1px solid #d8e5f1"
                        }}
                    >

                        <h4
                            style={{
                                margin: 0,
                                color: "#173f63",
                                fontWeight: "600"
                            }}
                        >
                            {editingId !== null
                                ? "Update Course"
                                : "Add New Course"}
                        </h4>

                        <p
                            style={{
                                margin:
                                    "4px 0 0",
                                color: "#687b8f",
                                fontSize: "13px"
                            }}
                        >
                            Enter the course information below.
                        </p>

                    </div>


                    {/* Form Body */}

                    <div
                        style={{
                            padding: "25px"
                        }}
                    >

                        <form
                            onSubmit={
                                handleSubmit
                            }
                        >

                            <div className="row">


                                {/* Course Name */}

                                <div
                                    className="col-md-6 mb-4"
                                >

                                    <label
                                        style={
                                            labelStyle
                                        }
                                    >
                                        Course Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter course name"
                                        value={
                                            courseName
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setCourseName(
                                                e.target.value
                                            )
                                        }
                                        style={
                                            inputStyle
                                        }
                                    />

                                </div>


                                {/* Course Code */}

                                <div
                                    className="col-md-6 mb-4"
                                >

                                    <label
                                        style={
                                            labelStyle
                                        }
                                    >
                                        Course Code
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter course code"
                                        value={
                                            courseCode
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setCourseCode(
                                                e.target.value
                                            )
                                        }
                                        style={
                                            inputStyle
                                        }
                                    />

                                </div>


                                {/* Credits */}

                                <div
                                    className="col-md-6 mb-4"
                                >

                                    <label
                                        style={
                                            labelStyle
                                        }
                                    >
                                        Credits
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        placeholder="Enter credits"
                                        value={
                                            credits
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setCredits(
                                                e.target.value
                                            )
                                        }
                                        style={
                                            inputStyle
                                        }
                                    />

                                </div>


                                {/* Grade */}

                                <div
                                    className="col-md-6 mb-4"
                                >

                                    <label
                                        style={
                                            labelStyle
                                        }
                                    >
                                        Grade
                                    </label>

                                    <select
                                        value={
                                            gradeId
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setGradeId(
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            ...inputStyle,
                                            backgroundColor:
                                                "#ffffff"
                                        }}
                                    >

                                        <option value="">
                                            Select Grade
                                        </option>

                                        {grades.map(
                                            (
                                                grade
                                            ) => (

                                                <option
                                                    key={
                                                        grade.gradeId
                                                    }
                                                    value={
                                                        grade.gradeId
                                                    }
                                                >
                                                    {
                                                        grade.gradeName
                                                    }
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                            </div>


                            {/* Buttons */}

                            <div
                                style={{
                                    display:
                                        "flex",
                                    gap: "10px",
                                    marginTop:
                                        "4px"
                                }}
                            >

                                <button
                                    type="submit"
                                    disabled={
                                        loading
                                    }
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #1f4e79, #2f6b9d)",
                                        color:
                                            "#ffffff",
                                        border:
                                            "none",
                                        padding:
                                            "11px 22px",
                                        borderRadius:
                                            "8px",
                                        fontWeight:
                                            "600",
                                        cursor:
                                            loading
                                                ? "not-allowed"
                                                : "pointer",
                                        opacity:
                                            loading
                                                ? 0.7
                                                : 1
                                    }}
                                >

                                    {loading
                                        ? "Please Wait..."
                                        : editingId !==
                                            null
                                            ? "Update Course"
                                            : "Add Course"}

                                </button>


                                {editingId !==
                                    null && (

                                        <button
                                            type="button"
                                            onClick={
                                                clearForm
                                            }
                                            style={{
                                                backgroundColor:
                                                    "#e8eef4",
                                                color:
                                                    "#40566d",
                                                border:
                                                    "1px solid #ccd9e5",
                                                padding:
                                                    "11px 22px",
                                                borderRadius:
                                                    "8px",
                                                fontWeight:
                                                    "600",
                                                cursor:
                                                    "pointer"
                                            }}
                                        >
                                            Cancel
                                        </button>

                                    )}

                            </div>

                        </form>

                    </div>

                </div>


                {/* =========================
                    COURSE LIST
                ========================= */}

                <div
                    style={{
                        backgroundColor:
                            "#ffffff",
                        borderRadius: "14px",
                        boxShadow:
                            "0 5px 20px rgba(31,78,121,0.10)",
                        overflow: "hidden",
                        border:
                            "1px solid #dce8f3"
                    }}
                >

                    {/* List Header */}

                    <div
                        style={{
                            background:
                                "#edf4fb",
                            padding:
                                "17px 24px",
                            borderBottom:
                                "1px solid #d8e5f1"
                        }}
                    >

                        <div className="row align-items-center">

                            <div className="col-md-6">

                                <h4
                                    style={{
                                        margin: 0,
                                        color:
                                            "#173f63",
                                        fontWeight:
                                            "600"
                                    }}
                                >
                                    Course List
                                </h4>

                            </div>


                            <div
                                className="col-md-6 mt-3 mt-md-0"
                            >

                                <input
                                    type="text"
                                    placeholder="Search by course name, code or grade..."
                                    value={
                                        search
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        ...inputStyle,
                                        backgroundColor:
                                            "#ffffff"
                                    }}
                                />

                            </div>

                        </div>

                    </div>


                    {/* Table */}

                    <div
                        style={{
                            padding: "20px"
                        }}
                    >

                        {loading ? (

                            <div
                                style={{
                                    textAlign:
                                        "center",
                                    padding:
                                        "45px",
                                    color:
                                        "#607589"
                                }}
                            >
                                Loading courses...
                            </div>

                        ) : filteredCourses.length ===
                            0 ? (

                            <div
                                style={{
                                    textAlign:
                                        "center",
                                    padding:
                                        "45px",
                                    color:
                                        "#718096"
                                }}
                            >
                                No courses found.
                            </div>

                        ) : (

                            <div
                                style={{
                                    overflowX:
                                        "auto"
                                }}
                            >

                                <table
                                    className="table mb-0"
                                    style={{
                                        minWidth:
                                            "850px"
                                    }}
                                >

                                    <thead>

                                        <tr
                                            style={{
                                                backgroundColor:
                                                    "#163a5f",
                                                color:
                                                    "#ffffff"
                                            }}
                                        >

                                            <th
                                                style={
                                                    thStyle
                                                }
                                            >
                                                ID
                                            </th>

                                            <th
                                                style={
                                                    thStyle
                                                }
                                            >
                                                Course Name
                                            </th>

                                            <th
                                                style={
                                                    thStyle
                                                }
                                            >
                                                Course Code
                                            </th>

                                            <th
                                                style={
                                                    thStyle
                                                }
                                            >
                                                Credits
                                            </th>

                                            <th
                                                style={
                                                    thStyle
                                                }
                                            >
                                                Grade
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

                                        {filteredCourses.map(
                                            (
                                                course,
                                                index
                                            ) => (

                                                <tr
                                                    key={
                                                        course.courseId
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            index %
                                                                2 ===
                                                                0
                                                                ? "#ffffff"
                                                                : "#f7faff"
                                                    }}
                                                >

                                                    <td
                                                        style={
                                                            tdStyle
                                                        }
                                                    >
                                                        {
                                                            course.courseId
                                                        }
                                                    </td>

                                                    <td
                                                        style={{
                                                            ...tdStyle,
                                                            fontWeight:
                                                                "600",
                                                            color:
                                                                "#24445f"
                                                        }}
                                                    >
                                                        {
                                                            course.courseName
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
                                                                    "#e4eef8",
                                                                color:
                                                                    "#28557c",
                                                                padding:
                                                                    "5px 10px",
                                                                borderRadius:
                                                                    "6px",
                                                                fontSize:
                                                                    "13px",
                                                                fontWeight:
                                                                    "600"
                                                            }}
                                                        >
                                                            {
                                                                course.courseCode
                                                            }
                                                        </span>
                                                    </td>

                                                    <td
                                                        style={
                                                            tdStyle
                                                        }
                                                    >
                                                        {
                                                            course.credits
                                                        }
                                                    </td>

                                                    <td
                                                        style={
                                                            tdStyle
                                                        }
                                                    >
                                                        {
                                                            course
                                                                .grade
                                                                ? course
                                                                    .grade
                                                                    .gradeName
                                                                : "N/A"
                                                        }
                                                    </td>

                                                    <td
                                                        style={{
                                                            ...tdStyle,
                                                            textAlign:
                                                                "center"
                                                        }}
                                                    >

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    course
                                                                )
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    "#dbeafe",
                                                                color:
                                                                    "#174a72",
                                                                border:
                                                                    "1px solid #b9d3ea",
                                                                padding:
                                                                    "7px 15px",
                                                                borderRadius:
                                                                    "7px",
                                                                cursor:
                                                                    "pointer",
                                                                fontWeight:
                                                                    "600",
                                                                marginRight:
                                                                    "8px"
                                                            }}
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    course.courseId
                                                                )
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    "#f4dede",
                                                                color:
                                                                    "#8b3030",
                                                                border:
                                                                    "1px solid #e6c0c0",
                                                                padding:
                                                                    "7px 15px",
                                                                borderRadius:
                                                                    "7px",
                                                                cursor:
                                                                    "pointer",
                                                                fontWeight:
                                                                    "600"
                                                            }}
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

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


// ========================================
// Common Styles
// ========================================

const labelStyle = {

    display: "block",

    marginBottom: "7px",

    fontWeight: "600",

    color: "#29465f",

    fontSize: "14px"

};


const inputStyle = {

    width: "100%",

    padding: "11px 13px",

    border:
        "1px solid #cbd9e6",

    borderRadius: "8px",

    fontSize: "14px",

    color: "#243b53",

    outline: "none",

    boxSizing: "border-box"

};


const thStyle = {

    padding: "13px 12px",

    border: "none",

    fontSize: "14px",

    fontWeight: "600",

    whiteSpace: "nowrap"

};


const tdStyle = {

    padding: "13px 12px",

    borderBottom:
        "1px solid #e5edf5",

    color: "#536b80",

    fontSize: "14px",

    verticalAlign: "middle"

};


export default CourseManagement;