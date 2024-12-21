"use client";

import { useEffect, useState } from "react";
import TicketChart from "@/components/layout/TicketChart";
import { getTicketCount } from "@/utils/backend";
import Sidebar from "@/components/layout/Sidebar";

const AdminPage = () => {
  const [ticketData, setTicketData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <Sidebar />
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
