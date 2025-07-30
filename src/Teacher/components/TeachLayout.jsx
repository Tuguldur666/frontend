import React from "react";
import TeachSidebar from "./TeachSidebar";
import { Outlet } from "react-router-dom";

const TeachLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <TeachSidebar />
      <main style={{ flex: 1, padding: '20px',  marginLeft: "250px"}}>
        <Outlet />
      </main>
    </div>
  );
};

export default TeachLayout;
