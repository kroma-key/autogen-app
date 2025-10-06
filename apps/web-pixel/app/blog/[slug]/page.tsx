import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params;
  return {
    title: `Blog Post - ${slug}`,
    description: `블로그 포스트: ${slug}`,
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">블로그 포스트</h1>
        <p className="text-gray-600">슬러그: {slug}</p>
        <div className="flex gap-2">
          <Link href="/">
            <Button size="sm">홈으로</Button>
          </Link>
          <Link href="/blog">
            <Button size="sm" variant="outline">
              블로그 목록
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
