// import React, { useState, useContext } from "react";
// import { Container, Row, Col, Form, FormGroup, Button, Input, FormFeedback } from "reactstrap";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import '../styles/login.css';

// import loginImg from '../assets/images/login.jpg';
// import userIcon from '../assets/images/user.png';

// import { AuthContext } from "../context/AuthContext";
// import { BASE_URL } from "../utils/config";

// const Login = () => {
//     const [credentials, setCredentials] = useState({
//         email: "",
//         password: ""
//     });

//     const [showForgotPassword, setShowForgotPassword] = useState(false);
//     const [resetEmail, setResetEmail] = useState('');
//     const [resetMessage, setResetMessage] = useState('');
//     const [resetError, setResetError] = useState('');
//     const [isResetLoading, setIsResetLoading] = useState(false);

//     const [errors, setErrors] = useState({});
//     const { dispatch } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const successMessage = location.state?.successMessage;

//     const validate = () => {
//         let errs = {};
//         if (!credentials.email) errs.email = "Email is required.";
//         if (!credentials.password) errs.password = "Password is required.";
//         return errs;
//     };

//     const validateResetEmail = () => {
//         if (!resetEmail) return "Email is required.";
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(resetEmail)) return "Please enter a valid email.";
//         return "";
//     };

//     const handleChange = (e) => {
//         setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
//         setErrors(prev => ({ ...prev, [e.target.id]: "" }));
//     };

//     const handleClick = async (e) => {
//         e.preventDefault();
//         const validationErrors = validate();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         dispatch({ type: 'LOGIN_START' });

//         try {
//             const res = await fetch(`${BASE_URL}/auth/login`, {
//                 method: "POST",
//                 headers: { 'content-type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify(credentials),
//             });

//             const result = await res.json();

//             if (!res.ok) {
//                 let newErrors = {};
//                 if (result.message === "Incorrect password") {
//                     newErrors.password = "Password incorrect";
//                 } else if (result.message === "User not found") {
//                     newErrors.email = "Email not found";
//                 } else {
//                     newErrors.general = result.message;
//                 }

//                 setErrors(newErrors);
//                 dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
//                 return;
//             }

//             dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
//             localStorage.setItem('token', result.token);
//             localStorage.setItem('userId', result.data._id); 
//             localStorage.setItem('userRole', result.role);   
//             localStorage.setItem('user', JSON.stringify(result.data));

//             console.log("Login result:", result);

//             // Role-based redirection
//             const userRole = result.data.role;
//             if (userRole === "Admin") navigate("/admin-dashboard");
//             else if (userRole === "Guide") navigate("/Guide-dashboard");
//             else if (userRole === "Traveler") navigate("/home");
//             else navigate("/"); // fallback

//         } catch (err) {
//             dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
//             setErrors({ general: err.message });
//         }
//     };

//     const handleForgotPassword = async (e) => {
//         e.preventDefault();
//         setResetMessage('');
//         setResetError('');

//         const emailError = validateResetEmail();
//         if (emailError) {
//             setResetError(emailError);
//             return;
//         }

//         setIsResetLoading(true);

//         try {
//             const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email: resetEmail }),
//             });

//             const result = await res.json();

//             if (!res.ok) {
//                 setResetError(result.message || 'Something went wrong');
//             } else {
//                 setResetMessage('An OTP has been sent to your email. Please check your inbox (and spam/junk folder).');
//                 setTimeout(() => {
//                     navigate("/reset-password", { state: { email: resetEmail } });
//                 }, 2000);
//             }
//         } catch (err) {
//             setResetError('Error sending OTP. Please try again later.');
//         } finally {
//             setIsResetLoading(false);
//         }
//     };

//     return (
//         <section>
//             <Container>
//                 <Row>
//                     <Col lg="8" className="m-auto">
//                         <div className="login__container d-flex justify-content-between">
//                             <div className="login__img">
//                                 <img src={loginImg} alt="Login" />
//                             </div>
//                             <div className="login__form">
//                                 <div className="user">
//                                     <img src={userIcon} alt="User" />
//                                 </div>
//                                 <h2>Login</h2>
//                                 {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

//                                 <Form onSubmit={handleClick}>
//                                     <FormGroup>
//                                         <Input
//                                             type="email"
//                                             id="email"
//                                             placeholder="Email"
//                                             value={credentials.email}
//                                             onChange={handleChange}
//                                             invalid={!!errors.email}
//                                         />
//                                         {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
//                                     </FormGroup>
//                                     <FormGroup>
//                                         <Input
//                                             type="password"
//                                             id="password"
//                                             placeholder="Password"
//                                             value={credentials.password}
//                                             onChange={handleChange}
//                                             invalid={!!errors.password}
//                                         />
//                                         {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
//                                     </FormGroup>

//                                     <p
//                                         className="text-sm text-primary cursor-pointer mb-3"
//                                         style={{ textAlign: "left" }}
//                                         onClick={() => setShowForgotPassword(!showForgotPassword)}
//                                     >
//                                         Forgot Password?
//                                     </p>

//                                     {errors.general && <p style={{ color: 'red', textAlign: "center" }}>{errors.general}</p>}
//                                     <Button className="btn secondary__btn auth__btn" type="submit">
//                                         Login
//                                     </Button>
//                                 </Form>

//                                 {showForgotPassword && (
//                                     <Form onSubmit={handleForgotPassword} className="mt-3">
//                                         <div className="mb-3 p-3 rounded" style={{ backgroundColor: "#f9f9f9" }}>
//                                             <h6 className="mb-2">Reset Password</h6>
//                                             <FormGroup>
//                                                 <Input
//                                                     type="email"
//                                                     placeholder="Enter your email"
//                                                     value={resetEmail}
//                                                     onChange={(e) => setResetEmail(e.target.value)}
//                                                     invalid={!!resetError && !resetMessage}
//                                                 />
//                                                 {resetError && !resetMessage && <FormFeedback>{resetError}</FormFeedback>}
//                                             </FormGroup>
//                                             {resetMessage && <p className="text-success" style={{ fontSize: "0.9rem" }}>{resetMessage}</p>}
//                                             <Button
//                                                 type="submit"
//                                                 color="primary"
//                                                 size="sm"
//                                                 disabled={isResetLoading}
//                                             >
//                                                 {isResetLoading ? "Sending..." : "Send OTP"}
//                                             </Button>
//                                         </div>
//                                     </Form>
//                                 )}

//                                 <p>Don't have an account? <Link to='/register'>Create</Link></p>
//                             </div>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </section>
//     );
// };

// export default Login;

import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Input, FormFeedback } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../styles/login.css';

import loginImg from '../assets/images/login.jpg';
import userIcon from '../assets/images/user.png';

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const [isResetLoading, setIsResetLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  // Check stored token on mount and redirect if valid
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");

    if (token && storedRole) {
      // Validate token by making a quick API call (optional but recommended for security)
      const validateToken = async () => {
        try {
          const res = await fetch(`${BASE_URL}/auth/validate-token`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error("Invalid token");
          }

          // Redirect based on role
          if (storedRole === "Admin") {
            navigate("/admin-dashboard");
          } else if (storedRole === "Guide") {
            navigate("/Guide-dashboard");
          } else if (storedRole === "Traveler") {
            navigate("/home");
          } else {
            navigate("/"); // Fallback for unknown roles
          }
        } catch (err) {
          console.error("Token validation failed:", err);
          // Clear invalid session
          dispatch({ type: 'LOGOUT' });
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userRole');
          localStorage.removeItem('user');
          navigate("/login");
        }
      };

      validateToken();
    }
  }, [navigate, dispatch]);

  const validate = () => {
    let errs = {};
    if (!credentials.email) errs.email = "Email is required.";
    if (!credentials.password) errs.password = "Password is required.";
    return errs;
  };

  const validateResetEmail = () => {
    if (!resetEmail) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) return "Please enter a valid email.";
    return "";
  };

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.id]: "" }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        let newErrors = {};
        if (result.message === "Incorrect password") {
          newErrors.password = "Password incorrect";
        } else if (result.message === "User not found") {
          newErrors.email = "Email not found";
        } else {
          newErrors.general = result.message;
        }

        setErrors(newErrors);
        dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
        return;
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.data._id);
      localStorage.setItem('userRole', result.data.role);
      localStorage.setItem('user', JSON.stringify(result.data));

      console.log("Login result:", result);

      // Role-based redirection
      const userRole = result.data.role;
      if (userRole === "Admin") navigate("/admin-dashboard");
      else if (userRole === "Guide") navigate("/Guide-dashboard");
      else if (userRole === "Traveler") navigate("/home");
      else navigate("/"); // fallback
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
      setErrors({ general: err.message });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setResetError('');

    const emailError = validateResetEmail();
    if (emailError) {
      setResetError(emailError);
      return;
    }

    setIsResetLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const result = await res.json();

      if (!res.ok) {
        setResetError(result.message || 'Something went wrong');
      } else {
        setResetMessage('An OTP has been sent to your email. Please check your inbox (and spam/junk folder).');
        setTimeout(() => {
          navigate("/reset-password", { state: { email: resetEmail } });
        }, 2000);
      }
    } catch (err) {
      setResetError('Error sending OTP. Please try again later.');
    } finally {
      setIsResetLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="Login" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User" />
                </div>
                <h2>Login</h2>
                {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

                <Form onSubmit={handleClick}>
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

                  <p
                    className="text-sm text-primary cursor-pointer mb-3"
                    style={{ textAlign: "left" }}
                    onClick={() => setShowForgotPassword(!showForgotPassword)}
                  >
                    Forgot Password?
                  </p>

                  {errors.general && <p style={{ color: 'red', textAlign: "center" }}>{errors.general}</p>}
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>
                </Form>

                {showForgotPassword && (
                  <Form onSubmit={handleForgotPassword} className="mt-3">
                    <div className="mb-3 p-3 rounded" style={{ backgroundColor: "#f9f9f9" }}>
                      <h6 className="mb-2">Reset Password</h6>
                      <FormGroup>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          invalid={!!resetError && !resetMessage}
                        />
                        {resetError && !resetMessage && <FormFeedback>{resetError}</FormFeedback>}
                      </FormGroup>
                      {resetMessage && <p className="text-success" style={{ fontSize: "0.9rem" }}>{resetMessage}</p>}
                      <Button
                        type="submit"
                        color="primary"
                        size="sm"
                        disabled={isResetLoading}
                      >
                        {isResetLoading ? "Sending..." : "Send OTP"}
                      </Button>
                    </div>
                  </Form>
                )}

                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;