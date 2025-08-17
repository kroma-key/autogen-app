import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export const metadata = {
  title: 'Blog - Pixel Market',
  description: '블로그 포스트 목록',
}

const blogPosts = [
  { slug: 'first-post', title: '첫 번째 포스트' },
  { slug: 'second-post', title: '두 번째 포스트' },
  { slug: 'third-post', title: '세 번째 포스트' },
]

export default function BlogPage() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-bold">블로그</h1>
        <div className="flex flex-col gap-2">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Button variant="outline" className="w-full">
                {post.title}
              </Button>
            </Link>
          ))}
        </div>
        <Link href="/">
          <Button size="sm">홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  )
}
