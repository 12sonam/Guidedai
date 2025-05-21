// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "../pages/Home";
// import Tours from "../pages/Tours";
// import About from "../pages/About"
// import TourDetails from "../pages/TourDetails";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import SearchResultList from "../pages/SearchResultList";
// import ThankYou from "../pages/ThankYou";

// // Import Role-Based Pages
// import AdminDashboard from "../pages/Admin-dashboard";
// import GuideDashboard from "../pages/Guide-dashboard";
// import TravelerDashboard from "../pages/Home";
// import ProtectedRoute from "./ProtectRoute";  // To secure routes

// const Routers = () => {
//     return (
//         <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Navigate to="/home" />} />
//             <Route path="/home" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/tours" element={<Tours />} />
//             <Route path="/tours/:id" element={<TourDetails />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/thank-you" element={<ThankYou />} />
//             <Route path="/tours/search" element={<SearchResultList />} />

//             {/* Role-Based Routes (Protected) */}
//             <Route
//                 path="/Admin-dashboard"
//                 element={
//                     <ProtectedRoute role="Admin">
//                         <AdminDashboard />
//                     </ProtectedRoute>
//                 }
//             />
//             <Route
//                 path="/Guide-dashboard"
//                 element={
//                     <ProtectedRoute role="Guide">
//                         <GuideDashboard />
//                     </ProtectedRoute>
//                 }
//             />
//             <Route
//                 path="/Home"
//                 element={
//                     <ProtectedRoute role="Traveler">
//                         <TravelerDashboard />
//                     </ProtectedRoute>
//                 }
//             />
//         </Routes>
//     );
// };

// export default Routers;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Tours from "../pages/Tours";
import About from "../pages/About";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import ResetPassword from "../pages/ResetPassword";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import ItineraryForm from "../pages/ItineraryForm";
import PaymentSuccess from '../pages/PaymentSuccess';

// Admin components
import AdminDashboard from "../pages/Admin-dashboard";

// Other role components
import GuideDashboard from "../pages/Guide-dashboard";
import ProtectedRoute from "./ProtectRoute";
import Guides from '../pages/Guides';

import TravelerProfile from "../pages/TravelerProfile";
import UpdateItinerary from "../pages/UpdateItinerary";

const Routers = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/tours/search" element={<SearchResultList />} />
            <Route path="/itinerary-form" element={<ItineraryForm />} />
            <Route path="/payment/complete-khalti-payment" element={<PaymentSuccess />} />
            <Route path="/update-itinerary/:id" element={<UpdateItinerary />} />

            {/* Admin Routes */}
            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute role="Admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            >
            </Route>

            {/* Guide Route */}
            <Route path="/guides" element={<Guides />} />
            <Route
                path="/guide-dashboard"
                element={
                    <ProtectedRoute role="Guide">
                        <GuideDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Traveler Route */}
            <Route
                path="/traveler-dashboard"
                element={
                    <ProtectedRoute role="Traveler">
                        <Home />
                    </ProtectedRoute>
                }
            />

             {/* Traveler Profile Route */}
             <Route
                path="/TravelerProfile/:id"
                element={
                    <ProtectedRoute role="Traveler">
                        <TravelerProfile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default Routers;