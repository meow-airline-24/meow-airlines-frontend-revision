"use client";

import { useEffect, useState } from "react";
import { Box, Flex, Link, VStack, Text, Spinner } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LuTicketsPlane } from "react-icons/lu";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import TicketTab from "@/components/layout/TicketTab";
import { Ticket } from "@/interfaces/Ticket";

export default function MyBooking() {
    const [TicketData, setTicketData] = useState<Ticket>()
    const [loading, setLoading] = useState(false)

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
        <Flex height={'100vh'} direction={'column'} justify={'space-between'}> 
            <NavBar />
            <Box width={'100vw'} height={'100%'} minWidth={1080} marginTop={'80px'}>
                {loading ? (
                    <Flex paddingTop={12} align={'center'} direction={'column'}>
                    <VStack marginTop={12}>
                        <Spinner borderWidth={3} size={'lg'} color={'blue.700'} />
                        <Text marginTop={4} fontSize={'xl'} fontWeight={'medium'} color={'gray.600'}>Loading...</Text>
                    </VStack>
                    </Flex>
                ) : (
                <VStack align={'center'}>
                    {TicketData === null ? (
                        <EmptyState
                        icon={<LuTicketsPlane />}
                        color={'blue.700'}
                        size={'lg'}
                        title={"Ticket not found"}
                        description={"There is no ticket of the given code"}
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
                            <Link href={'/'} textDecoration={'none'}>Return Home</Link>
                        </Button>
                        </EmptyState>
                    ) : (
                        <>
                            <Text fontSize={'lg'} fontWeight={'medium'} color={'colorPalette.700'}>Your booking list</Text>

                            {/* Uncomment to show ticket tab */}
                            <Flex marginTop={8}>
                                <TicketTab TicketData={ticket} />
                            </Flex>
                        </>
                    )}
                </VStack>
                )}
            </Box>
            <Footer />
        </Flex>
    )
}