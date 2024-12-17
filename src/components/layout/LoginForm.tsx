'use client'

import { Box, Flex, Heading, Link, Image, Input, VStack, HStack, Text } from '@chakra-ui/react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { InputGroup } from '@/components/ui/input-group'
import { PasswordInput } from '@/components/ui/password-input'
import { LuMail, LuLock } from 'react-icons/lu'

export default function LoginForm() {
    const errorTexts = {
        noError: '',
        missingValue: 'This field is required',
        invalidMail: 'This email is invalid',
        passwordShort: 'Password must have at least 8 characters'
    }

    return (
        <>
            <Flex width={'vw'} minWidth={1080} marginTop={'80px'} align={'center'} justify={'center'}>
                <Box bg={'white'} width={400} minW={400} borderRadius={8} paddingLeft={8} paddingRight={8} paddingBottom={3}
                    shadow={'0px 0px 8px -4px var(--shadow-color)'}
                    shadowColor={'black'}>
                    <VStack>
                        <Image src={'../meowairline-logo.png'} height={32}/>
                        <Heading fontSize={'2xl'} color={'colorPalette.700'} position={'relative'} bottom={4}>Login to Meow Airlines</Heading>
                        <VStack as={'form'} id={'login-form'} gap={4} width={'100%'}>
                            {/* 
                                Change errorText based on error 
                                invalid property makes the outline red    
                            */}
                            <Field label={'Email address'} invalid={false} errorText={errorTexts.noError}>
                                <InputGroup width={'inherit'} startElement={<LuMail />}>
                                    <Input type={'email'} placeholder={'example@email.com'} required></Input>
                                </InputGroup>
                            </Field>
                            <Field label={'Password'} invalid={false} errorText={errorTexts.noError}>
                                {/* password length in range(8, 32) */}
                                <InputGroup width={'inherit'} startElement={<LuLock />}>
                                    <PasswordInput placeholder={'Your password'} maxLength={32} required></PasswordInput>
                                </InputGroup>
                            </Field>
                            <HStack width={'inherit'} justify={'space-between'}>
                                <Checkbox cursor={'pointer'}>Remember me</Checkbox>
                                <Text fontSize={'sm'} color={'colorPalette.700'} cursor={'pointer'}>Forgot password?</Text>
                            </HStack>
                            <Button width={'inherit'} type={'submit'} formNoValidate
                                paddingTop={5} paddingBottom={5}
                                fontSize={'lg'}
                                borderColor={'colorPalette.600'} borderWidth={2}
                                _hover={{
                                    bg: 'colorPalette.400',
                                    borderColor: 'colorPalette.500'
                                }}>
                                Login
                            </Button>
                        </VStack>
                        <HStack fontSize={'sm'} marginTop={2}>
                            <Text>Don't have an account?</Text>
                            <Link href={'/register'}>Register</Link>
                        </HStack>
                    </VStack>
                </Box>
            </Flex>
        </>
    )
}