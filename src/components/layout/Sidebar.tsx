"use client";

import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <nav
      style={{
        width: "250px",
        backgroundColor: "#1e293b", // Dark blue-gray
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Admin Panel</h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {[
          { label: "Dashboard", path: "/admin" },
          { label: "Flight", path: "/admin/flight" },
          { label: "Aircraft", path: "/admin/aircraft" },
          { label: "Create Post", path: "/admin/post" },
        ].map(({ label, path }, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            <button
              onClick={() => handleNavigation(path)}
              style={{
                display: "block",
                width: "100%",
                backgroundColor: currentPath === path ? "#475569" : "transparent",
                color: currentPath === path ? "#f8fafc" : "#fff",
                textDecoration: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                border: "none",
                textAlign: "left",
                transition: "background-color 0.3s, color 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#475569"; // Lighter gray-blue on hover
                e.currentTarget.style.color = "#f8fafc"; // Lighter text color
              }}
              onMouseLeave={(e) => {
                if (currentPath !== path) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#fff";
                }
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
