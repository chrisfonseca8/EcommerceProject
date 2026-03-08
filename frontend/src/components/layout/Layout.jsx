import { Outlet } from "react-router-dom";
import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar"

function Layout() {
  return (
<>
    <NavBar/>
    <Outlet/>
    <Footer/>
</>
  )
}

export default Layout