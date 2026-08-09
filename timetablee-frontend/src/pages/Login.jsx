import React, { useState } from "react";
import api from "../services/ApiService";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // ============================================
    // LOGIN
    // ============================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setErrorMessage("");

        if (!email.trim()) {
            setErrorMessage("Please enter your email address.");
            return;
        }

        if (!password.trim()) {
            setErrorMessage("Please enter your password.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/api/auth/login",
                {
                    email: email.trim(),
                    password: password
                }
            );

            // =====================================
            // SAVE LOGIN INFORMATION
            // =====================================

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "id",
                response.data.id
            );


            // =====================================
            // REDIRECT ACCORDING TO ROLE
            // =====================================

            if (response.data.role === "ROLE_ADMIN") {

                navigate("/admin/dashboard");

            }
            else if (
                response.data.role === "ROLE_TEACHER"
            ) {

                navigate("/teacher/dashboard");

            }
            else if (
                response.data.role === "ROLE_STUDENT"
            ) {

                navigate("/student/dashboard");

            }
            else {

                setErrorMessage(
                    "Invalid user role. Please contact the administrator."
                );

            }

        }
        catch (error) {

            console.error("Login Error:", error);

            if (error.response) {

                console.error(
                    "Backend Response:",
                    error.response.data
                );

            }

            setErrorMessage(
                "Invalid email or password. Please try again."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">

            {/* =========================================
                LEFT SIDE - BRANDING
            ========================================= */}

            <div className="login-left">

                <div className="left-overlay"></div>

                <div className="left-content">

                    <div className="brand-icon">
                        TM
                    </div>

                    <h1>
                        Timetable
                        <br />
                        Management System
                    </h1>

                    <p>
                        Manage academic schedules,
                        teachers, courses and students
                        from one centralized platform.
                    </p>


                    {/* FEATURES */}

                    <div className="feature-list">

                        <div className="feature-item">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Centralized Management
                                </strong>

                                <span>
                                    Manage your academic
                                    information efficiently.
                                </span>
                            </div>

                        </div>


                        <div className="feature-item">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Smart Scheduling
                                </strong>

                                <span>
                                    Organize classes and
                                    timetables easily.
                                </span>
                            </div>

                        </div>


                        <div className="feature-item">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Role-Based Access
                                </strong>

                                <span>
                                    Dedicated access for
                                    administrators, teachers
                                    and students.
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================================
                RIGHT SIDE - LOGIN
            ========================================= */}

            <div className="login-right">

                <div className="login-box">

                    {/* LOGO */}

                    <div className="mobile-logo">
                        TM
                    </div>


                    {/* HEADING */}

                    <div className="login-heading">

                        <h2>
                            Welcome back
                        </h2>

                        <p>
                            Sign in to access your account
                        </p>

                    </div>


                    {/* ERROR */}

                    {errorMessage && (

                        <div className="error-box">

                            <span className="error-icon">
                                !
                            </span>

                            <span>
                                {errorMessage}
                            </span>

                        </div>

                    )}


                    {/* FORM */}

                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    @
                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    autoComplete="email"
                                    disabled={loading}
                                    required
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <div className="password-label">

                                <label htmlFor="password">
                                    Password
                                </label>

                            </div>


                            <div className="input-wrapper">

                                <span className="input-icon">
                                    •
                                </span>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMessage("");
                                    }}
                                    autoComplete="current-password"
                                    disabled={loading}
                                    required
                                />


                                <button
                                    type="button"
                                    className="password-button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    disabled={loading}
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >

                                    {showPassword
                                        ? "Hide"
                                        : "Show"}

                                </button>

                            </div>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >

                            {loading ? (

                                <>

                                    <span className="spinner"></span>

                                    Signing in...

                                </>

                            ) : (

                                <>
                                    Sign In
                                    <span className="arrow">
                                        →
                                    </span>
                                </>

                            )}

                        </button>

                    </form>


                    {/* SECURITY TEXT */}

                    <div className="security-info">

                        <span className="lock-icon">
                            🔒
                        </span>

                        <span>
                            Your login information is securely
                            protected.
                        </span>

                    </div>


                    {/* FOOTER */}

                    <div className="login-footer">

                        <p>
                            Timetable Management System
                        </p>

                        <span>
                            Academic Administration Platform
                        </span>

                    </div>

                </div>

            </div>


            {/* =========================================
                STYLES
            ========================================= */}

            <style>{`

                * {
                    box-sizing: border-box;
                }

                .login-page {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    font-family:
                        "Inter",
                        "Segoe UI",
                        Arial,
                        sans-serif;
                    background: #f5f7fb;
                }


                /* =====================================
                   LEFT SECTION
                ===================================== */

                .login-left {
                    width: 55%;
                    min-height: 100vh;

                    position: relative;

                    display: flex;
                    align-items: center;

                    overflow: hidden;

                    background-image:
                        url("https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85");

                    background-size: cover;
                    background-position: center;
                }


                .left-overlay {
                    position: absolute;

                    inset: 0;

                    background:
                        linear-gradient(
                            135deg,
                            rgba(10, 42, 92, 0.96),
                            rgba(13, 80, 150, 0.88)
                        );
                }


                .left-content {
                    position: relative;

                    z-index: 2;

                    max-width: 600px;

                    padding: 70px;

                    color: white;
                }


                .brand-icon,
                .mobile-logo {
                    width: 58px;
                    height: 58px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    background: white;

                    color: #1457a6;

                    border-radius: 12px;

                    font-size: 20px;
                    font-weight: 800;

                    letter-spacing: 1px;

                    margin-bottom: 30px;

                    box-shadow:
                        0 8px 25px
                        rgba(0, 0, 0, 0.18);
                }


                .left-content h1 {
                    font-size: 46px;

                    line-height: 1.15;

                    font-weight: 700;

                    margin: 0 0 22px;

                    letter-spacing: -1px;
                }


                .left-content > p {
                    font-size: 18px;

                    line-height: 1.7;

                    max-width: 520px;

                    margin-bottom: 40px;

                    color:
                        rgba(255, 255, 255, 0.82);
                }


                /* =====================================
                   FEATURES
                ===================================== */

                .feature-list {
                    display: flex;

                    flex-direction: column;

                    gap: 22px;
                }


                .feature-item {
                    display: flex;

                    align-items: flex-start;

                    gap: 15px;
                }


                .feature-icon {
                    width: 28px;
                    height: 28px;

                    min-width: 28px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background:
                        rgba(255,255,255,0.16);

                    border:
                        1px solid
                        rgba(255,255,255,0.25);

                    font-size: 13px;
                    font-weight: bold;
                }


                .feature-item strong {
                    display: block;

                    font-size: 15px;

                    margin-bottom: 4px;
                }


                .feature-item span {
                    display: block;

                    font-size: 13px;

                    color:
                        rgba(255,255,255,0.68);
                }


                /* =====================================
                   RIGHT SECTION
                ===================================== */

                .login-right {
                    width: 45%;
                    min-height: 100vh;

                    display: flex;

                    justify-content: center;
                    align-items: center;

                    padding: 40px;

                    background: #ffffff;
                }


                .login-box {
                    width: 100%;
                    max-width: 440px;
                }


                .mobile-logo {
                    display: none;
                }


                /* =====================================
                   HEADING
                ===================================== */

                .login-heading {
                    margin-bottom: 30px;
                }


                .login-heading h2 {
                    margin: 0 0 9px;

                    font-size: 32px;

                    color: #172033;

                    font-weight: 700;

                    letter-spacing: -0.5px;
                }


                .login-heading p {
                    margin: 0;

                    color: #70798a;

                    font-size: 15px;
                }


                /* =====================================
                   ERROR
                ===================================== */

                .error-box {
                    display: flex;

                    align-items: center;

                    gap: 10px;

                    padding: 12px 14px;

                    margin-bottom: 20px;

                    border-radius: 8px;

                    background: #fff2f2;

                    border:
                        1px solid #ffd5d5;

                    color: #c62828;

                    font-size: 14px;
                }


                .error-icon {
                    width: 20px;
                    height: 20px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border-radius: 50%;

                    background: #d32f2f;

                    color: white;

                    font-size: 12px;

                    font-weight: bold;
                }


                /* =====================================
                   FORM
                ===================================== */

                .form-group {
                    margin-bottom: 22px;
                }


                .form-group label {
                    display: block;

                    margin-bottom: 8px;

                    font-size: 14px;

                    font-weight: 600;

                    color: #263247;
                }


                .input-wrapper {
                    position: relative;

                    display: flex;

                    align-items: center;
                }


                .input-icon {
                    position: absolute;

                    left: 15px;

                    color: #8792a5;

                    font-size: 17px;

                    z-index: 1;
                }


                .input-wrapper input {
                    width: 100%;

                    height: 52px;

                    padding:
                        0 15px 0 43px;

                    border:
                        1px solid #d9dee8;

                    border-radius: 8px;

                    outline: none;

                    background: #ffffff;

                    color: #202938;

                    font-size: 15px;

                    transition: all 0.2s ease;
                }


                .input-wrapper input::placeholder {
                    color: #a4adba;
                }


                .input-wrapper input:focus {
                    border-color: #1769c2;

                    box-shadow:
                        0 0 0 3px
                        rgba(23,105,194,0.10);
                }


                .input-wrapper input:disabled {
                    background: #f4f6f9;

                    cursor: not-allowed;
                }


                /* =====================================
                   PASSWORD
                ===================================== */

                .password-label {
                    display: flex;

                    justify-content: space-between;

                    align-items: center;
                }


                .password-button {
                    position: absolute;

                    right: 12px;

                    border: none;

                    background: transparent;

                    color: #1769c2;

                    font-size: 13px;

                    font-weight: 600;

                    cursor: pointer;

                    padding: 5px;
                }


                .password-button:hover {
                    color: #0b4d91;
                }


                /* =====================================
                   LOGIN BUTTON
                ===================================== */

                .login-button {
                    width: 100%;

                    height: 52px;

                    margin-top: 8px;

                    border: none;

                    border-radius: 8px;

                    background:
                        linear-gradient(
                            135deg,
                            #1769c2,
                            #0e56a3
                        );

                    color: white;

                    font-size: 15px;

                    font-weight: 600;

                    cursor: pointer;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    gap: 10px;

                    box-shadow:
                        0 5px 15px
                        rgba(23,105,194,0.20);

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }


                .login-button:hover:not(:disabled) {
                    transform: translateY(-1px);

                    box-shadow:
                        0 8px 20px
                        rgba(23,105,194,0.28);
                }


                .login-button:disabled {
                    opacity: 0.7;

                    cursor: not-allowed;
                }


                .arrow {
                    font-size: 19px;
                }


                /* =====================================
                   SPINNER
                ===================================== */

                .spinner {
                    width: 17px;
                    height: 17px;

                    border:
                        2px solid
                        rgba(255,255,255,0.4);

                    border-top-color: white;

                    border-radius: 50%;

                    animation:
                        spin 0.8s linear infinite;
                }


                @keyframes spin {

                    to {
                        transform: rotate(360deg);
                    }

                }


                /* =====================================
                   SECURITY
                ===================================== */

                .security-info {
                    display: flex;

                    justify-content: center;
                    align-items: center;

                    gap: 7px;

                    margin-top: 24px;

                    color: #8993a3;

                    font-size: 12px;

                    text-align: center;
                }


                .lock-icon {
                    font-size: 11px;
                }


                /* =====================================
                   FOOTER
                ===================================== */

                .login-footer {
                    text-align: center;

                    margin-top: 45px;

                    padding-top: 20px;

                    border-top:
                        1px solid #edf0f4;
                }


                .login-footer p {
                    margin: 0 0 5px;

                    color: #687386;

                    font-size: 12px;

                    font-weight: 600;
                }


                .login-footer span {
                    color: #a1a9b5;

                    font-size: 11px;
                }


                /* =====================================
                   TABLET
                ===================================== */

                @media (max-width: 900px) {

                    .login-left {
                        width: 45%;
                    }

                    .login-right {
                        width: 55%;
                    }

                    .left-content {
                        padding: 40px;
                    }

                    .left-content h1 {
                        font-size: 36px;
                    }

                    .left-content > p {
                        font-size: 16px;
                    }

                }


                /* =====================================
                   MOBILE
                ===================================== */

                @media (max-width: 700px) {

                    .login-page {
                        min-height: 100vh;
                    }


                    .login-left {
                        display: none;
                    }


                    .login-right {
                        width: 100%;

                        min-height: 100vh;

                        padding:
                            25px 20px;

                        background:
                            linear-gradient(
                                135deg,
                                #f5f8fc,
                                #ffffff
                            );
                    }


                    .login-box {
                        max-width: 430px;
                    }


                    .mobile-logo {
                        display: flex;

                        margin:
                            0 auto 25px;
                    }


                    .login-heading {
                        text-align: center;
                    }


                    .login-heading h2 {
                        font-size: 28px;
                    }


                    .login-footer {
                        margin-top: 35px;
                    }

                }

            `}</style>

        </div>

    );
}

export default Login;