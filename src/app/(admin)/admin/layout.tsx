import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admin - Meow Airlines',
    description: 'Created by Meow Airlines',
  };

export default function AdminLayout({
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