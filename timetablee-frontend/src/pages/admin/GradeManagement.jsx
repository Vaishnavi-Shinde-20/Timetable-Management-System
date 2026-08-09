import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:9000/api/grades";

function GradeManagement() {

    const navigate = useNavigate();

    const [grades, setGrades] = useState([]);

    const [gradeName, setGradeName] = useState("");
    const [description, setDescription] = useState("");

    const [editing, setEditing] = useState(false);
    const [gradeId, setGradeId] = useState(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // =========================
    // Load Grades
    // =========================

    useEffect(() => {
        loadGrades();
    }, []);

    const loadGrades = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                `${API_URL}/all`
            );

            setGrades(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load grades.");

        } finally {

            setLoading(false);

        }

    };

    // =========================
    // Reset Form
    // =========================

    const resetForm = () => {

        setGradeId(null);

        setGradeName("");

        setDescription("");

        setEditing(false);

    };

    // =========================
    // Add / Update Grade
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!gradeName.trim()) {

            alert("Grade Name is required.");

            return;

        }

        if (!description.trim()) {

            alert("Description is required.");

            return;

        }

        const grade = {

            gradeName: gradeName.trim(),

            description: description.trim()

        };

        try {

            setLoading(true);

            if (editing) {

                await axios.put(
                    `${API_URL}/update/${gradeId}`,
                    grade
                );

                alert("Grade Updated Successfully.");

            } else {

                await axios.post(
                    `${API_URL}/add`,
                    grade
                );

                alert("Grade Added Successfully.");

            }

            resetForm();

            await loadGrades();

        } catch (error) {

            console.log(error);

            if (editing) {

                alert("Unable to update grade.");

            } else {

                alert("Unable to add grade.");

            }

        } finally {

            setLoading(false);

        }

    };

    // =========================
    // Edit Grade
    // =========================

    const handleEdit = (grade) => {

        setEditing(true);

        setGradeId(grade.gradeId);

        setGradeName(
            grade.gradeName || ""
        );

        setDescription(
            grade.description || ""
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    // =========================
    // Delete Grade
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this grade?"
        );

        if (!confirmDelete) {

            return;

        }

        try {

            await axios.delete(
                `${API_URL}/delete/${id}`
            );

            alert("Grade Deleted Successfully.");

            await loadGrades();

        } catch (error) {

            console.log(error);

            alert(
                "Unable to delete grade. It may be used by other records."
            );

        }

    };

    // =========================
    // Search
    // =========================

    const filteredGrades = grades.filter((grade) => {

        const name = grade.gradeName
            ? grade.gradeName.toLowerCase()
            : "";

        const description = grade.description
            ? grade.description.toLowerCase()
            : "";

        const searchText =
            search.toLowerCase();

        return (
            name.includes(searchText) ||
            description.includes(searchText)
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
                    "linear-gradient(135deg, #eef4fb 0%, #dfeaf6 100%)",
                padding: "35px 20px"
            }}
        >

            <div
                style={{
                    maxWidth: "1150px",
                    margin: "0 auto"
                }}
            >

                {/* ========================= */}
                {/* PAGE HEADER */}
                {/* ========================= */}

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                    style={{
                        background: "#ffffff",
                        padding: "22px 28px",
                        borderRadius: "14px",
                        boxShadow:
                            "0 5px 18px rgba(24, 50, 81, 0.10)",
                        borderLeft:
                            "5px solid #17324d"
                    }}
                >

                    <div>

                        <h2
                            className="mb-1"
                            style={{
                                color: "#17324d",
                                fontWeight: "700"
                            }}
                        >
                            Grade Management
                        </h2>

                        <p
                            className="mb-0"
                            style={{
                                color: "#718096",
                                fontSize: "14px"
                            }}
                        >
                            Manage grades and their descriptions
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        style={{
                            background: "#17324d",
                            color: "#ffffff",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            fontWeight: "500"
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
                        background: "#ffffff",
                        borderRadius: "14px",
                        padding: "30px",
                        marginBottom: "28px",
                        boxShadow:
                            "0 5px 18px rgba(24, 50, 81, 0.10)"
                    }}
                >

                    <div
                        className="d-flex justify-content-between align-items-center mb-4"
                    >

                        <div>

                            <h4
                                className="mb-1"
                                style={{
                                    color: "#17324d",
                                    fontWeight: "700"
                                }}
                            >
                                {editing
                                    ? "Update Grade"
                                    : "Add New Grade"}
                            </h4>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#7a8899",
                                    fontSize: "14px"
                                }}
                            >
                                {editing
                                    ? "Modify the selected grade details."
                                    : "Enter the grade information below."}
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            {/* Grade Name */}

                            <div className="col-md-6 mb-3">

                                <label
                                    className="form-label"
                                    style={{
                                        color: "#334e68",
                                        fontWeight: "600"
                                    }}
                                >
                                    Grade Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter grade name"
                                    value={gradeName}
                                    onChange={(e) =>
                                        setGradeName(
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border:
                                            "1px solid #cbd8e6"
                                    }}
                                />

                            </div>


                            {/* Description */}

                            <div className="col-md-6 mb-3">

                                <label
                                    className="form-label"
                                    style={{
                                        color: "#334e68",
                                        fontWeight: "600"
                                    }}
                                >
                                    Description
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter grade description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        padding: "12px",
                                        borderRadius: "8px",
                                        border:
                                            "1px solid #cbd8e6"
                                    }}
                                />

                            </div>

                        </div>


                        {/* Buttons */}

                        <div className="mt-3">

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    background:
                                        editing
                                            ? "#4f7ea8"
                                            : "#17324d",
                                    color: "#ffffff",
                                    border: "none",
                                    padding: "11px 24px",
                                    borderRadius: "8px",
                                    fontWeight: "500",
                                    marginRight: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                {loading
                                    ? "Please wait..."
                                    : editing
                                        ? "Update Grade"
                                        : "Add Grade"}
                            </button>


                            {editing && (

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    style={{
                                        background: "#e7edf4",
                                        color: "#334e68",
                                        border:
                                            "1px solid #cbd8e6",
                                        padding: "11px 24px",
                                        borderRadius: "8px",
                                        fontWeight: "500"
                                    }}
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    </form>

                </div>


                {/* ========================= */}
                {/* GRADE LIST */}
                {/* ========================= */}

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "14px",
                        padding: "30px",
                        boxShadow:
                            "0 5px 18px rgba(24, 50, 81, 0.10)"
                    }}
                >

                    <div
                        className="row align-items-center mb-4"
                    >

                        <div className="col-md-6">

                            <h4
                                className="mb-1"
                                style={{
                                    color: "#17324d",
                                    fontWeight: "700"
                                }}
                            >
                                Grade List
                            </h4>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#7a8899",
                                    fontSize: "14px"
                                }}
                            >
                                {grades.length} grade
                                {grades.length !== 1
                                    ? "s"
                                    : ""} available
                            </p>

                        </div>


                        <div
                            className="col-md-6 mt-3 mt-md-0"
                        >

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search grade..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                style={{
                                    padding: "11px 14px",
                                    borderRadius: "8px",
                                    border:
                                        "1px solid #cbd8e6"
                                }}
                            />

                        </div>

                    </div>


                    {loading ? (

                        <div
                            className="text-center py-5"
                        >

                            <div
                                className="spinner-border"
                                style={{
                                    color: "#4f7ea8"
                                }}
                            ></div>

                            <p
                                className="mt-3 mb-0"
                                style={{
                                    color: "#718096"
                                }}
                            >
                                Loading grades...
                            </p>

                        </div>

                    ) : filteredGrades.length === 0 ? (

                        <div
                            className="text-center py-5"
                            style={{
                                background: "#f5f8fc",
                                borderRadius: "10px"
                            }}
                        >

                            <h5
                                style={{
                                    color: "#4a6075"
                                }}
                            >
                                No Grades Found
                            </h5>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#8492a2"
                                }}
                            >
                                Try changing your search
                                or add a new grade.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="table-responsive"
                        >

                            <table
                                className="table align-middle mb-0"
                                style={{
                                    minWidth: "700px"
                                }}
                            >

                                <thead>

                                    <tr
                                        style={{
                                            background:
                                                "#17324d",
                                            color:
                                                "#ffffff"
                                        }}
                                    >

                                        <th
                                            style={thStyle}
                                        >
                                            ID
                                        </th>

                                        <th
                                            style={thStyle}
                                        >
                                            Grade Name
                                        </th>

                                        <th
                                            style={thStyle}
                                        >
                                            Description
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

                                    {filteredGrades.map(
                                        (grade) => (

                                            <tr
                                                key={
                                                    grade.gradeId
                                                }
                                                style={{
                                                    borderBottom:
                                                        "1px solid #e6edf5"
                                                }}
                                            >

                                                <td
                                                    style={
                                                        tdStyle
                                                    }
                                                >
                                                    {
                                                        grade.gradeId
                                                    }
                                                </td>

                                                <td
                                                    style={{
                                                        ...tdStyle,
                                                        fontWeight:
                                                            "600",
                                                        color:
                                                            "#284b63"
                                                    }}
                                                >
                                                    {
                                                        grade.gradeName
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tdStyle
                                                    }
                                                >
                                                    {
                                                        grade.description
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
                                                                grade
                                                            )
                                                        }
                                                        style={{
                                                            background:
                                                                "#4f7ea8",
                                                            color:
                                                                "#ffffff",
                                                            border:
                                                                "none",
                                                            padding:
                                                                "7px 15px",
                                                            borderRadius:
                                                                "6px",
                                                            marginRight:
                                                                "8px",
                                                            fontSize:
                                                                "14px"
                                                        }}
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                grade.gradeId
                                                            )
                                                        }
                                                        style={{
                                                            background:
                                                                "#a85d5d",
                                                            color:
                                                                "#ffffff",
                                                            border:
                                                                "none",
                                                            padding:
                                                                "7px 15px",
                                                            borderRadius:
                                                                "6px",
                                                            fontSize:
                                                                "14px"
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

    );

}


// =========================
// Table Styles
// =========================

const thStyle = {

    padding: "15px 14px",

    fontWeight: "600",

    border: "none",

    whiteSpace: "nowrap"

};


const tdStyle = {

    padding: "14px",

    color: "#526779",

    fontSize: "14px"

};


export default GradeManagement;