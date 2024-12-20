"use client";

import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "@/components/layout/NavBar";
import FlightTab from "@/components/layout/FlightTab";
import { flightSearch } from "@/utils/backend";
import { Flight } from "@/interfaces/Flight";

export default function FlightPage() {
  const [bookingData, setBookingData] = useState<{
    TicketType: string;
    SourcePort: { label: string; value: string };
    DestPort: { label: string; value: string };
    DepartDate: string;
    ReturnDate: string | null;
    PassengerCount: number;
  } | null>(null);
  const [FlightList, setFlightList] = useState<
    { flight: Flight; prices: any }[]
  >([]);

  const [loading, setLoading] = useState(true);

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
        const res = await flightSearch(flight, data.PassengerCount)
          .then((res) =>
            res.forEach((element: { flight: Flight; prices: any }) => {
              FlightList.push(element);
              console.log(element.flight);
              console.log(element.prices);
            })
          )
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();

    setBookingData(data);
  }, []);

  return (
    <>
      <NavBar />
      <Box marginTop={16}>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <Flex direction={'column'} gap={4}>
            {FlightList.map((e) => (
              <FlightTab
                key={e.flight.flight_number}
                FlightData={e.flight}
                FlightPrice={e.prices}
              />
            ))}
          </Flex>
        )}
      </Box>
    </>
  );
}
