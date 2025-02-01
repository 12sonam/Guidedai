import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";

// // Import Role-Based Pages
// import AdminDashboard from "../pages/AdminDashboard";
// import GuideDashboard from "../pages/GuideDashboard";
// import TravelerDashboard from "../pages/TravelerDashboard";
// import ProtectedRoute from "./ProtectedRoute";  // To secure routes

const Routers = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/tours/search" element={<SearchResultList />} />

            {/* Role-Based Routes (Protected) */}
            {/* <Route path="/admin-dashboard" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/guide-dashboard" element={<ProtectedRoute role="Guide"><GuideDashboard /></ProtectedRoute>} />
            <Route path="/traveler-dashboard" element={<ProtectedRoute role="Traveler"><TravelerDashboard /></ProtectedRoute>} /> */}
        </Routes>
    );
};

export default Routers;
