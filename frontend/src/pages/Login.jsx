import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Label, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email:undefined,
        password:undefined,
        role: "Traveler", // Default role
    });

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleRoleChange = (e) => {
        setCredentials(prev => ({ ...prev, role: e.target.value }));
    };

    const handleClick = (e) => {
        e.preventDefault();
        
        // Simulating authentication (replace with actual backend authentication)
        if (credentials.email && credentials.password) {
            if (credentials.role === "Admin") {
                navigate("/admin-dashboard");
            } else if (credentials.role === "Guide") {
                navigate("/guide-dashboard");
            } else {
                navigate("/traveler-dashboard");
            }
        } else {
            alert("Please enter valid credentials!");
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

                                <Form onSubmit={handleClick}>
                                    <FormGroup>
                                        <input type="email" placeholder="Email" id="email" required onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="password" placeholder="Password" id="password" required onChange={handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="role">Select Role</Label>
                                        <Input type="select" id="role" value={credentials.role} onChange={handleRoleChange}>
                                            <option value="Traveler">Traveler</option>
                                            <option value="Guide">Guide</option>
                                            <option value="Admin">Admin</option>
                                        </Input>
                                    </FormGroup>
                                    <Button className="btn secondary__btn auth__btn" type="submit">
                                        Login
                                    </Button>
                                </Form>
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
