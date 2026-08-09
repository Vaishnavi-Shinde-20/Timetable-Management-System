import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BATCH_API = "http://localhost:9000/api/batches";
const GRADE_API = "http://localhost:9000/api/grades";

function BatchManagement() {

    const navigate = useNavigate();

    const [batches, setBatches] = useState([]);
    const [grades, setGrades] = useState([]);

    const [batchName, setBatchName] = useState("");
    const [gradeId, setGradeId] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // ==============================
    // Load Data
    // ==============================

    useEffect(() => {

        fetchBatches();
        fetchGrades();

    }, []);

    // ==============================
    // Fetch All Batches
    // ==============================

    const fetchBatches = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                `${BATCH_API}/all`
            );

            setBatches(response.data);

        } catch (error) {

            console.error(
                "Error fetching batches:",
                error
            );

            alert("Unable to load batches.");

        } finally {

            setLoading(false);

        }

    };

    // ==============================
    // Fetch All Grades
    // ==============================

    const fetchGrades = async () => {

        try {

            const response = await axios.get(
                `${GRADE_API}/all`
            );

            setGrades(response.data);

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

        setBatchName("");
        setGradeId("");
        setEditingId(null);

    };

    // ==============================
    // Add / Update Batch
    // ==============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (batchName.trim() === "") {

            alert("Please enter batch name.");
            return;

        }

        if (gradeId === "") {

            alert("Please select a grade.");
            return;

        }

        const batchData = {

            batchName: batchName.trim(),

            grade: {
                gradeId: Number(gradeId)
            }

        };

        try {

            setLoading(true);

            if (editingId !== null) {

                await axios.put(
                    `${BATCH_API}/update/${editingId}`,
                    batchData
                );

                alert("Batch updated successfully.");

            } else {

                await axios.post(
                    `${BATCH_API}/add`,
                    batchData
                );

                alert("Batch added successfully.");

            }

            clearForm();

            await fetchBatches();

        } catch (error) {

            console.error(
                "Error saving batch:",
                error
            );

            if (
                error.response &&
                error.response.data
            ) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert(
                "Unable to save batch. Please check the backend."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==============================
    // Edit Batch
    // ==============================

    const handleEdit = (batch) => {

        setEditingId(batch.batchId);

        setBatchName(
            batch.batchName || ""
        );

        if (batch.grade) {

            setGradeId(
                batch.grade.gradeId
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
    // Delete Batch
    // ==============================

    const handleDelete = async (batchId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this batch?"
            );

        if (!confirmDelete) {

            return;

        }

        try {

            setLoading(true);

            await axios.delete(
                `${BATCH_API}/delete/${batchId}`
            );

            alert("Batch deleted successfully.");

            await fetchBatches();

        } catch (error) {

            console.error(
                "Error deleting batch:",
                error
            );

            if (
                error.response &&
                error.response.data
            ) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert(
                "Unable to delete batch. It may be used in other records."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==============================
    // UI
    // ==============================

    return (

        <div style={styles.page}>

            <div style={styles.container}>

                {/* ==============================
                    HEADER
                ============================== */}

                <div style={styles.header}>

                    <div>

                        <div style={styles.smallTitle}>
                            ADMINISTRATION
                        </div>

                        <h1 style={styles.heading}>
                            Batch Management
                        </h1>

                        <p style={styles.subtitle}>
                            Manage batches and their associated grades
                        </p>

                    </div>

                    <button
                        style={styles.backButton}
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </div>


                {/* ==============================
                    FORM CARD
                ============================== */}

                <div style={styles.formCard}>

                    <div style={styles.sectionHeader}>

                        <div>

                            <h2 style={styles.sectionTitle}>

                                {editingId !== null
                                    ? "Update Batch"
                                    : "Add New Batch"}

                            </h2>

                            <p style={styles.sectionSubtitle}>
                                Enter the batch details below
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div style={styles.formGrid}>

                            {/* Batch Name */}

                            <div style={styles.formGroup}>

                                <label style={styles.label}>
                                    Batch Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter batch name"
                                    value={batchName}
                                    onChange={(e) =>
                                        setBatchName(
                                            e.target.value
                                        )
                                    }
                                    style={styles.input}
                                />

                            </div>


                            {/* Grade */}

                            <div style={styles.formGroup}>

                                <label style={styles.label}>
                                    Grade
                                </label>

                                <select
                                    value={gradeId}
                                    onChange={(e) =>
                                        setGradeId(
                                            e.target.value
                                        )
                                    }
                                    style={styles.input}
                                >

                                    <option value="">
                                        Select Grade
                                    </option>

                                    {grades.map((grade) => (

                                        <option
                                            key={grade.gradeId}
                                            value={grade.gradeId}
                                        >

                                            {grade.gradeName}

                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>


                        {/* Buttons */}

                        <div style={styles.buttonRow}>

                            <button
                                type="submit"
                                disabled={loading}
                                style={
                                    editingId !== null
                                        ? styles.updateButton
                                        : styles.addButton
                                }
                            >

                                {loading
                                    ? "Please wait..."
                                    : editingId !== null
                                        ? "Update Batch"
                                        : "Add Batch"}

                            </button>


                            {editingId !== null && (

                                <button
                                    type="button"
                                    onClick={clearForm}
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>

                            )}

                        </div>

                    </form>

                </div>


                {/* ==============================
                    BATCH LIST
                ============================== */}

                <div style={styles.tableCard}>

                    <div style={styles.listHeader}>

                        <div>

                            <h2 style={styles.sectionTitle}>
                                Batch List
                            </h2>

                            <p style={styles.sectionSubtitle}>
                                All batches registered in the system
                            </p>

                        </div>

                        <div style={styles.countBox}>

                            {batches.length}

                            <span style={styles.countText}>
                                Batches
                            </span>

                        </div>

                    </div>


                    {loading ? (

                        <div style={styles.loading}>
                            Loading...
                        </div>

                    ) : batches.length === 0 ? (

                        <div style={styles.noData}>
                            <h4>No Batches Found</h4>

                            <p>
                                Add a batch to display it here.
                            </p>
                        </div>

                    ) : (

                        <div style={styles.tableWrapper}>

                            <table style={styles.table}>

                                <thead>

                                    <tr>

                                        <th style={styles.th}>
                                            ID
                                        </th>

                                        <th style={styles.th}>
                                            Batch Name
                                        </th>

                                        <th style={styles.th}>
                                            Grade
                                        </th>

                                        <th style={styles.th}>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {batches.map((batch) => (

                                        <tr
                                            key={batch.batchId}
                                            style={styles.tableRow}
                                        >

                                            <td style={styles.td}>
                                                {batch.batchId}
                                            </td>

                                            <td style={styles.td}>
                                                <strong>
                                                    {batch.batchName}
                                                </strong>
                                            </td>

                                            <td style={styles.td}>

                                                {batch.grade
                                                    ? batch.grade.gradeName
                                                    : "N/A"}

                                            </td>

                                            <td style={styles.td}>

                                                <button
                                                    onClick={() =>
                                                        handleEdit(
                                                            batch
                                                        )
                                                    }
                                                    style={
                                                        styles.editButton
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            batch.batchId
                                                        )
                                                    }
                                                    style={
                                                        styles.deleteButton
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}


// ======================================================
// STYLES
// Navy + Soft Blue Theme
// ======================================================

const styles = {

    page: {

        minHeight: "100vh",

        background:
            "linear-gradient(135deg, #eef4fb 0%, #f7faff 50%, #e8f0f8 100%)",

        padding: "35px 20px",

        fontFamily:
            "'Segoe UI', Arial, sans-serif"

    },


    container: {

        maxWidth: "1150px",

        margin: "0 auto"

    },


    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "28px",

        gap: "20px",

        flexWrap: "wrap"

    },


    smallTitle: {

        fontSize: "12px",

        fontWeight: "700",

        letterSpacing: "2px",

        color: "#718096",

        marginBottom: "5px"

    },


    heading: {

        margin: 0,

        color: "#162a46",

        fontSize: "32px",

        fontWeight: "700"

    },


    subtitle: {

        margin: "7px 0 0",

        color: "#6b7c93",

        fontSize: "15px"

    },


    backButton: {

        backgroundColor: "#162a46",

        color: "#ffffff",

        border: "none",

        padding: "11px 20px",

        borderRadius: "7px",

        fontSize: "14px",

        fontWeight: "600",

        cursor: "pointer",

        boxShadow:
            "0 4px 10px rgba(22,42,70,0.15)"

    },


    formCard: {

        backgroundColor: "rgba(255,255,255,0.96)",

        borderRadius: "12px",

        padding: "28px",

        marginBottom: "28px",

        border:
            "1px solid rgba(203,213,225,0.8)",

        boxShadow:
            "0 8px 25px rgba(39,67,101,0.08)"

    },


    sectionHeader: {

        borderBottom:
            "1px solid #e2e8f0",

        paddingBottom: "18px",

        marginBottom: "24px"

    },


    sectionTitle: {

        margin: 0,

        color: "#203957",

        fontSize: "21px",

        fontWeight: "650"

    },


    sectionSubtitle: {

        margin: "5px 0 0",

        color: "#7a899d",

        fontSize: "14px"

    },


    formGrid: {

        display: "grid",

        gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",

        gap: "22px"

    },


    formGroup: {

        display: "flex",

        flexDirection: "column"

    },


    label: {

        fontSize: "14px",

        fontWeight: "600",

        color: "#344b67",

        marginBottom: "8px"

    },


    input: {

        width: "100%",

        boxSizing: "border-box",

        padding: "12px 13px",

        border:
            "1px solid #cbd5e1",

        borderRadius: "7px",

        fontSize: "15px",

        color: "#263b55",

        backgroundColor: "#fbfdff",

        outline: "none"

    },


    buttonRow: {

        display: "flex",

        gap: "10px",

        marginTop: "25px",

        flexWrap: "wrap"

    },


    addButton: {

        backgroundColor: "#294f78",

        color: "white",

        border: "none",

        padding: "11px 24px",

        borderRadius: "7px",

        fontSize: "14px",

        fontWeight: "600",

        cursor: "pointer"

    },


    updateButton: {

        backgroundColor: "#496f96",

        color: "white",

        border: "none",

        padding: "11px 24px",

        borderRadius: "7px",

        fontSize: "14px",

        fontWeight: "600",

        cursor: "pointer"

    },


    cancelButton: {

        backgroundColor: "#e8edf3",

        color: "#42566f",

        border: "1px solid #cbd5e1",

        padding: "11px 24px",

        borderRadius: "7px",

        fontSize: "14px",

        fontWeight: "600",

        cursor: "pointer"

    },


    tableCard: {

        backgroundColor: "rgba(255,255,255,0.97)",

        borderRadius: "12px",

        padding: "28px",

        border:
            "1px solid rgba(203,213,225,0.8)",

        boxShadow:
            "0 8px 25px rgba(39,67,101,0.08)"

    },


    listHeader: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "20px",

        gap: "15px"

    },


    countBox: {

        backgroundColor: "#e8f0f8",

        color: "#294f78",

        padding: "8px 14px",

        borderRadius: "7px",

        fontWeight: "700",

        fontSize: "15px"

    },


    countText: {

        fontWeight: "500",

        marginLeft: "5px",

        fontSize: "13px"

    },


    tableWrapper: {

        overflowX: "auto",

        border:
            "1px solid #dce4ed",

        borderRadius: "8px"

    },


    table: {

        width: "100%",

        borderCollapse: "collapse",

        minWidth: "650px"

    },


    th: {

        backgroundColor: "#203957",

        color: "#ffffff",

        padding: "14px 12px",

        fontSize: "13px",

        fontWeight: "600",

        textAlign: "center",

        borderBottom:
            "2px solid #385b80"

    },


    td: {

        padding: "14px 12px",

        textAlign: "center",

        color: "#43556b",

        fontSize: "14px",

        borderBottom:
            "1px solid #e5eaf0"

    },


    tableRow: {

        backgroundColor: "#ffffff"

    },


    editButton: {

        backgroundColor: "#5b7fa3",

        color: "#ffffff",

        border: "none",

        padding: "7px 15px",

        borderRadius: "5px",

        fontSize: "13px",

        fontWeight: "600",

        cursor: "pointer",

        marginRight: "7px"

    },


    deleteButton: {

        backgroundColor: "#b45c62",

        color: "#ffffff",

        border: "none",

        padding: "7px 15px",

        borderRadius: "5px",

        fontSize: "13px",

        fontWeight: "600",

        cursor: "pointer"

    },


    loading: {

        textAlign: "center",

        padding: "45px",

        color: "#64748b",

        fontSize: "15px"

    },


    noData: {

        textAlign: "center",

        padding: "45px 20px",

        color: "#718096"

    }

};

export default BatchManagement;