// import React from "react";
// import { useLocation } from "react-router-dom"; // Import useLocation to check the current route
// import Header from "../Header/Header";
// import Routers from "../../router/Routers";
// import Footer from "../Footer/Footer";

// const Layout = () => {
//   const location = useLocation(); // Get the current route location

//   // Check if the current route is the Login, Register, AdminDashboard, or GuideDashboard page
//   const isLoginPage = location.pathname === "/login";
//   const isRegisterPage = location.pathname === "/register";
//   const isAdminDashboard = location.pathname === "/admin-dashboard";
//   const isGuideDashboard = location.pathname === "/Guide-dashboard";
//   const isResetPasswordPage = location.pathname === "/reset-password";

//   const hideHeaderFooter = isLoginPage || isRegisterPage || isAdminDashboard || isGuideDashboard || isResetPasswordPage;

//   return (
//     <>
//       {/* Conditionally render Header */}
//       {!hideHeaderFooter && <Header />}

//       {/* Always render Routers */}
//       <Routers />

//       {/* Conditionally render Footer */}
//       {!hideHeaderFooter && <Footer />}
//     </>
//   );
// };

// export default Layout;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Routers from "../../router/Routers";
import Footer from "../Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // Redirect based on role when the app loads
  useEffect(() => {
    if (token && userRole) {
      if (location.pathname === "/" || location.pathname === "/home") {
        if (userRole === "Admin") {
          navigate("/admin-dashboard");
        } else if (userRole === "Guide") {
          navigate("/Guide-dashboard");
        } else if (userRole !== "Traveler") {
          navigate("/"); // Fallback for unknown roles
        }
      }
    } else if (!token && !["/login", "/register", "/reset-password"].includes(location.pathname)) {
      navigate("/login");
    }
  }, [token, userRole, location.pathname, navigate]);

  // Check if the current route is the Login, Register, AdminDashboard, or GuideDashboard page
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isAdminDashboard = location.pathname === "/admin-dashboard";
  const isGuideDashboard = location.pathname === "/Guide-dashboard";
  const isResetPasswordPage = location.pathname === "/reset-password";

  // Hide Header and Footer for specific routes or non-traveler roles
  const hideHeaderFooter =
    isLoginPage ||
    isRegisterPage ||
    isAdminDashboard ||
    isGuideDashboard ||
    isResetPasswordPage ||
    (userRole && userRole !== "Traveler");

  return (
    <>
      {/* Conditionally render Header only for travelers */}
      {!hideHeaderFooter && <Header />}

      {/* Always render Routers */}
      <Routers />

      {/* Conditionally render Footer */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;