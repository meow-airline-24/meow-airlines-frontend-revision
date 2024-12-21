"use client";

import { useRouter } from "next/navigation";
import { Box, IconButton, Icon, HStack, VStack, Flex, Text } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { LuPlaneTakeoff, LuChevronDown } from "react-icons/lu";
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
  const BookExpireDate = new Date(FlightData.book_exp)
  const router = useRouter()

  const getUTCTime = (time : Date) => {
    var hour = String(time.getUTCHours()).padStart(2, '0')
    var mins = String(time.getUTCMinutes()).padStart(2, '0')
  
    return hour + ':' + mins
  }

  const getDayInString = (day : Date) => {
    return day.getUTCFullYear() + '-' + String(day.getUTCMonth() + 1).padStart(2, '0') + '-' + String(day.getUTCDate()).padStart(2, '0')
  }

  const handleBookingClass = (SeatClass : string) => {
    sessionStorage.setItem('Airline', FlightData.airline)
    sessionStorage.setItem('FlightNumber', FlightData.flight_number)
    sessionStorage.setItem('FlightID', FlightData._id)
    sessionStorage.setItem('SeatClass', SeatClass)
    sessionStorage.setItem('SeatPrice', FlightPrice[SeatClass as keyof Price].toString())
    sessionStorage.setItem('DepartTimeUTC', getUTCTime(DepartDate))
    sessionStorage.setItem('ArrivalDate', getDayInString(ArrivalDate))
    sessionStorage.setItem('ArrivalTimeUTC', getUTCTime(ArrivalDate))
    sessionStorage.setItem('TimezoneOffset', (DepartDate.getTimezoneOffset() / 60 ).toString())
    sessionStorage.setItem('BookExpireDate', BookExpireDate.toString())

    router.push('/booking')
  }

  return (
    <Box width={1200} height={180} borderRadius={8} bg={'white'} shadow={'0px 0px 8px -4px'}>
      <HStack justify={'space-between'}> 
        <Flex width={'2/3'} paddingLeft={6} paddingRight={6} align={'center'} direction={'column'}>
          <HStack alignSelf={'normal'} justify={'space-between'}>
            <VStack color={'gray.600'} alignItems={'flex-start'}>
              <Flex direction={'row'} spaceX={1}>
                <Text>Depart from:</Text>
                <Text fontWeight={'medium'} color={'colorPalette.700'}>{FlightData.departure_airport}</Text>
              </Flex>
              <Flex direction={'row'} spaceX={1}>
                <Text>At time:</Text>
                <Text fontWeight={'medium'} color={'colorPalette.700'}>{getUTCTime(DepartDate)} (UTC)</Text>
              </Flex>
            </VStack>
            <Text color={'colorPalette.700'} fontSize={'2xl'}>
            . . . . .. ... .....
            <Icon position={'relative'} bottom={'9px'} size={'2xl'} color={'colorPalette.700'}>
              <LuPlaneTakeoff />
            </Icon>
            ..... ... .. . . . .
            </Text>
            <VStack color={'gray.600'} alignItems={'flex-end'}>
              <Flex direction={'row'} spaceX={1}>
                <Text>Leave for:</Text>
                <Text fontWeight={'medium'} color={'colorPalette.700'}>{FlightData.arrival_airport}</Text>
              </Flex>
              <Flex direction={'row'} spaceX={1}>
                <Text>At time:</Text>
                <Text fontWeight={'medium'} color={'colorPalette.700'}>{getUTCTime(ArrivalDate)} (UTC)</Text>
              </Flex>
            </VStack>
          </HStack>
          <Flex direction={'row'} fontSize={'sm'} spaceX={1} color={'gray.600'}>
            <Text>Flight</Text>
            <Text fontWeight={'medium'} color={'colorPalette.700'}>{FlightData.flight_number}</Text>
            <Text>provided by </Text>
            <Text fontWeight={'medium'} color={'colorPalette.700'}>{FlightData.airline}</Text>
          </Flex>
        </Flex>

        {/* Seat class selection */}
        <Flex gap={'1px'} textAlign={'center'} color={'white'} fontSize={'xl'} fontWeight={'medium'} >
          {FlightPrice.Economy !== null ? (
            <Box height={180} width={150} bg={'green.700'}>
              <Text paddingTop={6}>Economy</Text>
              <Text fontSize={'md'}>from</Text>
              <Text fontSize={'3xl'}>
                {FlightPrice.Economy}
              </Text>
              <Text fontSize={'md'}>VND</Text>
              <Tooltip content={'Book this seat class'} 
              showArrow contentProps={{ css: { '--tooltip-bg': 'colors.blue.600' }, padding: 2, fontSize: 'md' }}>
                <IconButton width={'100%'} height={'fit'} bg={'transparent'} onClick={() => handleBookingClass('Economy')}>
                  <LuChevronDown />
                </IconButton>
              </Tooltip>
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
              <Text paddingTop={6}>Business</Text>
              <Text fontSize={'md'}>from</Text>
              <Text fontSize={'3xl'}>
                {FlightPrice.Business}
              </Text>
              <Text fontSize={'md'}>VND</Text>
              <Tooltip content={'Book this seat class'} 
              showArrow contentProps={{ css: { '--tooltip-bg': 'colors.blue.600' }, padding: 2, fontSize: 'md' }}>
                <IconButton width={'100%'} height={'fit'} bg={'transparent'} onClick={() => handleBookingClass('Business')}>
                  <LuChevronDown />
                </IconButton>
              </Tooltip>
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
            <Box height={180} width={150} 
            bgImage={`radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                      radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)`}
            borderRightRadius={4}>
              <Text paddingTop={5} fontSize={'2xl'}>First</Text>
              <Text fontSize={'md'}>from</Text>
              <Text fontSize={'3xl'}>
                {FlightPrice.First}
              </Text>
              <Text fontSize={'md'}>VND</Text>
              <Tooltip content={'Book this seat class'} 
              showArrow contentProps={{ css: { '--tooltip-bg': 'colors.blue.600' }, padding: 2, fontSize: 'md' }}>
                <IconButton width={'100%'} height={'fit'} bg={'transparent'} onClick={() => handleBookingClass('First')}>
                  <LuChevronDown />
                </IconButton>
              </Tooltip>
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
