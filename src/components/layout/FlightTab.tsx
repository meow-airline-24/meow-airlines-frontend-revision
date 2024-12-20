"use client";

import { Box, HStack, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Flight } from "@/interfaces/Flight";

interface Price {
  First: number,
  Business: number,
  Economy: number
}

export default function FlightTab(props: { key: string; FlightData: Flight; FlightPrice: Price; }) {
  const { FlightData, FlightPrice } = props
  const DepartDate = new Date(FlightData.departure_time)
  const ArrivalDate = new Date(FlightData.arrival_time)

  const getUTCTime = (time : Date) => {
    var hour = String(time.getUTCHours()).padStart(2, '0')
    var mins = String(time.getUTCMinutes()).padStart(2, '0')
  
    return hour + ':' + mins + ' (UTC)'
  }

  return (
    <Box width={1200} height={180} borderRadius={8} shadow={'0px 0px 8px -4px'}>
      <HStack justify={'space-between'}> 
        <Flex direction={'column'}>
            <Text>Depart from: {FlightData.departure_airport}</Text>
            <Text>Departure time: {getUTCTime(DepartDate)} </Text>
            <Text>Arrive at: {FlightData.arrival_airport}</Text>
            <Text>Arrival time: {getUTCTime(ArrivalDate)}</Text>
        </Flex>
        <Flex direction={'column'}>
          <Text>Airline: {FlightData.airline}</Text>
          <Text>Flight Number: {FlightData.flight_number}</Text>
        </Flex>
        <Flex gap={'1px'} textAlign={'center'} color={'white'} fontSize={'xl'} fontWeight={'medium'} >
          {FlightPrice.Economy !== null ? (
            <Box height={180} width={150} bg={'green.700'}>
              <Text paddingTop={6}>Economy</Text>
              <Text fontSize={'md'}>from</Text>
              <Text fontSize={'3xl'}>
                {FlightPrice.Economy}
              </Text>
              <Text fontSize={'md'}>VND</Text>
            </Box>
          ) : (
            <Box justifyItems={'center'} height={180} width={150} bg={'gray.400'}>
              <Text paddingTop={6} color={'gray.700'}>Economy</Text>
              <Box fontSize={'md'} fontWeight={'normal'} bg={'gray.600'} color={'gray.300'}
                width={110} borderRadius={4} marginTop={6}>
                Unavailable</Box>
            </Box>
          )}
          {FlightPrice.Business !== null ? (
            <Box height={180} width={150} bg={'blue.700'}>
              Business
              <Text fontSize={'md'}>from</Text>
              <Text fontSize={'3xl'}>
                {FlightPrice.Business}
              </Text>
              <Text fontSize={'md'}>VND</Text>
            </Box>
          ) : (
            <Box justifyItems={'center'} height={180} width={150} bg={'gray.400'}>
              <Text paddingTop={6} color={'gray.700'}>Business</Text>
              <Box fontSize={'md'} fontWeight={'normal'} bg={'gray.600'} color={'gray.300'}
                width={110} borderRadius={4} marginTop={6}>
                Unavailable</Box>
            </Box>
          )}
          {FlightPrice.First !== null ? (
            <Box height={180} width={150} bg={'gold'} borderRightRadius={4}>
              First
              <Text fontSize={'md'}>from</Text>
              <Text fontSize={'3xl'}>
                {FlightPrice.First}
              </Text>
              <Text fontSize={'md'}>VND</Text>
            </Box>
          ) : (
            <Box justifyItems={'center'} height={180} width={150} bg={'gray.400'} borderRightRadius={4}>
              <Text paddingTop={6} color={'gray.700'}>First</Text>
              <Box fontSize={'md'} fontWeight={'normal'} bg={'gray.600'} color={'gray.300'}
                width={110} borderRadius={4} marginTop={6}>
                Unavailable</Box>
            </Box>
          )}
        </Flex>
      </HStack>
    </Box>
  );
}
