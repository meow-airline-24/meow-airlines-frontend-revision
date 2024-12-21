import { AbsoluteCenter, Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
 
export default function NotFound() {
  return (
    <Box bgSize={'cover'} bgImage={'url(../not-found.gif)'} width={'vw'} height={'vh'}>
      <AbsoluteCenter axis={'both'}>
        <Box h={240} w={380} bg={'white/85'} borderRadius={24} shadow={'md'}>
          <Flex flexDirection={'column'} gap={6} align={'center'}>
            <Heading as={'h1'} fontSize={'4xl'} marginTop={12} fontWeight={'bold'} color={'colorPalette.700'}>404 Not Found</Heading>
            <Text fontSize={'md'} color={'red'}>The page you are looking for does not exist</Text>
            <Button
                marginTop={'6px'}
                size={'xl'}
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
                }} asChild>
                <Link href={'/'} _hover={{
                  textDecoration: 'none'
                }}>Return home</Link>
            </Button>
          </Flex>
        </Box>
      </AbsoluteCenter>
    </Box>

  )
}