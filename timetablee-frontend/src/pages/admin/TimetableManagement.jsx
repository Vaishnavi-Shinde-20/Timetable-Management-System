import React, {
    useCallback,
    useEffect,
    useState
} from "react";

import { useNavigate } from "react-router-dom";
import api from "../../services/ApiService";
import "bootstrap/dist/css/bootstrap.min.css";

function TimetableManagement() {

    const navigate = useNavigate();

    // =====================================================
    // MAIN DATA
    // =====================================================

    const [timetables, setTimetables] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [grades, setGrades] = useState([]);
    const [batches, setBatches] = useState([]);

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({
        day: "",
        startTime: "",
        endTime: "",
        roomNumber: "",
        teacherId: "",
        courseId: "",
        gradeId: "",
        batchId: ""
    });

    // =====================================================
    // EDITING
    // =====================================================

    const [editingId, setEditingId] = useState(null);

    // =====================================================
    // TEACHER TIMETABLE
    // =====================================================

    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedTeacherName, setSelectedTeacherName] = useState("");
    const [teacherTimetables, setTeacherTimetables] = useState([]);
    const [showTeacherTimetable, setShowTeacherTimetable] = useState(false);

    // =====================================================
    // LOAD TIMETABLES
    // =====================================================

    const loadTimetables = useCallback(async () => {

        try {

            const response = await api.get(
                "/api/timetables/all"
            );

            setTimetables(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.log(error);

            alert("Unable to load timetables.");

        }

    }, []);

    // =====================================================
    // LOAD TEACHERS
    // =====================================================

    const loadTeachers = useCallback(async () => {

        try {

            const response = await api.get(
                "/api/teachers/all"
            );

            setTeachers(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.log(
                "Unable to load teachers:",
                error
            );

        }

    }, []);

    // =====================================================
    // LOAD COURSES
    // =====================================================

    const loadCourses = useCallback(async () => {

        try {

            const response = await api.get(
                "/api/courses/all"
            );

            setCourses(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.log(
                "Unable to load courses:",
                error
            );

        }

    }, []);

    // =====================================================
    // LOAD GRADES
    // =====================================================

    const loadGrades = useCallback(async () => {

        try {

            const response = await api.get(
                "/api/grades/all"
            );

            setGrades(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.log(
                "Unable to load grades:",
                error
            );

        }

    }, []);

    // =====================================================
    // LOAD BATCHES
    // =====================================================

    const loadBatches = useCallback(async () => {

        try {

            const response = await api.get(
                "/api/batches/all"
            );

            setBatches(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.log(
                "Unable to load batches:",
                error
            );

        }

    }, []);

    // =====================================================
    // LOAD ALL DATA
    // =====================================================

    const loadAllData = useCallback(async () => {

        try {

            await Promise.all([
                loadTimetables(),
                loadTeachers(),
                loadCourses(),
                loadGrades(),
                loadBatches()
            ]);

        } catch (error) {

            console.log(error);

            alert("Unable to load timetable data.");

        }

    }, [
        loadTimetables,
        loadTeachers,
        loadCourses,
        loadGrades,
        loadBatches
    ]);

    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadAllData();

        const handleTeachersUpdated = () => {
            loadTeachers();
        };

        window.addEventListener(
            "teachersUpdated",
            handleTeachersUpdated
        );

        return () => {

            window.removeEventListener(
                "teachersUpdated",
                handleTeachersUpdated
            );

        };

    }, [
        loadAllData,
        loadTeachers
    ]);

    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };

    // =====================================================
    // ADD / UPDATE TIMETABLE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.day ||
            !formData.startTime ||
            !formData.endTime ||
            !formData.roomNumber ||
            !formData.teacherId ||
            !formData.courseId ||
            !formData.gradeId ||
            !formData.batchId
        ) {

            alert("Please fill all fields.");

            return;

        }

        if (formData.startTime >= formData.endTime) {

            alert(
                "End time must be after start time."
            );

            return;

        }

        try {

            const timetableData = {

                day: formData.day,

                startTime: formData.startTime,

                endTime: formData.endTime,

                roomNumber: formData.roomNumber,

                teacher: {
                    teacherId: Number(
                        formData.teacherId
                    )
                },

                course: {
                    courseId: Number(
                        formData.courseId
                    )
                },

                grade: {
                    gradeId: Number(
                        formData.gradeId
                    )
                },

                batch: {
                    batchId: Number(
                        formData.batchId
                    )
                }

            };

            if (editingId === null) {

                await api.post(
                    "/api/timetables/add",
                    timetableData
                );

                alert(
                    "Timetable added successfully."
                );

            } else {

                await api.put(
                    `/api/timetables/update/${editingId}`,
                    timetableData
                );

                alert(
                    "Timetable updated successfully."
                );

            }

            resetForm();

            await loadTimetables();

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(
                    "Backend response:",
                    error.response.data
                );

            }

            alert(
                "Unable to save timetable."
            );

        }

    };

    // =====================================================
    // EDIT TIMETABLE
    // =====================================================

    const handleEdit = (timetable) => {

        setEditingId(
            timetable.timetableId
        );

        setFormData({

            day: timetable.day || "",

            startTime: timetable.startTime || "",

            endTime: timetable.endTime || "",

            roomNumber: timetable.roomNumber || "",

            teacherId:
                timetable.teacher
                    ? timetable.teacher.teacherId
                    : "",

            courseId:
                timetable.course
                    ? timetable.course.courseId
                    : "",

            gradeId:
                timetable.grade
                    ? timetable.grade.gradeId
                    : "",

            batchId:
                timetable.batch
                    ? timetable.batch.batchId
                    : ""

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    // =====================================================
    // DELETE TIMETABLE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this timetable?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/api/timetables/delete/${id}`
            );

            alert(
                "Timetable deleted successfully."
            );

            await loadTimetables();

            if (
                showTeacherTimetable &&
                selectedTeacherId
            ) {

                await handleViewTeacherTimetable();

            }

        } catch (error) {

            console.log(error);

            alert(
                "Unable to delete timetable."
            );

        }

    };

    // =====================================================
    // RESET FORM
    // =====================================================

    const resetForm = () => {

        setEditingId(null);

        setFormData({

            day: "",
            startTime: "",
            endTime: "",
            roomNumber: "",
            teacherId: "",
            courseId: "",
            gradeId: "",
            batchId: ""

        });

    };

    // =====================================================
    // TEACHER SELECTION
    // =====================================================

    const handleTeacherSelection = (e) => {

        const teacherId = e.target.value;

        setSelectedTeacherId(teacherId);

        const selectedTeacher =
            teachers.find(
                (teacher) =>
                    Number(teacher.teacherId) ===
                    Number(teacherId)
            );

        if (selectedTeacher) {

            setSelectedTeacherName(
                selectedTeacher.teacherName
            );

        } else {

            setSelectedTeacherName("");

        }

        setTeacherTimetables([]);

        setShowTeacherTimetable(false);

    };

    // =====================================================
    // VIEW TEACHER TIMETABLE
    // =====================================================

    const handleViewTeacherTimetable = async () => {

        if (!selectedTeacherId) {

            alert(
                "Please select a teacher."
            );

            return;

        }

        try {

            const response = await api.get(
                `/api/timetables/teacher/${selectedTeacherId}`
            );

            setTeacherTimetables(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

            const selectedTeacher =
                teachers.find(
                    (teacher) =>
                        Number(teacher.teacherId) ===
                        Number(selectedTeacherId)
                );

            if (selectedTeacher) {

                setSelectedTeacherName(
                    selectedTeacher.teacherName
                );

            }

            setShowTeacherTimetable(true);

        } catch (error) {

            console.log(error);

            alert(
                "Unable to load teacher timetable."
            );

        }

    };

    // =====================================================
    // CLEAR TEACHER VIEW
    // =====================================================

    const clearTeacherTimetable = () => {

        setSelectedTeacherId("");

        setSelectedTeacherName("");

        setTeacherTimetables([]);

        setShowTeacherTimetable(false);

    };

    // =====================================================
    // REFRESH TEACHERS
    // =====================================================

    const refreshTeachers = async () => {

        await loadTeachers();

        alert(
            "Teacher list refreshed."
        );

    };

    // =====================================================
    // UI
    // =====================================================

    return (

        <div style={styles.page}>

            <div style={styles.mainContainer}>

                {/* ================================================= */}
                {/* TITLE CARD */}
                {/* ================================================= */}

                <div style={styles.titleCard}>

                    <div>

                        <div style={styles.titleSmall}>
                            ADMINISTRATION
                        </div>

                        <h1 style={styles.pageTitle}>
                            Timetable Management
                        </h1>

                        <p style={styles.subtitle}>
                            Create, update and manage class schedules
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        style={styles.dashboardButton}
                    >
                        ← Back to Dashboard
                    </button>

                </div>

                {/* ================================================= */}
                {/* ADD / EDIT FORM */}
                {/* ================================================= */}

                <div style={styles.card}>

                    <div style={styles.cardHeader}>

                        <div>

                            <h2 style={styles.cardTitle}>
                                {editingId === null
                                    ? "Add Timetable"
                                    : "Edit Timetable"}
                            </h2>

                            <p style={styles.cardSubtitle}>
                                Enter the schedule details below
                            </p>

                        </div>

                        {editingId !== null && (

                            <span style={styles.editBadge}>
                                Editing
                            </span>

                        )}

                    </div>

                    <div style={styles.cardBody}>

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                {/* DAY */}

                                <div className="col-md-6 mb-4">

                                    <label style={styles.label}>
                                        Day
                                    </label>

                                    <select
                                        className="form-select"
                                        name="day"
                                        value={formData.day}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    >

                                        <option value="">
                                            Select Day
                                        </option>

                                        <option value="MONDAY">
                                            Monday
                                        </option>

                                        <option value="TUESDAY">
                                            Tuesday
                                        </option>

                                        <option value="WEDNESDAY">
                                            Wednesday
                                        </option>

                                        <option value="THURSDAY">
                                            Thursday
                                        </option>

                                        <option value="FRIDAY">
                                            Friday
                                        </option>

                                        <option value="SATURDAY">
                                            Saturday
                                        </option>

                                    </select>

                                </div>

                                {/* ROOM */}

                                <div className="col-md-6 mb-4">

                                    <label style={styles.label}>
                                        Room Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="roomNumber"
                                        placeholder="Enter room number"
                                        value={formData.roomNumber}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    />

                                </div>

                                {/* START TIME */}

                                <div className="col-md-6 mb-4">

                                    <label style={styles.label}>
                                        Start Time
                                    </label>

                                    <input
                                        type="time"
                                        className="form-control"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    />

                                </div>

                                {/* END TIME */}

                                <div className="col-md-6 mb-4">

                                    <label style={styles.label}>
                                        End Time
                                    </label>

                                    <input
                                        type="time"
                                        className="form-control"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    />

                                </div>

                                {/* TEACHER */}

                                <div className="col-md-6 mb-4">

                                    <label style={styles.label}>
                                        Teacher
                                    </label>

                                    <select
                                        className="form-select"
                                        name="teacherId"
                                        value={formData.teacherId}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    >

                                        <option value="">
                                            Select Teacher
                                        </option>

                                        {teachers.map(
                                            (teacher) => (

                                                <option
                                                    key={
                                                        teacher.teacherId
                                                    }
                                                    value={
                                                        teacher.teacherId
                                                    }
                                                >

                                                    {
                                                        teacher.teacherName
                                                    }

                                                    {" - "}

                                                    {
                                                        teacher.email
                                                    }

                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                {/* COURSE */}

                                <div className="col-md-6 mb-4">

                                    <label style={styles.label}>
                                        Course
                                    </label>

                                    <select
                                        className="form-select"
                                        name="courseId"
                                        value={formData.courseId}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    >

                                        <option value="">
                                            Select Course
                                        </option>

                                        {courses.map(
                                            (course) => (

                                                <option
                                                    key={
                                                        course.courseId
                                                    }
                                                    value={
                                                        course.courseId
                                                    }
                                                >

                                                    {
                                                        course.courseName
                                                    }

                                                    {" - "}

                                                    {
                                                        course.courseCode
                                                    }

                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                {/* GRADE */}

                                <div className="col-md-6 mb-4">

                                    <label style={styles.label}>
                                        Grade
                                    </label>

                                    <select
                                        className="form-select"
                                        name="gradeId"
                                        value={formData.gradeId}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    >

                                        <option value="">
                                            Select Grade
                                        </option>

                                        {grades.map(
                                            (grade) => (

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

                                {/* BATCH */}

                                <div className="col-md-6 mb-4">

                                    <label style={styles.label}>
                                        Batch
                                    </label>

                                    <select
                                        className="form-select"
                                        name="batchId"
                                        value={formData.batchId}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                    >

                                        <option value="">
                                            Select Batch
                                        </option>

                                        {batches.map(
                                            (batch) => (

                                                <option
                                                    key={
                                                        batch.batchId
                                                    }
                                                    value={
                                                        batch.batchId
                                                    }
                                                >

                                                    {
                                                        batch.batchName
                                                    }

                                                    {batch.grade
                                                        ? ` - ${batch.grade.gradeName}`
                                                        : ""}

                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                            </div>

                            {/* FORM BUTTONS */}

                            <div style={styles.formActions}>

                                <button
                                    type="submit"
                                    style={styles.primaryButton}
                                >

                                    {editingId === null
                                        ? "＋ Add Timetable"
                                        : "✓ Update Timetable"}

                                </button>

                                {editingId !== null && (

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        style={styles.cancelButton}
                                    >
                                        Cancel
                                    </button>

                                )}

                            </div>

                        </form>

                    </div>

                </div>

                {/* ================================================= */}
                {/* VIEW TEACHER TIMETABLE */}
                {/* ================================================= */}

                <div style={styles.card}>

                    <div style={styles.cardHeader}>

                        <div>

                            <h2 style={styles.cardTitle}>
                                View Teacher Timetable
                            </h2>

                            <p style={styles.cardSubtitle}>
                                Select a teacher to view their schedule
                            </p>

                        </div>

                    </div>

                    <div style={styles.cardBody}>

                        <div className="row align-items-end">

                            <div className="col-md-7 mb-3 mb-md-0">

                                <label style={styles.label}>
                                    Select Teacher
                                </label>

                                <select
                                    className="form-select"
                                    value={selectedTeacherId}
                                    onChange={handleTeacherSelection}
                                    style={styles.input}
                                >

                                    <option value="">
                                        Select Teacher
                                    </option>

                                    {teachers.map(
                                        (teacher) => (

                                            <option
                                                key={
                                                    teacher.teacherId
                                                }
                                                value={
                                                    teacher.teacherId
                                                }
                                            >

                                                {
                                                    teacher.teacherName
                                                }

                                                {" - "}

                                                {
                                                    teacher.email
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-5">

                                <div style={styles.teacherActions}>

                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={
                                            handleViewTeacherTimetable
                                        }
                                        style={
                                            styles.primaryButtonSmall
                                        }
                                    >
                                        View Timetable
                                    </button>

                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={
                                            clearTeacherTimetable
                                        }
                                        style={
                                            styles.cancelButtonSmall
                                        }
                                    >
                                        Clear
                                    </button>

                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={
                                            refreshTeachers
                                        }
                                        style={
                                            styles.outlineButton
                                        }
                                    >
                                        Refresh
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* ================================================= */}
                {/* PARTICULAR TEACHER TIMETABLE */}
                {/* ================================================= */}

                {showTeacherTimetable && (

                    <div style={styles.card}>

                        <div style={styles.cardHeader}>

                            <div>

                                <h2 style={styles.cardTitle}>
                                    {selectedTeacherName}'s Timetable
                                </h2>

                                <p style={styles.cardSubtitle}>
                                    Schedule assigned to the selected teacher
                                </p>

                            </div>

                        </div>

                        <div style={styles.cardBody}>

                            {teacherTimetables.length > 0 ? (

                                <div className="table-responsive">

                                    <table
                                        className="table align-middle mb-0"
                                        style={styles.table}
                                    >

                                        <thead>

                                            <tr>

                                                <th style={styles.th}>
                                                    Day
                                                </th>

                                                <th style={styles.th}>
                                                    Start Time
                                                </th>

                                                <th style={styles.th}>
                                                    End Time
                                                </th>

                                                <th style={styles.th}>
                                                    Room
                                                </th>

                                                <th style={styles.th}>
                                                    Course
                                                </th>

                                                <th style={styles.th}>
                                                    Grade
                                                </th>

                                                <th style={styles.th}>
                                                    Batch
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {teacherTimetables.map(
                                                (timetable) => (

                                                    <tr
                                                        key={
                                                            timetable.timetableId
                                                        }
                                                    >

                                                        <td style={styles.td}>
                                                            {timetable.day}
                                                        </td>

                                                        <td style={styles.td}>
                                                            {timetable.startTime}
                                                        </td>

                                                        <td style={styles.td}>
                                                            {timetable.endTime}
                                                        </td>

                                                        <td style={styles.td}>
                                                            {timetable.roomNumber}
                                                        </td>

                                                        <td style={styles.td}>
                                                            {timetable.course
                                                                ? timetable.course.courseName
                                                                : "N/A"}
                                                        </td>

                                                        <td style={styles.td}>
                                                            {timetable.grade
                                                                ? timetable.grade.gradeName
                                                                : "N/A"}
                                                        </td>

                                                        <td style={styles.td}>
                                                            {timetable.batch
                                                                ? timetable.batch.batchName
                                                                : "N/A"}
                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            ) : (

                                <div style={styles.infoMessage}>

                                    No timetable found for{" "}

                                    <strong>
                                        {selectedTeacherName}
                                    </strong>
                                    .

                                </div>

                            )}

                        </div>

                    </div>

                )}

                {/* ================================================= */}
                {/* ALL TIMETABLES */}
                {/* ================================================= */}

                <div style={styles.card}>

                    <div style={styles.cardHeader}>

                        <div>

                            <h2 style={styles.cardTitle}>
                                All Timetables
                            </h2>

                            <p style={styles.cardSubtitle}>
                                Manage all scheduled classes
                            </p>

                        </div>

                    </div>

                    <div style={styles.cardBody}>

                        {timetables.length > 0 ? (

                            <div className="table-responsive">

                                <table
                                    className="table align-middle mb-0"
                                    style={styles.table}
                                >

                                    <thead>

                                        <tr>

                                            <th style={styles.th}>
                                                ID
                                            </th>

                                            <th style={styles.th}>
                                                Day
                                            </th>

                                            <th style={styles.th}>
                                                Start Time
                                            </th>

                                            <th style={styles.th}>
                                                End Time
                                            </th>

                                            <th style={styles.th}>
                                                Room
                                            </th>

                                            <th style={styles.th}>
                                                Teacher
                                            </th>

                                            <th style={styles.th}>
                                                Course
                                            </th>

                                            <th style={styles.th}>
                                                Grade
                                            </th>

                                            <th style={styles.th}>
                                                Batch
                                            </th>

                                            <th style={styles.th}>
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {timetables.map(
                                            (timetable) => (

                                                <tr
                                                    key={
                                                        timetable.timetableId
                                                    }
                                                >

                                                    <td style={styles.td}>
                                                        {
                                                            timetable.timetableId
                                                        }
                                                    </td>

                                                    <td style={styles.td}>
                                                        {
                                                            timetable.day
                                                        }
                                                    </td>

                                                    <td style={styles.td}>
                                                        {
                                                            timetable.startTime
                                                        }
                                                    </td>

                                                    <td style={styles.td}>
                                                        {
                                                            timetable.endTime
                                                        }
                                                    </td>

                                                    <td style={styles.td}>
                                                        {
                                                            timetable.roomNumber
                                                        }
                                                    </td>

                                                    <td style={styles.td}>
                                                        {timetable.teacher
                                                            ? timetable.teacher.teacherName
                                                            : "N/A"}
                                                    </td>

                                                    <td style={styles.td}>
                                                        {timetable.course
                                                            ? timetable.course.courseName
                                                            : "N/A"}
                                                    </td>

                                                    <td style={styles.td}>
                                                        {timetable.grade
                                                            ? timetable.grade.gradeName
                                                            : "N/A"}
                                                    </td>

                                                    <td style={styles.td}>
                                                        {timetable.batch
                                                            ? timetable.batch.batchName
                                                            : "N/A"}
                                                    </td>

                                                    <td style={styles.td}>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm me-2"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    timetable
                                                                )
                                                            }
                                                            style={
                                                                styles.editButton
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    timetable.timetableId
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

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        ) : (

                            <div style={styles.emptyMessage}>
                                No Timetable Found
                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}

// =====================================================
// PROFESSIONAL NAVY + SOFT BLUE STYLES
// =====================================================

const styles = {

    page: {
        minHeight: "100vh",
        background:
            "linear-gradient(135deg, #eef4fb 0%, #f7faff 50%, #e9f1fa 100%)",
        padding: "30px 20px 50px",
        fontFamily:
            "'Segoe UI', Arial, sans-serif"
    },

    mainContainer: {
        maxWidth: "1180px",
        margin: "0 auto"
    },

    titleCard: {
        width: "100%",
        minHeight: "125px",
        background:
            "linear-gradient(135deg, #102a43 0%, #173f67 55%, #286090 100%)",
        borderRadius: "16px",
        padding: "25px 32px",
        marginBottom: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
            "0 10px 30px rgba(16,42,67,0.18)",
        color: "white"
    },

    titleSmall: {
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "2px",
        opacity: "0.72",
        marginBottom: "5px"
    },

    pageTitle: {
        margin: 0,
        fontSize: "30px",
        fontWeight: "700",
        letterSpacing: "0.2px"
    },

    subtitle: {
        margin: "7px 0 0",
        fontSize: "14px",
        color: "#d8e8f7"
    },

    dashboardButton: {
        backgroundColor: "#eaf3fc",
        color: "#173f67",
        border: "none",
        padding: "11px 20px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "14px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        boxShadow:
            "0 4px 12px rgba(0,0,0,0.12)"
    },

    card: {
        backgroundColor: "rgba(255,255,255,0.96)",
        borderRadius: "14px",
        marginBottom: "25px",
        overflow: "hidden",
        border: "1px solid #dce7f2",
        boxShadow:
            "0 7px 22px rgba(32,66,99,0.09)"
    },

    cardHeader: {
        background:
            "linear-gradient(90deg, #f3f8fd 0%, #eaf3fc 100%)",
        borderBottom:
            "1px solid #d8e5f1",
        padding: "20px 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },

    cardTitle: {
        margin: 0,
        color: "#173f67",
        fontSize: "21px",
        fontWeight: "700"
    },

    cardSubtitle: {
        margin: "5px 0 0",
        color: "#718096",
        fontSize: "13px"
    },

    cardBody: {
        padding: "25px"
    },

    editBadge: {
        backgroundColor: "#dceeff",
        color: "#286090",
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700"
    },

    label: {
        display: "block",
        color: "#29445f",
        fontSize: "14px",
        fontWeight: "600",
        marginBottom: "8px"
    },

    input: {
        minHeight: "46px",
        border:
            "1px solid #cbd9e7",
        borderRadius: "8px",
        color: "#253b53",
        backgroundColor: "#fbfdff",
        boxShadow:
            "0 1px 3px rgba(24,54,84,0.03)"
    },

    formActions: {
        display: "flex",
        gap: "10px",
        marginTop: "5px"
    },

    primaryButton: {
        background:
            "linear-gradient(135deg, #286090, #3479ad)",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow:
            "0 5px 12px rgba(40,96,144,0.18)"
    },

    cancelButton: {
        backgroundColor: "#edf1f5",
        color: "#526273",
        border: "1px solid #d2dce5",
        padding: "12px 24px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer"
    },

    teacherActions: {
        display: "flex",
        flexWrap: "wrap",
        gap: "7px"
    },

    primaryButtonSmall: {
        backgroundColor: "#286090",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "7px",
        fontWeight: "600",
        fontSize: "13px"
    },

    cancelButtonSmall: {
        backgroundColor: "#edf1f5",
        color: "#526273",
        border: "1px solid #d2dce5",
        padding: "10px 15px",
        borderRadius: "7px",
        fontWeight: "600",
        fontSize: "13px"
    },

    outlineButton: {
        backgroundColor: "#eef6fd",
        color: "#286090",
        border: "1px solid #bcd5ea",
        padding: "10px 15px",
        borderRadius: "7px",
        fontWeight: "600",
        fontSize: "13px"
    },

    table: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: 0,
        textAlign: "center",
        minWidth: "1000px"
    },

    th: {
        background:
            "linear-gradient(90deg, #173f67, #286090)",
        color: "white",
        padding: "14px 12px",
        border: "none",
        fontSize: "13px",
        fontWeight: "600",
        whiteSpace: "nowrap"
    },

    td: {
        padding: "13px 12px",
        borderBottom:
            "1px solid #e4edf5",
        color: "#42566b",
        fontSize: "13px",
        backgroundColor: "#ffffff",
        whiteSpace: "nowrap"
    },

    editButton: {
        backgroundColor: "#e5f1fc",
        color: "#286090",
        border:
            "1px solid #b9d4ea",
        padding: "7px 13px",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "12px",
        cursor: "pointer"
    },

    deleteButton: {
        backgroundColor: "#fff0f0",
        color: "#c24141",
        border:
            "1px solid #f0caca",
        padding: "7px 13px",
        borderRadius: "6px",
        fontWeight: "600",
        fontSize: "12px",
        cursor: "pointer"
    },

    infoMessage: {
        backgroundColor: "#eef6fd",
        border:
            "1px solid #c9dfef",
        color: "#35627f",
        padding: "14px 18px",
        borderRadius: "8px",
        fontSize: "14px"
    },

    emptyMessage: {
        textAlign: "center",
        padding: "35px",
        color: "#7a8a9a",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        fontSize: "15px"
    }

};

export default TimetableManagement;