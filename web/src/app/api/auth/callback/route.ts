import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url!)
  const code = searchParams.get('code')

  const sessionResponse = await api.post('/sessions', {
    code,
  })

  const { token } = sessionResponse.data

  const redirectTo = request.cookies.get('redirectTo')?.value
  const redirectUrl = redirectTo ?? new URL('/', request.url)

  const cookieExpiresInSecond = 60 * 60 * 24 * 30 // 30 days

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSecond}`,
    },
  })
}
