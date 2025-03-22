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

    // Check if the current route is the Login, Register, or AdminDashboard page
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/Register";
    const isAdminDashboard = location.pathname === "/Admin-dashboard";

    return (
        <>
            {/* Conditionally render Header */}
            {!isLoginPage && !isRegisterPage && !isAdminDashboard && <Header />}

            {/* Always render Routers */}
            <Routers />

            {/* Conditionally render Footer */}
            {!isLoginPage && !isRegisterPage && !isAdminDashboard && <Footer />}
        </>
    );
};

export default Layout;