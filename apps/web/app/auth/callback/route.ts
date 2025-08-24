import { createClient } from '@/lib/supabase/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const redirectUrl = forwardedHost 
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`
      return NextResponse.redirect(redirectUrl)
    }
  }

  // return the user to an error page with instructions
  const forwardedHost = request.headers.get('x-forwarded-host')
  const redirectUrl = forwardedHost 
    ? `https://${forwardedHost}/auth/auth-code-error`
    : `${origin}/auth/auth-code-error`
  return NextResponse.redirect(redirectUrl)
}
