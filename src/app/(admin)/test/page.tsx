import { Box, AbsoluteCenter, Flex } from "@chakra-ui/react"
import FlightTab from "@/components/layout/FlightTab";
import { Ticket } from "@/interfaces/Ticket";
import { Seat } from "@/interfaces/Seat";
import { Booking } from "@/interfaces/Booking";
import TicketTab from "@/components/layout/TicketTab";


export default function Test() {
    const booking = {
        type: "one-way",
        user_id: "User",
        flight_id: "string",
        booking_time: new Date(),
        total_amount: "84843",
        email: "9183",
        phone: "019091",
    }

    const ticket = {
        booking_id: "dadwhi",
        status: "confirmed",
        passenger_name: "ABC",
        dob: new Date(),
        gender: true,
        id_type: "nin",
        id_number: "12847324",
        issuing_date: new Date(),
        country_code: 111,
        seat_id: ["a", "b"],
    }
    

    return (
        <Box bg='gray' w={'vw'} h={'vh'}>
            <AbsoluteCenter axis={'both'}>
                <TicketTab TicketData={ticket} />
            </AbsoluteCenter>
        </Box>
    )
}