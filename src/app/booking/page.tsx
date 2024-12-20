"use client";

import { useSearchParams } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";
import NavBar from "@/components/layout/NavBar";

export default function Booking() {
  const searchParams = useSearchParams();
  const TicketType = searchParams.get("type");
  const SourcePort = searchParams.get("src");
  const DestPort = searchParams.get("dest");
  const DepartDate = searchParams.get("depart");
  const ReturnDate = searchParams.get("return");
  const PassengerCount = searchParams.get("passenger");

  const DaysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  var day = new Date(DepartDate || "");
  if (isNaN(day.getTime())) {
    day = new Date();
  }

  return (
    <>
      <NavBar />
      <Flex marginTop={"80px"}>
        <Box>
          List of all flights from {SourcePort} to {DestPort} that departs on{" "}
          {DaysOfWeek[day.getUTCDay()]}
        </Box>
      </Flex>
    </>
  );
}
