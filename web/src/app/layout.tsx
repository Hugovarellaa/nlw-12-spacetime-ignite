import { Blur } from '@/components/Blur'
import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { Stripes } from '@/components/Stripes'
import { Profile } from '@/components/profile'
import {
  Bai_Jamjuree as Baijamjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

import './globals.css'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const baiJamjuree = Baijamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e Typescript.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="bg-cover grid min-h-screen grid-cols-2 bg-[url(../assets/bg-stars.svg)]">
          {/* Left */}

          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-gray-100/10 px-28 py-16">
            <Blur />
            <Stripes />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />
            <Copyright />
          </div>

          {/* Right */}
          <div className="bg-cover flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)]">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
