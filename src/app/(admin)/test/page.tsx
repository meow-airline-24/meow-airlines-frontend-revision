import { Box, AbsoluteCenter } from "@chakra-ui/react"
import { TicketCard } from "@/components/layout/TicketCard";

export default function Test() {
    return (
        <Box bg='gray' w={'vw'} h={'vh'}>
            <AbsoluteCenter axis={'both'}>
                <TicketCard src={'../locations/tp hcm.jpg'} alt={'Hanoi (HAN) to Ho Chi Minh City (SGN) - 22/12/2024 - 1,799,000 - One way ticket - id1'} />
            </AbsoluteCenter>
        </Box>
    )
}