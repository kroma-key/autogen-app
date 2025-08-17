import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export const metadata = {
  title: 'About - Pixel Market',
  description: 'Pixel Market에 대한 정보',
}

export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">About Page</h1>
        <p className="text-gray-600">이것은 App Router의 페이지 예시입니다.</p>
        <Link href="/">
          <Button size="sm">홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  )
}
