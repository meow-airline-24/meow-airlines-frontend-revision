import { Flex } from '@chakra-ui/react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import RegisterForm from '@/components/layout/RegisterForm'

export default function Register() {
    return (
        <Flex height={'100vh'} direction={'column'} justify={'space-between'}>
            <NavBar />
            <RegisterForm />
            <Footer />
        </Flex>
    )
}