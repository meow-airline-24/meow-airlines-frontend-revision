import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Flight - Meow Airlines',
    description: 'Created by Meow Airlines',
  };

export default function FlightLayout({
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