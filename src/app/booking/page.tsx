"use client";

import { useEffect, useState } from "react";
import { Box, Flex, Icon, Link, HStack, VStack, Text, Spinner, createListCollection } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LuPlaneTakeoff, LuTicketsPlane } from "react-icons/lu";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PassengerForm from '@/components/layout/PassengerForm'
import CommunicationForm from "@/components/layout/CommunicationForm";
import { createBooking } from "@/utils/backend";
import { useRouter } from "next/navigation";

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
	const router = useRouter();
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

  const handleSubmitInformation = async () => {
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

		// Map country code to corresponding value
		const country_label = passenger_country?.innerText.trim() || "undefined";
		const country_mapping = countries.items.find(item => item.label === country_label);
		const country_code = country_mapping?.value || "undefined";

		PassengerDetails.push({
			name: passenger_name.value || "undefined",
			gender: passenger_gender?.value || "undefined",
			dob: passenger_dob.value || "undefined",
			country_code: country_code,
			id_type: passenger_id_type?.value || "undefined",
			id_number: passenger_id_num.value || "undefined",
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
	  try {
		await createBooking(travelDetails);
		alert("Booking created successfully! Please check your email for confirmation.");
		router.push("/");
	  } catch (error) {
		alert("Failed to create booking. Please try again later.");
		router.push("/");
	  }
	
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
    </Flex>
  );
}

const countries = createListCollection({
  items: [
	{ label: "Australia", value: "+61" },
	{ label: "Belarus", value: "+375" },
	{ label: "Belgium", value: "+32" },
	{ label: "Brazil", value: "+55" },
	{ label: "Cambodia", value: "+855" },
	{ label: "China", value: "+86" },
	{ label: "Czech Republic", value: "+420" },
	{ label: "Denmark", value: "+45" },
	{ label: "Egypt", value: "+20" },
	{ label: "Finland", value: "+358" },
	{ label: "France", value: "+33" },
	{ label: "Germany", value: "+49" },
	{ label: "Greece", value: "+30" },
	{ label: "Hungary", value: "+36" },
	{ label: "India", value: "+91" },
	{ label: "Indonesia", value: "+62" },
	{ label: "Iran", value: "+98" },
	{ label: "Iraq", value: "+964" },
	{ label: "Israel", value: "+972" },
	{ label: "Italy", value: "+39" },
	{ label: "Japan", value: "+81" },
	{ label: "Kyrgyzstan", value: "+996" },
	{ label: "Laos", value: "+856" },
	{ label: "Lithuania", value: "+370" },
	{ label: "Malaysia", value: "+60" },
	{ label: "Mongolia", value: "+976" },
	{ label: "Myanmar", value: "+95" },
	{ label: "Nepal", value: "+977" },
	{ label: "Netherlands", value: "+31" },
	{ label: "New Zealand", value: "+64" },
	{ label: "Norway", value: "+47" },
	{ label: "Pakistan", value: "+92" },
	{ label: "Philippines", value: "+63" },
	{ label: "Poland", value: "+48" },
	{ label: "Portugal", value: "+351" },
	{ label: "Qatar", value: "+974" },
	{ label: "Republic of the Congo", value: "+242" },
	{ label: "Russia", value: "+7" },
	{ label: "Saudi Arabia", value: "+966" },
	{ label: "Singapore", value: "+65" },
	{ label: "South Korea", value: "+82" },
	{ label: "Spain", value: "+34" },
	{ label: "Sweden", value: "+46" },
	{ label: "Switzerland", value: "+41" },
	{ label: "Thailand", value: "+66" },
	{ label: "Turkey", value: "+90" },
	{ label: "Ukraine", value: "+380" },
	{ label: "United Kingdom", value: "+44" },
	{ label: "United States", value: "+1" },
	{ label: "Vietnam", value: "+84" },
	{ label: "Yemen", value: "+967" },
  ],
});
