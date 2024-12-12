import type { Metadata } from 'next'
import { Provider } from '@/components/ui/provider'
import { AuthProvider } from '@/providers/AuthProvider'
import { Theme } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'Meow Airlines',
  description: 'Created by Meow Airlines',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang='en' suppressHydrationWarning>
        <head>
          <link rel='icon' type='image/png' href='../meow-icon.png' />
        </head>
        <body>
            <Provider forcedTheme='light'>
              <Theme appearance='light' colorPalette={'blue'}>{children}</Theme>
            </Provider>
        </body>
      </html>
    </AuthProvider>
  )
}
