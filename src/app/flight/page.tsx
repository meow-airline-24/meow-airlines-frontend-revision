"use client";

import { useEffect, useState } from "react";
import { AbsoluteCenter, Box, Button, Flex, Link, Spinner, VStack, Text } from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import NavBar from "@/components/layout/NavBar";
import FlightTab from "@/components/layout/FlightTab";
import { FaPlaneSlash } from "react-icons/fa";
import { flightSearch } from "@/utils/backend";
import { Flight } from "@/interfaces/Flight";

export default function FlightPage() {
  const [BookingData, setBookingData] = useState<{
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

    // Empty flight list to evade duplication of flights
    setFlightList([])

    const fetchFlights = async () => {
      try {
        const res = await flightSearch(flight, data.PassengerCount)
          .then((res) => {
            if (res !== null) {
              res.forEach((element: { flight: Flight; prices: any }) => {
                FlightList.push(element);
                // console.log(element.flight);
                // console.log(element.prices);
              })
            }
          })
          .finally(() => setLoading(false));
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();

    setBookingData(data);
  }, []);

  const getDate = (date : string) => {
    var day = new Date(date)
    const DaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return DaysOfWeek[day.getUTCDay()] + ', ' + String(day.getUTCDate()).padStart(2, '0') + '/' + String(day.getUTCMonth() + 1).padStart(2, '0') + '/' + day.getUTCFullYear()
  }

  return (
    <>
      <NavBar />
      <Box width={'100vw'} height={'100vh'} minWidth={1080} marginTop={'80px'}>
        {loading ? (
            <Flex paddingTop={12} align={'center'} direction={'column'}>
              <VStack marginTop={12}>
                <Spinner borderWidth={3} size={'lg'} color={'blue.700'} />
                <Text marginTop={4} fontSize={'xl'} fontWeight={'medium'} color={'gray.600'}>Loading...</Text>
              </VStack>
            </Flex>
        ) : (
          <Box>
            <Flex direction={'column'} gap={4}>
              {FlightList.length === 0 ? (
                <EmptyState
                  icon={<FaPlaneSlash />}
                  color={'blue.700'}
                  size={'lg'}
                  title={"Flights are unavailable"}
                  description={"There are no flights that meets your criteria"}
                >
                  <Button
                      marginTop={'6px'}
                      size={'lg'}
                      fontSize={'lg'}
                      bg={'colorPalette.500'}
                      borderColor={'colorPalette.600'}
                      borderWidth={2}
                      _hover={{
                        bg: 'colorPalette.400',
                      }} asChild>
                      <Link href={'/'} textDecoration={'none'}>Return home</Link>
                  </Button>
                </EmptyState>
              ) : (
                <VStack align={'center'} gap={4}>
                  <Flex fontSize={'lg'} color={'gray.600'} direction={'row'} spaceX={1} marginBottom={4}>
                    <Text>List of flights from</Text>
                    <Text fontWeight={'medium'} color={'colorPalette.700'}>{BookingData?.SourcePort.label} ({BookingData?.SourcePort.value})</Text>
                    <Text>to</Text>
                    <Text fontWeight={'medium'} color={'colorPalette.700'}>{BookingData?.DestPort.label} ({BookingData?.DestPort.value})</Text>
                    <Text>on</Text>
                    <Text fontWeight={'medium'} color={'colorPalette.700'}>{getDate(BookingData?.DepartDate || '')}</Text>
                  </Flex>
                  {FlightList.map((e) => (
                    <FlightTab
                    key={e.flight.flight_number}
                    FlightData={e.flight}
                    FlightPrice={e.prices}
                    />
                  ))}
                </VStack>
              )}
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
}
