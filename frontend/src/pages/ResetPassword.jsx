import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Input, FormFeedback } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import "../styles/login.css";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      setErrors({ general: "Email not provided. Please start the reset process again." });
    }
  }, [location]);

  const validate = () => {
    let errs = {};
    if (!otp) errs.otp = "OTP is required.";
    if (!password) {
      errs.password = "Password is required.";
    } else {
      if (password.length < 8) errs.password = "Password must be at least 8 characters long.";
      if (!/[A-Z]/.test(password)) errs.password = "Password must contain at least one uppercase letter.";
      if (!/\d/.test(password)) errs.password = "Password must contain at least one number.";
    }
    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrors({ general: result.message });
        return;
      }

      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login", { state: { successMessage: "Password reset successful. Please login with your new password." } }), 2000);
    } catch (error) {
      setErrors({ general: "Error resetting password. Please try again." });
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-center">
              <div className="login__form">
                <h2>Reset Password</h2>
                {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      id="otp"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                        setErrors((prev) => ({ ...prev, otp: "" }));
                      }}
                      invalid={!!errors.otp}
                    />
                    {errors.otp && <FormFeedback>{errors.otp}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      id="password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }}
                      invalid={!!errors.password}
                    />
                    {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                      }}
                      invalid={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && <FormFeedback>{errors.confirmPassword}</FormFeedback>}
                  </FormGroup>
                  {errors.general && <p style={{ color: "red", textAlign: "center" }}>{errors.general}</p>}
                  <div className="button__container">
                    <Button className="btn auth__btn" type="submit">
                      Reset Password
                    </Button>
                    <Button className="btn cancel__btn" type="button" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ResetPassword;