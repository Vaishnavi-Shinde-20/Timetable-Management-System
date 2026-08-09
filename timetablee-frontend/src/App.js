import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherTimetable from "./pages/teacher/TeacherTimetable";
import StudentProfile from "./pages/student/StudentProfile";
import StudentTimetable from "./pages/student/StudentTimetable";
import TeacherManagement from "./pages/admin/TeacherManagement";
import StudentManagement from "./pages/admin/StudentManagement";
import GradeManagement from "./pages/admin/GradeManagement";
import BatchManagement from "./pages/admin/BatchManagement";
import CourseManagement from "./pages/admin/CourseManagement";
import TimetableManagement from "./pages/admin/TimetableManagement";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/teachers" element={<TeacherManagement />} />
        <Route path="/admin/students" element={<StudentManagement />} />
        <Route path="/admin/grades" element={<GradeManagement />} />
        <Route path="/admin/batches" element={<BatchManagement />} />
        <Route path="/admin/courses" element={<CourseManagement />} />
        <Route path="/admin/timetable" element={<TimetableManagement />} />

        {/* Teacher */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route
          path="/teacher/timetable"
          element={<TeacherTimetable />}
        />

        {/* Student */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route
          path="/student/profile"
          element={<StudentProfile />}
        />

        <Route
          path="/student/timetable"
          element={<StudentTimetable />}
        />

        {/* Invalid Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;