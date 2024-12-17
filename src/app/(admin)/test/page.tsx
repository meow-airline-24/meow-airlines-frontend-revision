import { Box, AbsoluteCenter } from "@chakra-ui/react"
import TicketCard from "@/components/layout/TicketCard";

export default function Test() {
    return (
        <Box bg='gray' w={'vw'} h={'vh'}>
            <AbsoluteCenter axis={'both'}>
                <TicketCard />
            </AbsoluteCenter>
        </Box>
    )
}