import type { Metadata } from 'next'
import './globals.css'
import CustomNextUIProvider from "@/providers/CustomNextUIProvider";

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
// className={inter.className}

export const metadata: Metadata = {
  title: 'Coding Challange',
  description: 'by Peter Vavro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className='dark'>
      <body>
        <CustomNextUIProvider>
          <div className="container mx-auto py-12">{children}</div>
        </CustomNextUIProvider>
      </body>
    </html>
  )
}
