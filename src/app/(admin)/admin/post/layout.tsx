import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Post Admin - Meow Airlines',
    description: 'Created by Meow Airlines',
  };

export default function AdminPostLayout({
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