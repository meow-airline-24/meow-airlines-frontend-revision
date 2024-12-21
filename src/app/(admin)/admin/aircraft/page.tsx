"use client";

import Sidebar from "@/components/layout/Sidebar";

const AircraftPage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f1f5f9", // Light gray background
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Aircraft</h1>
        <p>This is the aircraft page content.</p>
      </main>
    </div>
  );
};

export default AircraftPage;
