'use client'

import { Box, HStack, IconButton, Image, ImageProps, Text } from "@chakra-ui/react"
import { LuArrowRight } from "react-icons/lu";
import { forwardRef } from "react"

export const TicketCard = forwardRef<HTMLImageElement, ImageProps> (
    function TicketCard(props, ref) {
        const { src, alt, ...rest } = props
        var data = alt?.split('-')

        const handleClick = () => {
            var TicketType = document.getElementById('ticket-type')
        }

        return (
            <Box maxW={"xs"} borderWidth={"1px"} borderRadius={8} bg={'white'}>
                <Image borderTopRadius={8} src={src} alt={alt} ref={ref} {...rest} />
                <Box padding={"6"}>
                    {data !== undefined ? (
                        <>
                            <Text fontSize={'2xl'} fontWeight={'medium'} color={'colorPalette.700'}>{data[0]}</Text>
                            <Text color={'gray.600'}>Departure date: {data[1]}</Text>
                            <HStack marginTop={'6'}>
                                <Text color={'gray.600'}>only at:</Text> 
                                <Text color={'colorPalette.700'}>(VND)</Text>
                            </HStack>
                            <HStack justify={'space-between'}>
                                <Box>
                                    <Text fontSize={'3xl'} fontWeight={'medium'} color={'colorPalette.700'}>{data[2]}</Text>
                                    <Text color={'gray.600'}>{data[3]}</Text>
                                </Box>
                                <IconButton id={data[4]} onClick={handleClick}
                                    colorPalette={'gray'} variant={'subtle'} color={'blue.700'} size={'lg'}>
                                    <LuArrowRight />
                                </IconButton>
                            </HStack>
                        </>
                    ) : (
                        <>
                            <Text>{'Source and Destination'}</Text>
                            <Text>{'Departure date'}</Text>
                            <Text>{'Cost'}</Text>
                            <Text>{'Ticket type'}</Text>
                        </>
                    )}
                    
                </Box>
            </Box>
        )
    }
)

const airports = [
    { label: "Hanoi", value: "HAN"},
    { label: "Ho Chi Minh City", value: "SGN"},
    { label: "Ha Long", value: "VDO"},
    { label: "Da Nang", value: "DAD"},
    { label: "Nha Trang", value: "CXR"},
    { label: "Quang Binh", value: "VDH"},
    { label: "Da Lat", value: "DLI"}
]