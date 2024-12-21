import { Flex } from '@chakra-ui/react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import LoginForm from '@/components/layout/LoginForm'

export default function Login() {
    return (
        <Flex height={'100vh'} direction={'column'} justify={'space-between'}>
            <NavBar />
            <LoginForm />
            <Footer />
        </Flex>
    )
}