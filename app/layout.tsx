
import './globals.css'
import type { Metadata } from 'next'
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico'
})

export const metadata: Metadata = {
  title: 'REWA DOWNHOOD - Custom Hood Printing',
  description: 'Create your own custom hoodies and apparel with REWA DOWNHOOD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${pacifico.variable} scrollbar-hide`}>
      <body className="scrollbar-hide overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
