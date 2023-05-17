import decode from 'jwt-decode'
import { cookies } from 'next/headers'

interface Data {
  user: {
    name: string
    avatarUrl: string
  }
  sub: string
}

interface UserInfo {
  name: string
  avatarUrl: string
  sub: string
}

export function getUser(): UserInfo {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated.')
  }

  const data: Data = decode(token)

  const userInfo: UserInfo = {
    sub: data.sub,
    name: data.user.name,
    avatarUrl: data.user.avatarUrl,
  }

  return userInfo
}
