'use client'

import { forwardRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Box, ButtonProps, Center, Flex, Link, Image, HStack } from '@chakra-ui/react'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from '@/components/ui/menu'
import { Tooltip } from '@/components/ui/tooltip'

export const NavItem = forwardRef<HTMLButtonElement, ButtonProps> (
    function NavItem(props, ref) {
        const { disabled, children, ...rest } = props
        return (
            <Button disabled={disabled} ref={ref} {...rest}
                cursor={'pointer'}
                width={36}
                bg={'colorPalette.500'}
                borderColor={'white'} borderWidth={3} borderRadius={'md'}
                shadow={'0px 0px 0px 3px var(--shadow-color)'}
                shadowColor={'colorPalette.500'}
                paddingTop={2} paddingBottom={2}
                fontWeight={'bold'}
                color={'white'}
                _hover={{
                    bg: 'colorPalette.400',
                    shadowColor: 'colorPalette.400'
                }}
                _disabled={{
                    opacity: 1,
                    bg: 'orange.400',
                    shadowColor: 'orange.400',
                    cursor: 'default'
                }}>
                <Center>
                    {children}
                </Center>
            </Button>
        )
    }
)

export default function Nav() {
    const router = useRouter();
    const pathname = usePathname();

    const LoginButton = () => {
        return (
            <Button
                variant={'solid'}
                colorPalette={'blue'}
                bg={'colorPalette.500'}
                borderColor={'colorPalette.600'} borderWidth={2}
                _hover={{
                    bg: 'colorPalette.400'
                }}
                size={'md'}
                paddingRight={6} paddingLeft={6}
                onClick={() => {
                    router.push('/login');
                }}>
                Login
            </Button>
        )
    }

    return (
        <>
            <Box bg={'colorPalette.100'} px={8} id={'background'} minW={1080} width={'vw'}
                position={'relative'} zIndex={1}
                boxShadow={'0px 0px 40px 40px var(--shadow-color)'} 
                shadowColor={'colorPalette.100'}>
                <Flex h={32} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack alignItems={'center'} gap={16}>
                        <Link href={'/'}>
                            <Image height={32} src={'../meowairline-logo.png'} alt={'Meow Airlines Logo'}/>
                        </Link>

                        <HStack gap={16}>
                            {/*
                                for testing the first navitem will be disabled
                            */}
                            <NavItem disabled>
                                Home
                            </NavItem>
                            <NavItem>
                                Flight
                            </NavItem>
                            <NavItem>
                                Booking
                            </NavItem>
                        </HStack>
                    </HStack>

                    <Flex alignItems={'center'} gap={8}>
                        {/*
                            conditional rendering to display either the Login button
                            or the client's username
                            not render at login or register page
                        */}
                        {pathname === '/login' || pathname === '/register' ? (
                            <></>
                        ) : (
                            <LoginButton />
                        )}
                            
                        {/*
                            conditional rendering to display avatar at home page
                            not in login or register page
                        */}
                        
                        <MenuRoot size={'md'}>
                            <MenuTrigger>
                                <Tooltip 
                                    content={'Account'}
                                    showArrow
                                    positioning={{
                                        offset: { mainAxis: 24 }
                                    }}
                                    contentProps={{
                                        css: {
                                            '--tooltip-bg': 'colors.colorPalette.500'
                                        }
                                    }}>
                                    <span>
                                        <Avatar src={'../avt-light.svg'} fallback={''} _hover={{cursor: 'pointer'}}/>
                                    </span>
                                </Tooltip>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem value={'settings'}>Settings</MenuItem>
                                <MenuItem value={'logout'}>Logout</MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}