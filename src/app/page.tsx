import { Button } from '@/components/ui/button'
import { Box, HStack, Image } from '@chakra-ui/react'
import NavBar from '@/components/layout/NavBar'
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
      <Image minW={1080} width={'vw'} src={'../world-travel.jpg'} alt={'World Travel'} position={'relative'}></Image>

      <HStack>
        <Button variant={'outline'}>Click me</Button>
        <Button>Click me</Button>
      </HStack>


      <MenuRoot>
      <MenuTrigger asChild>
        <Button variant='outline' size='sm'>
          Open
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value='new-txt'>New Text File</MenuItem>
        <MenuItem value='new-file'>New File...</MenuItem>
        <MenuItem value='new-win'>New Window</MenuItem>
        <MenuItem value='open-file'>Open File...</MenuItem>
        <MenuItem value='export'>Export</MenuItem>
      </MenuContent>
    </MenuRoot>
    </>
  )
}
