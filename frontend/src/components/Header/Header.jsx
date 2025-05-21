import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../utils/config";
import { AuthContext } from './../../context/AuthContext';

import logo from '../../assets/images/logo.png';
import "./header.css";
import defaultUser from '../../assets/images/user.png';

const nav__links = [
    {
        path: '/home',
        display: 'Home'
    },
    {
        path: '/about',
        display: 'About'
    },
    {
        path: '/tours',
        display: 'Tours'
    },
    {
        path: '/guides',
        display: 'Guides'
    },
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    useEffect(() => {
        const stickyHeaderFunc = () => {
            if (headerRef.current) {
                if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                    headerRef.current.classList.add('sticky__header');
                } else {
                    headerRef.current.classList.remove('sticky__header');
                }
            }
        };

        window.addEventListener('scroll', stickyHeaderFunc);

        return () => {
            window.removeEventListener('scroll', stickyHeaderFunc);
        };
    }, []);

    const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper d-flex align-items-center justify-content-between">
                        {/* Logo */}
                        <div className="logo">
                            <img src={logo} alt=""></img>
                        </div>

                        {/* Menu */}
                        <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                            <ul className="menu d-flex align-items-center gap-5">
                                {nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink
                                            to={item.path}
                                            className={navClass => navClass.isActive ? 'active__link' : ''}
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* User Actions */}
                        <div className="nav__right d-flex align-items-center gap-4">
                            <div className="nav__btns d-flex align-items-center gap-4">
                                {user ? (
                                    <div className="user-menu-wrapper">
                                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                            <DropdownToggle tag="div" className="user-dropdown-toggle">
                                                <img
                                                    src={user?.photo ? `${BASE_URL}/uploads/${user.photo}` : defaultUser}
                                                    alt="Profile"
                                                    className="rounded-circle user-avatar"
                                                />
                                            </DropdownToggle>
                                            <DropdownMenu className="user-dropdown-menu">
                                                <DropdownItem header className="dropdown-header">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={user?.photo ? `${BASE_URL}/uploads/${user.photo}` : defaultUser}
                                                            alt="Profile"
                                                            className="rounded-circle me-2"
                                                            style={{ width: "40px", height: "40px" }}
                                                        />
                                                        <div>
                                                            <h6 className="mb-0">{user.username}</h6>
                                                            <small>{user.email}</small>
                                                        </div>
                                                    </div>
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={() => navigate(`/TravelerProfile/${user._id}`)}>
                                                    My Profile
                                                </DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem onClick={logout} className="text-danger">
                                                    Logout
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                ) : (
                                    <>
                                        <Button className="btn secondary__btn">
                                            <Link to='/login'>Login</Link>
                                        </Button>
                                        <Button className="btn primary__btn">
                                            <Link to='/register'>Register</Link>
                                        </Button>
                                    </>
                                )}
                            </div>

                            <span className="mobile__menu" onClick={toggleMenu}>
                                <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;