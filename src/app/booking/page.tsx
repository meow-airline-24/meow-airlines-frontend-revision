"use client";
import { useEffect, useState } from "react";
import { Box, Flex, Icon, HStack, VStack, Text, Spinner } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { LuPlaneTakeoff } from "react-icons/lu";
import NavBar from "@/components/layout/NavBar";
import PassengerForm from '@/components/layout/PassengerForm'
import CommunicationForm from "@/components/layout/CommunicationForm";

const DaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Booking() {
  const [TicketData, setTicketData] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const SessionStorageData = {
      TicketType: sessionStorage.getItem("TicketType") || 'none',
      Airline: sessionStorage.getItem("Airline") || 'none',
      FlightNumber: sessionStorage.getItem("FlightNumber") || 'none',
      SourcePort: {
        label: sessionStorage.getItem("SourcePort.label") || 'none',
        value: sessionStorage.getItem("SourcePort.value") || 'none'
      },
      DestPort: {
        label: sessionStorage.getItem("DestPort.label") || 'none',
        value: sessionStorage.getItem("DestPort.value") || 'none'
      },
      DepartDate: {
        day: DaysOfWeek[(new Date(sessionStorage.getItem("DepartDate") || '')).getUTCDay()] || 'none',
        date: sessionStorage.getItem("DepartDate") || 'yyyy-mm-dd',
        hour: sessionStorage.getItem('DepartTimeUTC') || 'none',
        offset: sessionStorage.getItem('TimezoneOffset') || 'none'
      },
      ArrivalDate: {
        day: DaysOfWeek[(new Date(sessionStorage.getItem("ArrivalDate") || '')).getUTCDay()] || 'none',
        date: sessionStorage.getItem("ArrivalDate") || 'yyyy-mm-dd',
        hour: sessionStorage.getItem('ArrivalTimeUTC') || 'none',
        offset: sessionStorage.getItem('TimezoneOffset') || 'none'
      },
      PassengerCount: Number(sessionStorage.getItem("PassengerCount") || 0),
      SelectedSeat: {
        class: sessionStorage.getItem('SeatClass') || 'none',
        price: sessionStorage.getItem('SeatPrice') || 'none'
      },
      BookExpireDate: sessionStorage.getItem('BookExpireDate')
    }
    
    setTicketData(SessionStorageData)
    setLoading(false)
    
  }, [])

  // console.log(TicketData)

  var PassengerCount = TicketData?.PassengerCount
  const PassengerFormList = []

  for (let i = 1; i <= PassengerCount; i++) {
      PassengerFormList.push(<PassengerForm key={String(i)} formID={String(i)} />)
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
          <VStack align={'center'}>
            <Text fontSize={'lg'} fontWeight={'medium'} color={'colorPalette.700'}>Please fill in the information below to finish booking</Text>
            <Flex width={800} paddingLeft={6} paddingRight={6} align={'center'} direction={'column'}>
              <HStack alignSelf={'normal'} justify={'space-between'}>
                <VStack color={'gray.600'}>
                  <Flex direction={'row'} spaceX={1}>
                    <Text>Depart from:</Text>
                    <Text fontWeight={'medium'} color={'colorPalette.700'}>{TicketData?.SourcePort.label}</Text>
                  </Flex>
                  <Flex direction={'row'} spaceX={1}>
                    <Text>At time:</Text>
                    <Text fontWeight={'medium'} color={'colorPalette.700'}>{TicketData?.DepartDate.hour} (UTC)</Text>
                  </Flex>
                </VStack>
                <Text color={'colorPalette.700'} fontSize={'2xl'}>
                . . . . .. ... .....
                <Icon position={'relative'} bottom={'9px'} size={'2xl'} color={'colorPalette.700'}>
                  <LuPlaneTakeoff />
                </Icon>
                ..... ... .. . . . .
                </Text>
                <VStack color={'gray.600'}>
                  <Flex direction={'row'} spaceX={1}>
                    <Text>Leave for:</Text>
                    <Text fontWeight={'medium'} color={'colorPalette.700'}>{TicketData?.DestPort.label}</Text>
                  </Flex>
                  <Flex direction={'row'} spaceX={1}>
                    <Text>At time:</Text>
                    <Text fontWeight={'medium'} color={'colorPalette.700'}>{TicketData?.ArrivalDate.hour} (UTC)</Text>
                  </Flex>
                </VStack>
              </HStack>
              <Flex direction={'row'} fontSize={'sm'} spaceX={1} color={'gray.600'}>
                <Text>Flight</Text>
                <Text fontWeight={'medium'} color={'colorPalette.700'}>{TicketData?.FlightNumber}</Text>
                <Text>provided by </Text>
                <Text fontWeight={'medium'} color={'colorPalette.700'}>{TicketData?.Airline}</Text>
              </Flex>
            </Flex>
            <CommunicationForm />
            <Text marginTop={8} marginBottom={4} fontSize={'xl'} color='colorPalette.700' width={'100%'} borderBottomWidth={1} textAlign={'center'} fontWeight={'medium'}>
              Please provide the personal information of each passenger
            </Text>
            {PassengerFormList}
            <Button size={'2xl'} marginTop={12} width={360}>
              Submit Information
            </Button>
          </VStack>
        )}
      </Box>
    </>
  );
}
