"use client";

import { useEffect, useState } from "react";
import TicketChart from "@/components/layout/TicketChart";
import { getTicketCount } from "@/utils/backend";

const AdminPage = () => {
  const [ticketData, setTicketData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ticket data once the component loads
    const fetchTicketData = async () => {
      try {
        const data = await getTicketCount();
        setTicketData(data);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: "250px",
          backgroundColor: "#1e293b", // Dark blue-gray
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Admin Panel</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {["Dashboard", "Tickets", "Users", "Settings"].map((item, index) => (
            <li key={index} style={{ marginBottom: "15px" }}>
              <a
                href={`/admin/${item.toLowerCase()}`}
                style={{
                  display: "block",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#475569"; // Lighter gray-blue on hover
                  e.currentTarget.style.color = "#f8fafc"; // Lighter text color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f1f5f9", // Light gray background
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Dashboard</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
          }}
        >
          <div style={{ width: "80%", maxWidth: "800px" }}>
            <TicketChart data={ticketData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
