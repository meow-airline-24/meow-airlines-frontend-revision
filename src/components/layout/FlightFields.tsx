"use client";

import { useState, useEffect } from "react";
import { Flight } from "@/interfaces/Flight";
import { Aircraft } from "@/interfaces/Aircraft";
import { Button, Input, Stack, Box } from "@chakra-ui/react";
import axios from "axios";
import { createFlight, editFlight } from "@/utils/backend";

type FlightFieldsProps = {
  onSave: (flight: Flight) => void;
  onCancel: () => void;
  initialFlight?: Flight;
  type?: "create" | "edit";
};

const FlightFields = ({
  onSave,
  onCancel,
  initialFlight,
  type
}: FlightFieldsProps) => {
  const [flight, setFlight] = useState<Flight>({
    _id: "",
    flight_number: "",
    airline: "",
    departure_airport: "",
    arrival_airport: "",
    departure_time: new Date(),
    arrival_time: new Date(),
    book_exp: new Date(),
    aircraft_id: "",
  });

  useEffect(() => {
    if (initialFlight) {
      setFlight({
        ...initialFlight,
        departure_time: initialFlight.departure_time
          ? new Date(initialFlight.departure_time)
          : new Date(),
        arrival_time: initialFlight.arrival_time
          ? new Date(initialFlight.arrival_time)
          : new Date(),
        book_exp: initialFlight.book_exp
          ? new Date(initialFlight.book_exp)
          : new Date(),
      });
    }
  }, [initialFlight]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFlight((prev) => ({
      ...prev,
      [name]: name === "aircraft_id" ? value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        console.log("Ini: " + initialFlight);
      if (type === "edit" && initialFlight) {
        // Editing an existing flight (Update)
        const updatedFlight = await editFlight(flight);
        // console.log("Updated flight:", updatedFlight);
        onSave(updatedFlight);
      } else {
        // Creating a new flight
        // console.log("Creating flight:", flight);
        const createdFlight = await createFlight(flight);
        onSave(createdFlight);
        alert("Flight created successfully, please refresh the page to see the changes");
      }
    } catch (error) {
      console.error("Error saving flight:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const formatDate = (date: Date | string) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toISOString().slice(0, 16);
    }
    return "";
  };

  return (
    <Box p={6} boxShadow="lg" borderRadius="md" bg="white" maxW="md" mx="auto">
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          {/* Flight Number */}
          <div>
            <label htmlFor="flight_number">Flight Number</label>
            <Input
              id="flight_number"
              name="flight_number"
              value={flight.flight_number || ""}
              onChange={handleChange}
              placeholder="Enter flight number"
              required
            />
          </div>

          {/* Airline */}
          <div>
            <label htmlFor="airline">Airline</label>
            <Input
              id="airline"
              name="airline"
              value={flight.airline || ""}
              onChange={handleChange}
              placeholder="Enter airline name"
              required
            />
          </div>

          {/* Departure Airport */}
          <div>
            <label htmlFor="departure_airport">Departure Airport</label>
            <Input
              id="departure_airport"
              name="departure_airport"
              value={flight.departure_airport || ""}
              onChange={handleChange}
              placeholder="Enter departure airport"
              required
            />
          </div>

          {/* Arrival Airport */}
          <div>
            <label htmlFor="arrival_airport">Arrival Airport</label>
            <Input
              id="arrival_airport"
              name="arrival_airport"
              value={flight.arrival_airport || ""}
              onChange={handleChange}
              placeholder="Enter arrival airport"
              required
            />
          </div>

          {/* Departure Time */}
          <div>
            <label htmlFor="departure_time">Departure Time</label>
            <Input
              id="departure_time"
              name="departure_time"
              type="datetime-local"
              value={formatDate(flight.departure_time)}
              onChange={handleChange}
              required
            />
          </div>

          {/* Arrival Time */}
          <div>
            <label htmlFor="arrival_time">Arrival Time</label>
            <Input
              id="arrival_time"
              name="arrival_time"
              type="datetime-local"
              value={formatDate(flight.arrival_time)}
              onChange={handleChange}
              required
            />
          </div>

          {/* Book Expiration */}
          <div>
            <label htmlFor="book_exp">Book Expiration</label>
            <Input
              id="book_exp"
              name="book_exp"
              type="datetime-local"
              value={formatDate(flight.book_exp)}
              onChange={handleChange}
              required
            />
          </div>

          {/* Aircraft ID */}
          <div>
            <label htmlFor="aircraft_id">Aircraft</label>
            <Input
              id="aircraft_id"
              name="aircraft_id"
              value={flight.aircraft_id || ""}
              onChange={handleChange}
              placeholder="Enter aircraft ID"
              required
            />
          </div>

          {/* Action Buttons */}
          <Stack direction="row" gap={4}>
            <Button type="submit" colorScheme="teal" flex="1">
              {initialFlight ? "Update Flight" : "Create Flight"}
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              colorScheme="gray"
              flex="1"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default FlightFields;
