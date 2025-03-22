import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Label, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {

    const [credentials, setCredentials] = useState({
        email:undefined,
        password:undefined,
        role: "Traveler", // Default role
    });

    const {dispatch} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleRoleChange = (e) => {
        setCredentials(prev => ({ ...prev, role: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        dispatch({type:'LOGIN_START'})

        try {
            const res = await fetch(`${BASE_URL}/auth/login`,{
                method: "post",
                headers: {
                    'content-type': 'application/json',
                },
                credentials:'include',
                body: JSON.stringify(credentials),
            });

            const result = await res.json();
            if(!res.ok) alert (result.message);

            console.log(result.data);

            dispatch({type:'LOGIN_SUCCESS', payload:result.data})

            // Redirect based on role
        if (result.role === "Admin") {
            navigate("/Admin-dashboard");
        } else if (result.role === "Guide") {
            navigate("/Guide-dashboard");
        } else {
            navigate("/home");
        }

        } catch (err) {
            dispatch({type:'LOGIN_FAILURE', payload:err.message})
        }
        
        // // Simulating authentication (replace with actual backend authentication)
        // if (credentials.email && credentials.password) {
        //     if (credentials.role === "Admin") {
        //         navigate("/Admin-dashboard");
        //     } else if (credentials.role === "Guide") {
        //         navigate("/Guide-dashboard");
        //     } else {
        //         navigate("/home");
        //     }
        // } else {
        //     alert("Please enter valid credentials!");
        // }
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
