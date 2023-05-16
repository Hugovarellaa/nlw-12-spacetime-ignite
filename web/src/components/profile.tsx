import { getUser } from '@/lib/auth'
import Image from 'next/image'

export function Profile() {
  const { name, avatarUrl } = getUser()
  return (
    <div className="transi flex items-center gap-3 text-left ">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <Image
          src={avatarUrl}
          alt="Image do usuário"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />
      </div>

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a href="#" className="block text-orange-400 hover:text-orange-700">
          Quero sair
        </a>
      </p>
    </div>
  )
}
