import { Blur } from '@/components/Blur'
import { Copyright } from '@/components/Copyright'
import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { Stripes } from '@/components/Stripes'
import { Profile } from '@/components/profile'
import { cookies } from 'next/headers'

export default function Home() {
  const isAuthenticated = cookies().has('token')

  return (
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
      <div className="bg-cover flex flex-col bg-[url(../assets/bg-stars.svg)] p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
