'use client'
 
import { Heading, Flex, AbsoluteCenter, Box, Text } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { AiOutlineReload } from 'react-icons/ai'
  
export default function Error({
  error,
  reset,
} : {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const handleReload = () => {
    reset()
    // console.log(error)
    // window.location.reload()
  }
 
  return (
    <Box bgSize={'cover'} bgImage={'url(../error.gif)'} w={'vw'} h={'vh'}>
      <AbsoluteCenter axis={'both'}>
        <Box h={240} w={380} bg={'white/85'} borderRadius={24} shadow={'md'}>
          <Flex flexDirection={'column'} gap={4} align={'center'}>
            <Heading as={'h1'} fontWeight={'bold'} marginTop={14} color={'colorPalette.700'}>Sorry, but something went wrong!</Heading>
            <Text fontSize={'md'} color={'red'}>Maybe try reloading the page?</Text>
            <Button
                marginTop={'10px'}
                w={240}
                h={'48px'}
                flexDirection={'row'}
                alignItems={'center'}
                fontSize={'xl'}
                variant={'surface'}
                borderColor={'colorPalette.200'}
                borderWidth={2}
                _hover={{
                  outlineStyle: 'solid',
                  outlineWidth: 1,
                  outlineColor: 'colorPalette.400',
                  borderColor: 'colorPalette.400',
                  color: 'colorPalette.600'
                }}

                onClick={
                  handleReload
                }
                >
                Reload
                <AiOutlineReload />
            </Button>
          </Flex>
        </Box>
      </AbsoluteCenter>

    </Box>
  )
}