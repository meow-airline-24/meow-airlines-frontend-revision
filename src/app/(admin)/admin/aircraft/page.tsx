"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { getAllAircrafts } from "@/utils/backend";
import { Aircraft } from "@/interfaces/Aircraft";
import AircraftFields from "@/components/layout/AircraftFields";

const AircraftPage = () => {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAircraft, setEditingAircraft] = useState<Aircraft | null>(null);
  const [type, setType] = useState<String>("edit");

  useEffect(() => {
    // Fetch aircrafts data from the backend
    const fetchAircrafts = async () => {
      try {
        const response = await getAllAircrafts();
        // console.log("Response:", response);
        const data: Aircraft[] = await response;
        setAircrafts(data);
      } catch (error) {
        console.error("Error fetching aircrafts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAircrafts();
  }, []);

  const handleCreateAircraft = (newAircraft: Aircraft) => {
    // Call API to create aircraft

    setAircrafts((prev) => [...prev, newAircraft]);
  };

  const handleEditAircraft = (updatedAircraft: Aircraft) => {
    if (!updatedAircraft || !updatedAircraft._id) {
      console.error("Invalid aircraft data", updatedAircraft);
      return; // Early exit if updatedAircraft is invalid
    }

    // Update aircraft in the state after successful edit in the database
    setAircrafts((prev) => {
      if (!prev || prev.length === 0) {
        console.error("Aircrafts data is empty or invalid", prev);
        return prev; // Early exit if prev is empty or invalid
      }

      return prev.map(
        (aircraft) =>
          aircraft._id === updatedAircraft._id
            ? updatedAircraft // Update the aircraft with the same aircraft_number
            : aircraft // Keep the other aircrafts unchanged
      );
    });

    setEditingAircraft(null); // Close editing mode after successful update
  };

  const handleEditButtonClick = (aircraft: Aircraft) => {
    setType("edit");
    setEditingAircraft(aircraft);
  };

  const handleCancelEdit = () => {
    setEditingAircraft(null); // Close editing mode
  };
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div style={{ display: "flex", height: "125vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#f1f5f9", // Light gray background
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Aircrafts</h1>

        {editingAircraft ? (
          <AircraftFields
            onSave={handleEditAircraft}
            onCancel={handleCancelEdit}
            initialAircraft={editingAircraft}
            type={type as "edit" | "create"}
          />
        ) : (
          <>
            <button
              onClick={() => {
                setEditingAircraft({} as Aircraft);
                setType("create");
              }} // Opens blank form for new aircraft
              style={{
                marginBottom: "20px",
                padding: "10px 15px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Create Aircraft
            </button>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#1e293b", color: "#fff" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Aircraft ID
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Aircraft Model
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Manufacture Year
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Status
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {aircrafts.map((aircraft) => (
                  <tr
                    key={aircraft._id}
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <td style={{ padding: "10px" }}>{aircraft._id}</td>

                    <td style={{ padding: "10px" }}>{aircraft.model}</td>

                    <td style={{ padding: "10px" }}>{aircraft.manufacture_year}</td>
                    <td style={{ padding: "10px" }}>{aircraft.status}</td>

                    <td style={{ padding: "10px" }}>
                      <button
                        onClick={() => handleEditButtonClick(aircraft)}
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "#fff",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                          borderRadius: "5px",
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default AircraftPage;
