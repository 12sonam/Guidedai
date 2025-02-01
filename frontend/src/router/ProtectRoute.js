import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage (or replace with context/auth)
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== role) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default ProtectedRoute;
