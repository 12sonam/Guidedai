import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";

// Import Role-Based Pages
import AdminDashboard from "../pages/Admin-dashboard";
import GuideDashboard from "../pages/Guide-dashboard";
import TravelerDashboard from "../pages/Home";
import ProtectedRoute from "./ProtectRoute";  // To secure routes

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
            <Route
                path="/Admin-dashboard"
                element={
                    <ProtectedRoute role="Admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/Guide-dashboard"
                element={
                    <ProtectedRoute role="Guide">
                        <GuideDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/Home"
                element={
                    <ProtectedRoute role="Traveler">
                        <TravelerDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default Routers;
