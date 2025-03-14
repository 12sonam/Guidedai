import React, { useState, useContext} from "react";
import { Container, Row, Col, Form, FormGroup, Button, Label, Input } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css';

import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Register = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined,
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

        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const result = await res.json()

            if(!res.ok) alert(result.meassage)

            dispatch({type:'REGISTER_SUCCESS'})
            navigate('/login')
            
        } catch (err) {
            alert(err.message);
        }
        
        // Simulating authentication (replace with actual backend authentication)
        if (credentials.email && credentials.password) {
            if (credentials.role === "Admin") {
                navigate("/Admin-dashboard");
            } else if (credentials.role === "Guide") {
                navigate("/Guide-dashboard");
            } else {
                navigate("/home");
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
                                <img src={registerImg} alt="Login" />
                            </div>
                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="User" />
                                </div>
                                <h2>Login</h2>

                                <Form onSubmit={handleClick}>
                                <FormGroup>
                                        <input type="username" placeholder="Username" id="username" required onChange={handleChange} />
                                    </FormGroup>
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
                                    <Button className="btn secondary__btn auth__btn" type="submit" onClick={() => window.location.href = "/login"}>
                                        Create Account
                                    </Button>
                                </Form>
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
