import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import { WalletProvider } from '@/lib/wallet-context'

import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'Nak3dCrypto - Exclusive Content, Decentralized Access',
  description:
    'Pay creators directly in ETH. No middlemen. No limits. The decentralized content platform for exclusive creator content.',
}

export const viewport: Viewport = {
  themeColor: '#15142c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased min-h-screen" suppressHydrationWarning>
        <WalletProvider>
        {children}
        </WalletProvider>
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(10, 14, 30, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(74, 194, 234, 0.2)',
              color: '#e0e8f0',
            },
          }}
        />
      </body>
    </html>
  )
}
