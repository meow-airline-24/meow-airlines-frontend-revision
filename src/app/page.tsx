import { Button } from '@/components/ui/button'
import { Box, HStack, Flex, Image } from '@chakra-ui/react'
import NavBar from '@/components/layout/NavBar'
import BookingBar from '@/components/layout/BookingBar'
import TicketCart from '@/components/layout/TicketCard'

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu'

export default function Home() {
  return (
    <>
      <NavBar />
      <Box borderBottomColor={'orange.400'} borderBottomWidth={4}>
        <Image minW={1080} width={'vw'} src={'../world-travel.jpg'} alt={'World Travel'} position={'relative'}></Image>
      </Box>
      <Flex position={'relative'} bottom={374} left={'96'} width={1080}>
        <BookingBar />
      </Flex>
    </>
  )
}
