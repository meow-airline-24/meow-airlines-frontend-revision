"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { flightSearch } from "@/utils/backend";
import { Flight } from "@/interfaces/Flight";

export default function FlightTab() {
  const [bookingData, setBookingData] = useState<{
    TicketType: string;
    SourcePort: { label: string; value: string };
    DestPort: { label: string; value: string };
    DepartDate: string;
    ReturnDate: string | null;
    PassengerCount: number;
  } | null>(null);

  useEffect(() => {
    // Load data from sessionStorage
    const data = {
      TicketType: sessionStorage.getItem("TicketType") || "",
      SourcePort: {
        label: sessionStorage.getItem("SourcePort.label") || "",
        value: sessionStorage.getItem("SourcePort.value") || "",
      },
      DestPort: {
        label: sessionStorage.getItem("DestPort.label") || "",
        value: sessionStorage.getItem("DestPort.value") || "",
      },
      DepartDate: sessionStorage.getItem("DepartDate") || "",
      ReturnDate: sessionStorage.getItem("ReturnDate"),
      PassengerCount: Number(sessionStorage.getItem("PassengerCount") || 0),
    };

    const flight = {
      departure_airport: data.SourcePort.value,
      arrival_airport: data.DestPort.value,
      departure_time: new Date(data.DepartDate),
    };
    const fetchFlights = async () => {
      try {
        const res = await flightSearch(flight, data.PassengerCount);
        for (const element of res) {
          const flight: Flight = element.flight
          console.log(flight);
          console.log(element.prices)
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();

    setBookingData(data);
  }, []);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <h1>Booking Details</h1>
      <ul>
        <li>
          <strong>Ticket Type:</strong> {bookingData.TicketType}
        </li>
        <li>
          <strong>Source Port:</strong> {bookingData.SourcePort.label} (
          {bookingData.SourcePort.value})
        </li>
        <li>
          <strong>Destination Port:</strong> {bookingData.DestPort.label} (
          {bookingData.DestPort.value})
        </li>
        <li>
          <strong>Departure Date:</strong> {bookingData.DepartDate}
        </li>
        {bookingData.TicketType === "round-trip" && bookingData.ReturnDate && (
          <li>
            <strong>Return Date:</strong> {bookingData.ReturnDate}
          </li>
        )}
        <li>
          <strong>Passenger Count:</strong> {bookingData.PassengerCount}
        </li>
      </ul>
    </Box>
  );
}
