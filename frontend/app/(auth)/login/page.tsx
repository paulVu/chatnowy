/* eslint-disable */
"use client";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

import Button from "@/lib/components/ui/Button";
import Card from "@/lib/components/ui/Card";
import { Divider } from "@/lib/components/ui/Divider";
import Field from "@/lib/components/ui/Field";
import PageHeading from "@/lib/components/ui/PageHeading";
import { useSupabase } from "@/lib/context/SupabaseProvider";

import { useEventTracking } from "@/services/analytics/useEventTracking";
import { GoogleLoginButton } from "./components/GoogleLogin";
import { MagicLinkLogin } from "./components/MagicLinkLogin";
import { PasswordForgotten } from "./components/PasswordForgotten";
import { useLogin } from "./hooks/useLogin";

export default function Login() {
  const { session } = useSupabase();
  const { track } = useEventTracking();
  const { handleLogin, setEmail, setPassword, email, isPending, password } =
    useLogin();

  const params = useSearchParams();
  const previousPage = params?.get("previous-page");

  if (session?.user !== undefined) {
    void track("SIGNED_IN");
    if (previousPage === undefined || previousPage === null) {
      redirect("/upload");
    } else {
      redirect(previousPage);
    }
  }

  return (
    <main>
      <section className="w-full min-h-[80vh] h-full outline-none flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="Đăng nhập" subtitle="Chào mừng bạn trở lại" />
        <Card className="max-w-md w-full p-5 sm:p-10 text-left">
          <form
            data-testid="sign-in-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col items-center justify-center mt-2 gap-2">
              <GoogleLoginButton />
            </div>

            <Divider text="or" />

            <Field
              name="email"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Field
              name="password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
            />

            <div className="flex flex-col items-center justify-center mt-2 gap-2">
              <Button type="submit" isLoading={isPending}>
                Đăng nhập
              </Button>
              <MagicLinkLogin email={email} setEmail={setEmail} />
              <Divider text="or" />
              
              <PasswordForgotten setEmail={setEmail} email={email} />

              <Link href="/signup">Bạn không có tài khoản? Vui lòng tạo tài khoản ở đây</Link>
            </div>

            
            
            
            
          </form>
        </Card>
      </section>
    </main>
  );
}
