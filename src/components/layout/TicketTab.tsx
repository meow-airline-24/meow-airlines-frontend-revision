"use client"

import { Box, HStack, VStack, Flex, Text } from "@chakra-ui/react";
import { CloseButton } from '@/components/ui/close-button'
import { Tooltip } from "@/components/ui/tooltip";
import { Ticket } from "@/interfaces/Ticket";

export default function TicketTab(props: { TicketData : Ticket }) {
    const { TicketData } = props

    const normalizeDate = (date : string) => {
        var yyyy = date.slice(0, 4)
        var mm = date.slice(5, 7)
        var dd = date.slice(8, 10)

        return dd + '/' + mm + '/' + yyyy
    }

    const getDayInString = (day : Date) => {
        return day.getUTCFullYear() + '-' + String(day.getUTCMonth() + 1).padStart(2, '0') + '-' + String(day.getUTCDate()).padStart(2, '0')
    }

    const handleDeleteTicket = () => {
        if (confirm("Delete ticket?")) {
            console.log('Delete confirmed')
        } else {
            console.log('No delete')
        }
    }

    return (
        <Box width={960} height={300} borderRadius={16} bg={'white'} padding={8} borderWidth={1} position={'relative'}>
            <CloseButton position={'absolute'} size={'xl'} top={-4} insetEnd={-4} borderRadius={'50%'} variant={'surface'} colorPalette={'red'} zIndex={1}
                onClick={handleDeleteTicket}/>

            <Flex justify={'space-between'}>
                <VStack color={'blue.700'} fontSize={'lg'} alignItems={'flex-start'}>
                    <Flex direction={'row'} gapX={1}>
                        <Text fontWeight={'medium'}>Ticket Status:</Text>
                        <Text >{TicketData.status}</Text>
                    </Flex>
                    <Flex direction={'row'} gapX={1}>
                        <Text fontWeight={'medium'}>Issued at:</Text>
                        <Text>{TicketData.issuing_date.toISOString()}</Text>
                    </Flex>
                </VStack>
                <VStack color={'blue.700'} fontSize={'lg'} alignItems={'flex-end'} textAlign={'right'}>
                    <Flex direction={'column'}>
                        <Text fontWeight={'medium'}>Your seat ID:</Text>
                        <HStack width={'100%'} dir={'rtl'} gapX={1}>
                            {TicketData.seat_id.map((seat) => (
                                <Text key={seat}>{seat}</Text>
                            ))}
                        </HStack>
                    </Flex>
                </VStack>
            </Flex>

            <HStack
              gap={6}
              width={"100%"}
              align="baseline"
            >
              <VStack width={"100%"}>
                <Text width={"100%"} borderBottomWidth={1} textAlign={"center"}>
                  Ticket Information
                </Text>
                <HStack width={"100%"} position={'relative'} align={"baseline"} gap={12}>
                  <VStack width={"33%"}>
                    <Flex width={'100%'} direction={'column'}>
                        <Text fontSize={'sm'} fontWeight={'medium'}>Passenger Name</Text>
                        <Text width={'100%'} marginTop={1} borderWidth={2} borderRadius={4} borderColor={'gray.300'} padding={2} bg={'gray.100'}>{TicketData.passenger_name}</Text>
                    </Flex>

                    <Flex width={'100%'} direction={'column'}>
                        <Text fontSize={'sm'} fontWeight={'medium'}>Gender</Text>
                        <Text width={'100%'} marginTop={1} borderWidth={2} borderRadius={4} borderColor={'gray.300'} padding={2} bg={'gray.100'}>{(TicketData.gender) ? "Male" : "Female"}</Text>
                    </Flex>
                  </VStack>

                  <VStack width={"33%"}>
                    <Flex width={'100%'} direction={'column'}>
                        <Text fontSize={'sm'} fontWeight={'medium'}>Date of Birth</Text>
                        <Text width={'100%'} marginTop={1} borderWidth={2} borderRadius={4} borderColor={'gray.300'} padding={2} bg={'gray.100'}>{getDayInString(TicketData.dob)}</Text>
                    </Flex>
                    
                    <Flex width={'100%'} direction={'column'}>
                        <Text fontSize={'sm'} fontWeight={'medium'}>Country Code</Text>
                        <Text width={'100%'} marginTop={1} borderWidth={2} borderRadius={4} borderColor={'gray.300'} padding={2} bg={'gray.100'}>{String(TicketData.country_code)}</Text>
                    </Flex>
                  </VStack>

                  <VStack width={"33%"}>
                    <Flex width={'100%'} direction={'column'}>
                        <Text fontSize={'sm'} fontWeight={'medium'}>Identification Method</Text>
                        <Text width={'100%'} marginTop={1} borderWidth={2} borderRadius={4} borderColor={'gray.300'} padding={2} bg={'gray.100'}>{TicketData.id_type}</Text>
                    </Flex>

                    <Flex width={'100%'} direction={'column'}>
                        <Text fontSize={'sm'} fontWeight={'medium'}>Identification Number</Text>
                        <Text width={'100%'} marginTop={1} borderWidth={2} borderRadius={4} borderColor={'gray.300'} padding={2} bg={'gray.100'}>{TicketData.id_number}</Text>
                    </Flex>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>

        </Box>
    )
}