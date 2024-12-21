import { Box, AbsoluteCenter, Flex } from "@chakra-ui/react"
import FlightTab from "@/components/layout/FlightTab";
import { Flight } from "@/interfaces/Flight";
import { Aircraft } from "@/interfaces/Aircraft";
import { AircraftModel } from "@/interfaces/AircraftModel";
import PassengerForm from '@/components/layout/PassengerForm'
import CommunicationForm from "@/components/layout/CommunicationForm";
import BlogSection from "@/components/layout/BlogSection";

interface Price {
    First: number,
    Business: number,
    Economy: number
}

export default function Test() {
    const modelA : AircraftModel = {
        model_name: 'abc',
        capacity: 123,
        rows: [1, 2, 3],
        columns: [1, 2, 3],
        manufacturer: 'def',
    }
    const flight : Flight = {
        _id: '1870147uh123788adf',
        flight_number: 'A123',
        airline: 'MEOW',
        departure_airport: 'HAN',
        arrival_airport: 'SGN',
        departure_time: new Date() ,
        arrival_time: new Date(),
        book_exp: new Date(),
        aircraft_id: 'aaa'
    }
    const price : Price = {
        First: 100,
        Business: 200,
        Economy: 300
    }

    var PassengerCount = 2

    const PassengerFormList = []

    for (let i = 1; i <= PassengerCount; i++) {
        PassengerFormList.push(<PassengerForm formID={String(i)} />)
    }

    return (
        <Box bg='gray' w={'vw'} h={'vh'}>
            <AbsoluteCenter axis={'both'}>
                {/* <FlightTab key='abcdefghijk' FlightData={flight} FlightPrice={price} /> */}
                {/* <Flex direction={'column'}>
                    <CommunicationForm />
                    
                    {PassengerFormList}
                </Flex> */}
                <BlogSection />
            </AbsoluteCenter>
        </Box>
    )
}