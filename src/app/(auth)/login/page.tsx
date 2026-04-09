import { LoginForm } from "./login-form";

export const metadata = { title: "Sign In | CloudOptix" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirectTo?: string }>;
}) {
  // Next.js 16: searchParams is a Promise
  const { error, redirectTo } = await searchParams;

  return <LoginForm oauthError={error} redirectTo={redirectTo} />;
}
