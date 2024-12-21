import { Box, Grid, GridItem, Heading, HStack, Flex, Image } from '@chakra-ui/react'
import NavBar from '@/components/layout/NavBar'
import BookingBar from '@/components/layout/BookingBar'
import { TicketCard } from "@/components/layout/TicketCard";

export default function Home() {
  return (
    <>
      <NavBar />
      <Box borderBottomColor={'orange.400'} width={'vw'} borderBottomWidth={4}>
        <Image minW={1080} width={'vw'} src={'../world-travel.jpg'} alt={'World Travel'} position={'relative'}></Image>
      </Box>
      <Flex justify={'center'} marginTop={-64} minW={1080} width={'vw'}>
        <BookingBar />
      </Flex>
      <Flex direction={'column'} marginTop={16} minW={1080} width={'vw'} align={'center'}>
        <Heading fontSize={'3xl'} color={'blue.700'}>Flight recommendation:</Heading>
        <Grid marginTop={16} templateColumns={'repeat(4, 1fr)'} templateRows={'repeat(2, 1fr)'} gap={'6'}>
          {/* alt format: Src to Dest Port - depart date - ticket cost - ticket type - button id */}
          <GridItem>
            <TicketCard src={'../locations/tp hcm.jpg'} alt={'Hanoi (HAN) to Ho Chi Minh City (SGN) - 22/12/2024 - 3,399,000 - One way ticket - id1'} />
          </GridItem>
          <GridItem>
            <TicketCard src={'../locations/da nang.jpg'} alt={'Hanoi (HAN) to Da Nang (DAD) - 22/12/2024 - 2,499,000 - One way ticket - id2'} />
          </GridItem>
          <GridItem>
            <TicketCard src={'../locations/ha long.jpg'} alt={'Ho Chi Minh City (SGN) to Ha Long (VDO) - 22/12/2024 - 3,399,000 - One way ticket - id3'} />
          </GridItem>
          <GridItem>
            <TicketCard src={'../locations/ha noi.jpg'} alt={'Quang Binh (VDH) to Hanoi (HAN) - 22/12/2024 - 2,799,000 - One way ticket - id4'} />
          </GridItem>
          <GridItem>
            <TicketCard src={'../locations/nha trang.jpg'} alt={'Hanoi (HAN) to Nha Trang (CXR) - 22/12/2024 - 2,999,000 - One way ticket - id5'} />
          </GridItem>
          <GridItem>
            <TicketCard src={'../locations/da lat.jpg'} alt={'Hanoi (HAN) to Da Lat (DLI) - 22/12/2024 - 2,699,000 - One way ticket - id6'} />
          </GridItem>
          <GridItem>
            <TicketCard src={'../locations/tp hcm.jpg'} alt={'Da Nang (DAD) to Ho Chi Minh City (SGN) - 22/12/2024 - 2,099,000 - One way ticket - id7'} />
          </GridItem>
          <GridItem>
            <TicketCard src={'../locations/quang binh.jpg'} alt={'Nha Trang (CXR) to Quang Binh (VDH) - 22/12/2024 - 1,799,000 - One way ticket - id8'} />
          </GridItem>
        </Grid>
      </Flex>
    </>
  )
}
