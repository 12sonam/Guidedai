// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, role }) => {
//     const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage (or replace with context/auth)
    
//     if (!user) {
//         return <Navigate to="/login" />;
//     }

//     if (user.role !== role) {
//         return <Navigate to="/home" />;
//     }

//     return children;
// };

// export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(AuthContext); // Get user from AuthContext

    // If the user is not logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If the user's role doesn't match the required role, redirect to home
    if (user.role !== role) {
        return <Navigate to="/home" />;
    }

    // If the user has the required role, render the children (protected component)
    return children;
};

export default ProtectedRoute;