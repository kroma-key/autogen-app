import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import AuthButton from "@/components/auth-button"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p className="text-gray-600">Next.js App Router 예시</p>
        
        <AuthButton />
        <div className="flex flex-col gap-2">
          <Link href="/about">
            <Button variant="outline">About 페이지</Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline">블로그 목록</Button>
          </Link>
          <Link href="/market">
            <Button variant="outline">Market 페이지</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline">로그인</Button>
          </Link>
          <Link href="/auth/signup">
            <Button variant="outline">회원가입</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
