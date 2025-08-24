'use client'

import { useEffect, useState } from 'react'
import { Button } from "@workspace/ui/components/button"
import { createClient } from '@/lib/supabase/supabase'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <Button variant="outline" disabled>로딩 중...</Button>
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {user.email}
        </span>
        <Button variant="outline" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Link href="/auth/login">
        <Button variant="outline">로그인</Button>
      </Link>
      <Link href="/auth/signup">
        <Button>회원가입</Button>
      </Link>
    </div>
  )
}
