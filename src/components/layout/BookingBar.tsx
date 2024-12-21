'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Alert, Box, Flex, HStack, IconButton, Input, Tabs, Text } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { CloseButton } from '@/components/ui/close-button'
import { Field } from '@/components/ui/field'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { StepperInput } from '@/components/ui/stepper-input'
import { PopoverArrow, PopoverBody, PopoverCloseTrigger ,PopoverContent, PopoverRoot, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip } from '@/components/ui/tooltip'
import { LuPlane, LuCalendar, LuArrowLeftRight } from 'react-icons/lu'

export default function BookingBar() {
    const [TicketType, setTicketType] = useState("one-way");
    const [SourcePort, setSourcePort] = useState({ label: "Hanoi", value: "HAN"})
    const [DestPort, setDestPort] = useState({ label: '', value: ''})
    const [DepartDate, setDepartDate] = useState('yyyy-mm-dd')
    const [ReturnDate, setReturnDate] = useState('yyyy-mm-dd')
    const [PassengerCount, setPassengerCount] = useState(1)
    const router = useRouter();

    const getTodayInString = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        return yyyy + '-' + mm + '-' + dd
    }

    const normalizeDate = (date : string) => {
        var yyyy = date.slice(0, 4)
        var mm = date.slice(5, 7)
        var dd = date.slice(8, 10)

        return dd + '/' + mm + '/' + yyyy
    }

    const handleSearchFlight = () => {
        if (SourcePort.label !== '' && DestPort.label !== '' && DepartDate !== 'yyyy-mm-dd') {
            sessionStorage.setItem('TicketType', TicketType)
            sessionStorage.setItem('SourcePort.label', SourcePort.label)
            sessionStorage.setItem('SourcePort.value', SourcePort.value)
            sessionStorage.setItem('DestPort.label', DestPort.label)
            sessionStorage.setItem('DestPort.value', DestPort.value)
            sessionStorage.setItem('DepartDate', DepartDate)
            sessionStorage.setItem('PassengerCount', String(PassengerCount))
            
            if (TicketType === 'one-way' || (TicketType === 'round-trip' && ReturnDate !== 'yyyy-mm-dd')) {
                sessionStorage.setItem('ReturnDate', ReturnDate)
                router.push('/flight')
                return
            }
        } 

        alert('Please fill in all fields before searching for flight')
    }

    return (
        <Box bg={'white'} borderRadius={16} width={1080} height={360} borderWidth={1} zIndex={1}>
            <Flex align={'baseline'} width={'100%'}>
                <Tabs.Root defaultValue="book" width={'inherit'} fitted variant={'enclosed'}>
                    <Tabs.List width={'100%'} borderTopLeftRadius={16} borderTopRightRadius={16} padding={2} gap={2} bg={'colorPalette.400'}>
                        <Tabs.Trigger value="book" borderTopLeftRadius={6} fontSize={'xl'}
                            color={'colorPalette.800'}
                            _selected={{
                                bg: 'orange.400',
                                shadow: '0px 0px 0px 3px var(--shadow-color)',
                                shadowColor: 'white',
                                color: 'white',
                                borderRadius: 'md',
                                borderTopLeftRadius: 8
                            }}>
                            <LuPlane />
                            Book
                        </Tabs.Trigger>
                        <Tabs.Trigger value="user-booking" borderTopRightRadius={6} fontSize={'xl'}
                            color={'colorPalette.800'}
                            _selected={{
                                bg: 'orange.400',
                                shadow: '0px 0px 0px 3px var(--shadow-color)',
                                shadowColor: 'white',
                                color: 'white',
                                borderRadius: 'md',
                                borderTopRightRadius: 8
                            }}>
                            <LuCalendar />
                            My Booking
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="book">
                        <Flex flexDirection={'column'} paddingLeft={6} paddingRight={6}>
                            <RadioGroup aria-required id={'ticket-type'} variant={'outline'} value={TicketType} onValueChange={(e) => setTicketType(e.value)} asChild>
                                <HStack gap={8} position={'relative'} marginTop={4}>
                                    <Radio value='one-way' fontSize={'md'}>One way</Radio>
                                    <Radio value='round-trip' fontSize={'md'}>Round trip</Radio>
                                    <Radio value='multi-city' disabled color={'gray.500'} fontSize={'md'}>Multicity/ Stopovers</Radio>
                                </HStack>
                            </RadioGroup>

                            <HStack height={24} marginTop={8} borderRadius={4} bg={'gray.100'} gap={0}>
                                {/* Select Source Port */}
                                <Box height={'100%'} width={'1/5'} position={'relative'} borderWidth={2} borderLeftRadius={4} borderRightWidth={0}>
                                    <IconButton position={'absolute'} size={'xs'} top={-4} insetEnd={-4} borderRadius={'50%'} colorPalette={'green'} zIndex={1}
                                        onClick={() => {
                                            const temp = SourcePort
                                            setSourcePort(DestPort)
                                            setDestPort(temp)
                                        }}>
                                        <LuArrowLeftRight />
                                    </IconButton>
                                    <PopoverRoot positioning={{ placement: 'bottom-start'}} autoFocus={false} closeOnInteractOutside={true} modal={true} unmountOnExit={true}>
                                        <PopoverTrigger asChild>
                                            <Box height={'100%'} padding={2}>
                                                <Field paddingLeft={1} paddingTop={3} fontSize={'lg'} fontWeight={'medium'} label={'From'} alignContent={'baseline'}>
                                                    <Flex position={'relative'} bottom={2} paddingRight={2} direction={'row'} align={'center'} width={'100%'}>
                                                        <Text truncate width={'2/3'} color={'colorPalette.700'} id={'src-airport'}>{SourcePort.label}</Text>
                                                        {SourcePort.value !== '' ? (
                                                            <Box marginLeft={2} paddingTop={1} paddingLeft={2} paddingRight={2} paddingBottom={1}
                                                                width={'56px'} borderRadius={6} color={'white'} bgColor={'colorPalette.600'}
                                                                textAlign={'center'}>
                                                                    {SourcePort.value}
                                                            </Box>                                                         
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Flex>
                                                </Field>
                                            </Box>
                                        </PopoverTrigger>
                                        <PopoverContent width={360} maxHeight={320} overflowY={'scroll'} scrollBehavior={'smooth'}>
                                            <PopoverArrow />
                                            <PopoverBody>
                                                <PopoverCloseTrigger id={'src-popover-close'} colorPalette={'blue'} />
                                                <PopoverTitle marginBottom={2} paddingBottom={2} borderBottomWidth={1} 
                                                    textAlign={'center'} fontSize={'xl'} fontWeight={'medium'}>
                                                    Cities
                                                </PopoverTitle>
                                                <Box position={'relative'}>
                                                    {airports.filter(airport => !((airport.label === SourcePort.label) || (airport.label === DestPort.label)))
                                                    .map((airport) => (
                                                        <Button height={'64px'} padding={4} fontSize={'lg'} width={'100%'} colorPalette={'blue'} variant={'outline'}
                                                            borderRadius={0} borderWidth={0} key={airport.value} id={airport.value}
                                                            onClick={() => {
                                                                setSourcePort(airport)
                                                                document.getElementById('src-popover-close')?.click();
                                                            }}
                                                            _focus={{ backgroundColor: 'colorPalette.100' ,outlineWidth: 0 }}>
                                                            <Flex width={'inherit'} textAlign={'left'} direction={'row'} align={'center'} justify={'space-between'}>
                                                                <Text truncate width={'3/4'} color={'colorPalette.700'}>
                                                                    {airport.label}
                                                                </Text>
                                                                <Box marginLeft={2} paddingTop={1} paddingLeft={2} paddingRight={2} paddingBottom={1}
                                                                    width={'1/5'} borderRadius={6} color={'white'} bgColor={'colorPalette.600'}
                                                                    textAlign={'center'}>
                                                                        {airport.value}
                                                                </Box>
                                                            </Flex>
                                                        </Button>
                                                    ))}
                                                    <Box marginTop={14} position={'sticky'} bottom={0} height={6} bg={'white'}
                                                        shadow={'0px 0px 30px 30px var(--shadow-color)'}
                                                        shadowColor={'white'} />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </PopoverRoot>
                                </Box>

                                {/* Select Dest Port */}
                                <Box height={'100%'} width={'1/5'} position={'relative'} borderWidth={2} borderRightWidth={0}>
                                    {SourcePort.value !== '' || DestPort.value !== '' ? (
                                        <CloseButton position={'absolute'} size={'xs'} top={-4} insetEnd={-4} borderRadius={'50%'} variant={'surface'} colorPalette={'gray'} zIndex={1}
                                        onClick={() => {
                                            setSourcePort({ label: '', value: '' })
                                            setDestPort({ label: '', value: '' })
                                        }}/>
                                    ) : (
                                        <></>
                                    )}
                                    <PopoverRoot positioning={{ placement: 'bottom-start'}} autoFocus={false} closeOnInteractOutside={true} modal={true} unmountOnExit={true}>
                                        <PopoverTrigger asChild>
                                            <Box height={'100%'} padding={2}>
                                                <Field paddingLeft={1} paddingTop={3} fontSize={'lg'} fontWeight={'medium'} label={'To'} alignContent={'baseline'}>
                                                    <Flex position={'relative'} bottom={2} paddingRight={2} direction={'row'} align={'center'} width={'100%'}>
                                                        <Text truncate width={'2/3'} color={'colorPalette.700'} id={'dest-airport'}>{DestPort.label}</Text>
                                                        {DestPort.value !== '' ? (
                                                            <Box marginLeft={2} paddingTop={1} paddingLeft={2} paddingRight={2} paddingBottom={1}
                                                                width={'56px'} borderRadius={6} color={'white'} bgColor={'colorPalette.600'}
                                                                textAlign={'center'}>
                                                                    {DestPort.value}
                                                            </Box>
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </Flex>
                                                </Field>
                                            </Box>
                                        </PopoverTrigger>
                                        <PopoverContent width={360} maxHeight={320} overflowY={'scroll'} scrollBehavior={'smooth'}>
                                            <PopoverArrow />
                                            <PopoverBody>
                                                <PopoverCloseTrigger id={'dest-popover-close'} colorPalette={'blue'} />
                                                <PopoverTitle marginBottom={2} paddingBottom={2} borderBottomWidth={1} 
                                                    textAlign={'center'} fontSize={'xl'} fontWeight={'medium'}>
                                                    Cities
                                                </PopoverTitle>
                                                <Box position={'relative'}>
                                                    {airports.filter(airport => !((airport.label === SourcePort.label) || (airport.label === DestPort.label)))
                                                    .map((airport) => (
                                                        <Button height={'64px'} padding={4} fontSize={'lg'} width={'100%'} colorPalette={'blue'} variant={'outline'}
                                                            borderRadius={0} borderWidth={0} key={airport.value} 
                                                            onClick={() => {
                                                                setDestPort(airport);
                                                                document.getElementById('dest-popover-close')?.click();
                                                            }}
                                                            _focus={{ backgroundColor: 'colorPalette.100', outlineWidth: 0 }}
                                                            >
                                                            <Flex width={'inherit'} textAlign={'left'} direction={'row'} align={'center'} justify={'space-between'}>
                                                                <Text truncate width={'3/4'} color={'colorPalette.700'}>
                                                                    {airport.label}
                                                                </Text>
                                                                <Box marginLeft={2} paddingTop={1} paddingLeft={2} paddingRight={2} paddingBottom={1}
                                                                    width={'1/5'} borderRadius={6} color={'white'} bgColor={'colorPalette.600'}
                                                                    textAlign={'center'}>
                                                                        {airport.value}
                                                                </Box>
                                                            </Flex>
                                                        </Button>
                                                    ))}
                                                    <Box marginTop={14} position={'sticky'} bottom={0} height={6} bg={'white'}
                                                        shadow={'0px 0px 30px 30px var(--shadow-color)'}
                                                        shadowColor={'white'} />
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </PopoverRoot>
                                </Box>

                                {/* Choose arrival date */}
                                <Box height={'100%'} width={'1/5'} position={'relative'} borderWidth={2} borderRightWidth={0}>
                                    <PopoverRoot positioning={{ placement: 'bottom-start'}} autoFocus={false} closeOnInteractOutside={true} modal={true} unmountOnExit={true}>
                                        <PopoverTrigger asChild>
                                            <Box height={'100%'} padding={2}>
                                                <Field paddingLeft={1} paddingTop={3} fontSize={'lg'} fontWeight={'medium'} label={'Depart'} alignContent={'baseline'}>
                                                    <Flex position={'relative'} direction={'row'} align={'center'} width={'100%'}>
                                                        <Text color={'colorPalette.700'} id={'depart-date'}>
                                                            {normalizeDate(DepartDate)}
                                                        </Text>
                                                    </Flex>
                                                </Field>
                                            </Box>
                                        </PopoverTrigger>
                                        <PopoverContent width={240}>
                                            <PopoverArrow />
                                            <PopoverBody>
                                                <PopoverCloseTrigger id={'depart-popover-close'} colorPalette={'blue'} />
                                                <PopoverTitle marginBottom={2} paddingBottom={2} borderBottomWidth={1} 
                                                    textAlign={'center'} fontSize={'xl'} fontWeight={'medium'}>
                                                    Select Date
                                                </PopoverTitle>
                                                <Box position={'relative'}>
                                                    <Input type={'date'} 
                                                        min={getTodayInString()}
                                                        value={DepartDate}
                                                        onChange={(e) => {
                                                            setDepartDate(e.target.value)
                                                            setReturnDate('yyyy-mm-dd')
                                                            document.getElementById('depart-popover-close')?.click()
                                                        }}>
                                                    </Input>
                                                </Box>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </PopoverRoot>
                                </Box>

                                {/* Set return date */}
                                {TicketType === "round-trip" ? (
                                    <Box height={'100%'} width={'1/5'} position={'relative'} borderWidth={2} borderRightWidth={0}>
                                        <PopoverRoot positioning={{ placement: 'bottom-start'}} autoFocus={false} closeOnInteractOutside={true} modal={true} unmountOnExit={true}>
                                            <PopoverTrigger asChild>
                                                <Box height={'100%'} padding={2}>
                                                    <Field paddingLeft={1} paddingTop={3} fontSize={'lg'} fontWeight={'medium'} label={'Return'} alignContent={'baseline'}>
                                                        <Flex position={'relative'} direction={'row'} align={'center'} width={'100%'}>
                                                            <Text color={'colorPalette.700'} id={'return-date'}>
                                                                {normalizeDate(ReturnDate)}
                                                            </Text>
                                                        </Flex>
                                                    </Field>
                                                </Box>
                                            </PopoverTrigger>
                                            <PopoverContent width={240}>
                                                <PopoverArrow />
                                                <PopoverBody>
                                                    <PopoverCloseTrigger id={'return-popover-close'} colorPalette={'blue'} />
                                                    <PopoverTitle marginBottom={2} paddingBottom={2} borderBottomWidth={1} 
                                                        textAlign={'center'} fontSize={'xl'} fontWeight={'medium'}>
                                                        Select Date
                                                    </PopoverTitle>
                                                    <Box position={'relative'}>
                                                        <Input type={'date'} 
                                                            min={DepartDate}
                                                            disabled={DepartDate === 'yyyy-mm-dd'}
                                                            value={ReturnDate}
                                                            onChange={(e) => {
                                                                setReturnDate(e.target.value)
                                                                document.getElementById('return-popover-close')?.click()
                                                            }}>
                                                        </Input>
                                                    </Box>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </PopoverRoot>
                                    </Box>
                                ) : (
                                    <></>
                                )}

                                {/* Choose passenger */}
                                <Box height={'100%'} width={TicketType === "round-trip" ? '1/5' : '2/5'} position={'relative'} borderWidth={2} borderRightRadius={4}>
                                    <PopoverRoot positioning={{ placement: 'bottom-start'}} autoFocus={false} closeOnInteractOutside={true} modal={true} unmountOnExit={true}>
                                        <PopoverTrigger asChild>
                                            <Box height={'100%'} padding={2}>
                                                <Field paddingLeft={1} paddingTop={3} fontSize={'lg'} fontWeight={'medium'} label={'Passenger'} alignContent={'baseline'}>
                                                    <Flex position={'relative'} direction={'row'} align={'center'} width={'100%'}>
                                                        <Text color={'colorPalette.700'} id={'passenger-count'}>
                                                            {PassengerCount}
                                                        </Text>
                                                    </Flex>
                                                </Field>
                                            </Box>
                                        </PopoverTrigger>
                                        <PopoverContent width={280}>
                                            <PopoverArrow />
                                            <PopoverBody>
                                                <PopoverCloseTrigger id={'passenger-popover-close'} colorPalette={'blue'} />
                                                <PopoverTitle marginBottom={2} paddingBottom={2} borderBottomWidth={1} 
                                                    textAlign={'center'} fontSize={'xl'} fontWeight={'medium'}>
                                                    Passenger Count
                                                </PopoverTitle>
                                                <Flex position={'relative'} direction={'row'} justify={'center'}>
                                                    <StepperInput defaultValue={String(PassengerCount)} min={1} max={9} 
                                                        onValueChange={(e) => {
                                                            setPassengerCount(e.valueAsNumber)
                                                        }}
                                                    />
                                                </Flex>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </PopoverRoot>
                                </Box>
                            </HStack>
                            <HStack marginTop={8} justify={'space-between'}>
                                <Button onClick={handleSearchFlight} id={'search-flight'} height={16} width={56} borderRadius={8} fontSize={'lg'} variant={'solid'} bg={'orange.400'}>
                                    Search Flight
                                </Button>
                                <Tooltip content={'This functionality is currently unavailable'} 
                                    showArrow contentProps={{ css: { '--tooltip-bg': 'colors.colorPalette.400' }, padding: 2, fontSize: 'md' }}
                                    positioning={{ offset: { mainAxis: 1 } }}>
                                    <Field label={'PROMO CODE'} fontSize={'md'} width={60}>
                                        <Input type={'text'} borderColor={'colorPalette.700'} borderWidth={2} disabled width={'70%'}></Input>
                                    </Field>
                                </Tooltip>
                            </HStack>
                        </Flex>
                    </Tabs.Content>
                    <Tabs.Content value="check-in">Manage your projects</Tabs.Content>
                    <Tabs.Content height={'100%'} value="user-booking">
                        <Flex direction={'column'} gap={14} align={'center'} marginTop={12} paddingLeft={8} paddingRight={8}>
                            <HStack gap={6} width={'100%'}>
                                <Field label={'TICKET NUMBER'}>
                                    <Input type={'text'} size={'xl'} _focus={{
                                        outlineWidth: 0,
                                        borderColor: 'gray.400'
                                    }} 
                                    borderWidth={2} borderColor={'gray.200'} placeholder={'123xxxxxxxxxxx'} />
                                </Field>
                                <Field label={'LAST NAME'}>
                                    <Input type={'text'} size={'xl'} _focus={{
                                        outlineWidth: 0,
                                        borderColor: 'gray.400'
                                    }} borderWidth={2} borderColor={'gray.200'} placeholder={'NGUYEN'} />
                                </Field>
                            </HStack>
                            <Button height={12} width={64} borderRadius={8} fontSize={'xl'} variant={'solid'} bg={'orange.400'}>
                                Search
                            </Button>
                        </Flex>
                    </Tabs.Content>
                </Tabs.Root>
            </Flex>
        </Box>
    )
}

const airports = [
    { label: "Hanoi", value: "HAN"},
    { label: "Ho Chi Minh City", value: "SGN"},
    { label: "Ha Long", value: "VDO"},
    { label: "Da Nang", value: "DAD"},
    { label: "Nha Trang", value: "CXR"},
    { label: "Quang Binh", value: "VDH"},
    { label: "Da Lat", value: "DLI"}
]