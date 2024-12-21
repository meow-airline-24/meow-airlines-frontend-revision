import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'My Booking - Meow Airlines',
    description: 'Created by Meow Airlines',
  };

export default function MyBookingLayout({
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