import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Booking - Meow Airlines',
    description: 'Created by Meow Airlines',
  };

export default function BookingLayout({
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