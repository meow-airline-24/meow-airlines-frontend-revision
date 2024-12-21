"use client";
import { useEffect, useState } from "react";
import { Box, Flex, Icon, Link, HStack, VStack, Text, Spinner } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LuPlaneTakeoff, LuTicketsPlane } from "react-icons/lu";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
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
	  FlightID: sessionStorage.getItem("FlightID") || 'none',
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
    
  }, [loading])

  // console.log(TicketData)

  var PassengerCount = TicketData?.PassengerCount
  const PassengerFormList = []

  for (let i = 1; i <= PassengerCount; i++) {
      PassengerFormList.push(<PassengerForm key={String(i)} formID={String(i)} />)
  }

  const handleSubmitInformation = () => {
	var communication_form = document.getElementById("communication-form")
	const communication_username = communication_form?.querySelector("#username") as HTMLInputElement
	const communication_email = communication_form?.querySelector("#email-address") as HTMLInputElement
	const communication_phone = communication_form?.querySelector("#phone-number") as HTMLInputElement
	var CommunicationDetails = {
		name: communication_username.value || "undefined",
		email: communication_email.value || "undefined",
		phone: communication_phone.value || "undefined",
	}

	var PassengerDetails = []
	for (let i = 1; i <= PassengerCount; i++) {
		var formID = "passenger-form-" + String(i)
		var passenger_form = document.getElementById(formID)
		const passenger_name = passenger_form?.querySelector("#username") as HTMLInputElement
		const passenger_gender = passenger_form?.querySelector('[name^="gender"]:checked') as HTMLInputElement
		const passenger_dob = passenger_form?.querySelector("#date-of-birth") as HTMLInputElement
		const passenger_country = passenger_form?.querySelector('[id^="select:country-code-' + String(i) + ':control"]') as HTMLElement
		const passenger_id_type = passenger_form?.querySelector('[name^="id-type"]:checked') as HTMLInputElement
		const passenger_id_num = passenger_form?.querySelector("#identification-number") as HTMLInputElement

		PassengerDetails.push({
			name: passenger_name.value || "undefined",
			gender: passenger_gender?.value || "undefined",
			dob: passenger_dob.value || "undefined",
			country_code: passenger_country.innerText || "undefined",
			id_type: passenger_id_type?.value || "undefined",
			id_num: passenger_id_num.value || "undefined",
		})
	}
	const travelDetails = {
		itinerary: [sessionStorage.getItem("FlightID")],
		type: sessionStorage.getItem("TicketType"),
		flightClass: [sessionStorage.getItem("SeatClass")],
		email: CommunicationDetails.email,
		phone: CommunicationDetails.phone,
		passengers: PassengerDetails,
	  };
	console.log(travelDetails)
  }

  return (
    <Flex height={'100vh'} direction={'column'} justify={'space-between'}> 
      <NavBar />
      <Box width={'100vw'} minHeight={'100vh'} height={'100%'} minWidth={1080} marginTop={'80px'}>
        {loading ? (
            <Flex paddingTop={12} align={'center'} direction={'column'}>
              <VStack marginTop={12}>
                <Spinner borderWidth={3} size={'lg'} color={'blue.700'} />
                <Text marginTop={4} fontSize={'xl'} fontWeight={'medium'} color={'gray.600'}>Loading...</Text>
              </VStack>
            </Flex>
        ) : (
          <VStack align={'center'}>
			{TicketData.BookExpireDate === null ? (
				<EmptyState
				  icon={<LuTicketsPlane />}
				  color={'blue.700'}
				  size={'lg'}
				  title={"There is nothing to book!"}
				  description={"You have not selected any flight plans"}
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
					  <Link href={'/#book'} textDecoration={'none'}>Book now</Link>
				  </Button>
				</EmptyState>
			) : (
				<>
					<Text fontSize={'lg'} fontWeight={'medium'} color={'colorPalette.700'}>Please fill in the information below to finish booking</Text>

					<Flex width={920} paddingLeft={6} paddingRight={6} align={'center'} direction={'column'}>
						<HStack alignSelf={'normal'} justify={'space-between'}>
							<VStack color={'gray.600'} minWidth={'200px'} alignItems={'flex-start'}>
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
							<VStack color={'gray.600'} minWidth={'200px'} alignItems={'flex-end'}>
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

					<Button size={'2xl'} marginTop={12} marginBottom={72} width={360} onClick={handleSubmitInformation}>
						Submit Information
					</Button>
				</>
			)}
          </VStack>
        )}
      </Box>
	  <Footer />
    </Flex>
  );
}
