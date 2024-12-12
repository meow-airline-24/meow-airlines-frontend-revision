import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login - Meow Airlines",
    description: "Created by Meow Airlines",
  };

export default function LoginLayout({
    children,
} : Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}