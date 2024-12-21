import { Box, Flex, Icon, IconButton, Link, HStack, Text } from "@chakra-ui/react"
import { FaRegCopyright, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <Box
        height={'60px'} minW={1080} width={"vw"}
        bg={"colorPalette.100"}
        position={"relative"} zIndex={1}
        boxShadow={"0px 0px 40px 40px var(--shadow-color)"}
        shadowColor={"colorPalette.100"}>
            <Flex height={'70%'} direction={'row'} align={'center'} justify={'space-between'} paddingLeft={16} paddingRight={16}>
                <HStack color={'colorPalette.700'} gapX={1}>
                    <Icon fontSize={'sm'}>
                        <FaRegCopyright/>
                    </Icon>
                    <Text fontWeight={'medium'}>2024 Copyright: MeowAirlines Team</Text>
                </HStack>
                <IconButton asChild variant={'surface'} borderColor={'colorPalette.700'} borderWidth={2} borderRadius={'50%'}>
                    <Link href="https://github.com/meow-airline-24">
                        <FaGithub />
                    </Link>
                </IconButton>
            </Flex>
        </Box>
        
    )
}