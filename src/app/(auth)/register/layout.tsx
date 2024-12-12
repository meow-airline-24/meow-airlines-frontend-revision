import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Register - Meow Airlines',
    description: 'Created by Meow Airlines',
  };

export default function RegisterLayout({
    children,
} : Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    )
}