import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Test - Meow Airlines',
    description: 'Created by Meow Airlines',
  };

export default function TestLayout({
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