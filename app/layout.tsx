
import type { Metadata } from 'next'
import Header from '@/components/header/Header'
import { Inter } from 'next/font/google'
import AuthSession from '@/components/AuthSession';
import '../scss/reset.modules.scss';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <AuthSession>
          <>
            <Header/>
            <main>
            {children}
            </main>
            <Footer/>
          </>
        </AuthSession>
      </body>
    </html>
  )
}
