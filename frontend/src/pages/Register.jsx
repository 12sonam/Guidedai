import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Label, Input, FormFeedback, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';
import registerImg from '../assets/images/register.jpg';
import userIcon from '../assets/images/user.png';
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        role: "Traveler"
    });

    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1); // 1: Registration form, 2: OTP verification
    const [userId, setUserId] = useState(null);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("info");
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    // Validation for registration form
    const validate = () => {
        let errs = {};
        if (!credentials.username) errs.username = "Username is required.";
        if (!credentials.email) errs.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(credentials.email)) errs.email = "Email is invalid.";
        
        if (!credentials.password) {
            errs.password = "Password is required.";
        } else if (credentials.password.length < 6) {
            errs.password = "Password must be at least 6 characters.";
        } else if (!/(?=.*[A-Z])(?=.*\d)/.test(credentials.password)) {
            errs.password = "Password must contain at least one uppercase letter and one number.";
        }
        return errs;
    };

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.id]: "" })); // Clear error on change
    };

    const handleRoleChange = (e) => {
        setCredentials(prev => ({ ...prev, role: e.target.value }));
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    // Initial registration step
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setMessage("Sending registration request...");
            setMessageType("info");

            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const result = await res.json();
            
            if (!res.ok) {
                setMessage(result.message || "Registration failed. Please try again.");
                setMessageType("danger");
                return;
            }

            // Registration successful, proceed to OTP verification
            setUserId(result.userId);
            setStep(2);
            setMessage("OTP sent to your email. Please verify within 5 minutes.");
            setMessageType("success");
        } catch (err) {
            setMessage(err.message || "Something went wrong. Please try again.");
            setMessageType("danger");
        }
    };

    // OTP verification step
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        
        if (!otp || otp.length !== 6) {
            setMessage("Please enter a valid 6-digit OTP.");
            setMessageType("warning");
            return;
        }

        try {
            setMessage("Verifying OTP...");
            setMessageType("info");

            const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ userId, otp }),
            });

            const result = await res.json();
            
            if (!res.ok) {
                setMessage(result.message || "OTP verification failed. Please try again.");
                setMessageType("danger");
                return;
            }

            // OTP verification successful
            setMessage("Email verified successfully! Redirecting to login...");
            setMessageType("success");
            
            // Redirect to login after a short delay
            setTimeout(() => {
                dispatch({ type: 'REGISTER_SUCCESS' });
                navigate('/login', {
                    state: { successMessage: 'Registration completed successfully. Please log in.' }
                });
            }, 2000);
        } catch (err) {
            setMessage(err.message || "Something went wrong. Please try again.");
            setMessageType("danger");
        }
    };

    // Resend OTP
    const handleResendOtp = async () => {
        try {
            setMessage("Sending new OTP...");
            setMessageType("info");

            const res = await fetch(`${BASE_URL}/auth/resend-otp`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: credentials.email }),
            });

            const result = await res.json();
            
            if (!res.ok) {
                setMessage(result.message || "Failed to resend OTP. Please try again.");
                setMessageType("danger");
                return;
            }

            // Update userId if needed
            if (result.userId) {
                setUserId(result.userId);
            }
            
            setMessage("New OTP sent to your email. Please verify within 5 minutes.");
            setMessageType("success");
        } catch (err) {
            setMessage(err.message || "Something went wrong. Please try again.");
            setMessageType("danger");
        }
    };

    // Go back to registration form
    const handleGoBack = () => {
        setStep(1);
        setMessage(null);
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" className="m-auto">
                        <div className="login__container d-flex justify-content-between">
                            <div className="login__img">
                                <img src={registerImg} alt="Register" />
                            </div>
                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="User" />
                                </div>
                                <h2>{step === 1 ? "Register" : "Verify Email"}</h2>
                                
                                {message && (
                                    <Alert color={messageType} fade={false}>
                                        {message}
                                    </Alert>
                                )}
                                
                                {step === 1 ? (
                                    // Registration Form
                                    <Form onSubmit={handleRegisterSubmit}>
                                        <FormGroup>
                                            <Input 
                                                type="text" 
                                                id="username" 
                                                placeholder="Username" 
                                                value={credentials.username}
                                                onChange={handleChange} 
                                                invalid={!!errors.username} 
                                            />
                                            {errors.username && <FormFeedback>{errors.username}</FormFeedback>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                type="email" 
                                                id="email" 
                                                placeholder="Email" 
                                                value={credentials.email}
                                                onChange={handleChange} 
                                                invalid={!!errors.email} 
                                            />
                                            {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                type="password" 
                                                id="password" 
                                                placeholder="Password" 
                                                value={credentials.password}
                                                onChange={handleChange} 
                                                invalid={!!errors.password} 
                                            />
                                            {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="role">Select Role</Label>
                                            <Input 
                                                type="select" 
                                                id="role" 
                                                value={credentials.role} 
                                                onChange={handleRoleChange}
                                            >
                                                <option value="Traveler">Traveler</option>
                                                <option value="Guide">Guide</option>
                                            </Input>
                                        </FormGroup>
                                        <Button className="btn secondary__btn auth__btn" type="submit">
                                            Continue
                                        </Button>
                                    </Form>
                                ) : (
                                    // OTP Verification Form
                                    <Form onSubmit={handleOtpSubmit}>
                                        <FormGroup>
                                            <Label for="otp">Enter 6-digit OTP sent to your email</Label>
                                            <Input 
                                                type="text" 
                                                id="otp" 
                                                placeholder="Enter OTP" 
                                                value={otp}
                                                onChange={handleOtpChange} 
                                                maxLength="6"
                                            />
                                        </FormGroup>
                                        <Button className="btn secondary__btn auth__btn" type="submit">
                                            Verify OTP
                                        </Button>
                                        <div className="d-flex justify-content-between mt-3">
                                            <Button 
                                                type="button" 
                                                color="link" 
                                                onClick={handleGoBack}
                                            >
                                                Go Back
                                            </Button>
                                            <Button 
                                                type="button" 
                                                color="link" 
                                                onClick={handleResendOtp}
                                            >
                                                Resend OTP
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                                
                                <p>Already have an account? <Link to='/login'>Login</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Register;