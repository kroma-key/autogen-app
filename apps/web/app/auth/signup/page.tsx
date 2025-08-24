"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@workspace/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { loading, error, signUp, signInWithOAuth, clearError } =
    useAuthActions();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (password !== confirmPassword) {
      // 에러 처리는 useAuthActions에서 관리되므로 여기서는 단순히 return
      return;
    }

    if (password.length < 6) {
      // 에러 처리는 useAuthActions에서 관리되므로 여기서는 단순히 return
      return;
    }

    const success = await signUp(email, password);
    if (success) {
      setSuccess(true);
    }
  };

  const handleGoogleSignup = async () => {
    clearError();
    await signInWithOAuth("google");
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-svh p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">이메일 확인</CardTitle>
            <CardDescription className="text-center">
              가입해주셔서 감사합니다!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>
                이메일 주소로 확인 링크를 보냈습니다. 이메일을 확인하여 계정을
                활성화해주세요.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full"
              onClick={() => router.push("/auth/login")}
            >
              로그인 페이지로 이동
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-svh p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">회원가입</CardTitle>
          <CardDescription className="text-center">
            새 계정을 만드세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "회원가입 중..." : "회원가입"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                또는
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            Google로 회원가입
          </Button>

          <div className="text-center text-sm">
            이미 계정이 있으신가요?{" "}
            <Link href="/auth/login" className="underline">
              로그인
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
