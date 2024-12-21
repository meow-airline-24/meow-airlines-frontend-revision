"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Flight } from "@/interfaces/Flight";
import { getAllFlights } from "@/utils/backend";
import { Aircraft } from "@/interfaces/Aircraft";
import FlightFields from "@/components/layout/FlightFields";

const FlightPage = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [type, setType] = useState<String>("edit");

  useEffect(() => {
    // Fetch flights data from the backend
    const fetchFlights = async () => {
      try {
        const response = await getAllFlights();
        // console.log("Response:", response);
        const data: Flight[] = await response;
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleCreateFlight = (newFlight: Flight) => {
    // Call API to create flight

    setFlights((prev) => [...prev, newFlight]);
  };

  const handleEditFlight = (updatedFlight: Flight) => {
    if (!updatedFlight || !updatedFlight.flight_number) {
      console.error("Invalid flight data", updatedFlight);
      return; // Early exit if updatedFlight is invalid
    }

    // Update flight in the state after successful edit in the database
    setFlights((prev) => {
      if (!prev || prev.length === 0) {
        console.error("Flights data is empty or invalid", prev);
        return prev; // Early exit if prev is empty or invalid
      }

      return prev.map(
        (flight) =>
          flight._id === updatedFlight._id
            ? updatedFlight // Update the flight with the same flight_number
            : flight // Keep the other flights unchanged
      );
    });

    setEditingFlight(null); // Close editing mode after successful update
  };

  const handleEditButtonClick = (flight: Flight) => {
    setType("edit");
    setEditingFlight(flight);
  };

  const handleCancelEdit = () => {
    setEditingFlight(null); // Close editing mode
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
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Flights</h1>

        {editingFlight ? (
          <FlightFields
            onSave={handleEditFlight}
            onCancel={handleCancelEdit}
            initialFlight={editingFlight}
            type={type as "edit" | "create"}
          />
        ) : (
          <>
            <button
              onClick={() => {
                setEditingFlight({} as Flight);
                setType("create");
              }} // Opens blank form for new flight
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
              Create Flight
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
                    Flight ID
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Flight Number
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Airline
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Departure
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Arrival
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Aircraft
                  </th>
                  <th style={{ padding: "10px", textAlign: "left" }}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {flights.map((flight) => (
                  <tr
                    key={flight.flight_number}
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <td style={{ padding: "10px" }}>{flight._id}</td>

                    <td style={{ padding: "10px" }}>{flight.flight_number}</td>

                    <td style={{ padding: "10px" }}>{flight.airline}</td>

                    <td style={{ padding: "10px" }}>
                      {flight.departure_airport} (
                      {new Date(flight.departure_time).toLocaleString()})
                    </td>

                    <td style={{ padding: "10px" }}>
                      {flight.arrival_airport} (
                      {new Date(flight.arrival_time).toLocaleString()})
                    </td>

                    <td style={{ padding: "10px" }}>
                      {flight.aircraft_id || "N/A"}
                    </td>

                    <td style={{ padding: "10px" }}>
                      <button
                        onClick={() => handleEditButtonClick(flight)}
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

export default FlightPage;
