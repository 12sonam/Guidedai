// import React from "react";

// import Header from "../Header/Header";
// import Routers from "../../router/Routers";
// import Footer from "../Footer/Footer";

// const Layout = () => {
//     return (
//         <>
//             <Header />
//             <Routers />
//             <Footer />
//         </>
//     );
// };

// export default Layout;

import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to check the current route
import Header from "../Header/Header";
import Routers from "../../router/Routers";
import Footer from "../Footer/Footer";

const Layout = () => {
  const location = useLocation(); // Get the current route location

  // Check if the current route is the Login, Register, AdminDashboard, or GuideDashboard page
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isAdminDashboard = location.pathname === "/admin-dashboard";
  const isGuideDashboard = location.pathname === "/Guide-dashboard";
  const isResetPasswordPage = location.pathname === "/reset-password";

  const hideHeaderFooter = isLoginPage || isRegisterPage || isAdminDashboard || isGuideDashboard || isResetPasswordPage;

  return (
    <>
      {/* Conditionally render Header */}
      {!hideHeaderFooter && <Header />}

      {/* Always render Routers */}
      <Routers />

      {/* Conditionally render Footer */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;