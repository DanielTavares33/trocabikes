import { Head, Link, Form } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Layout>
      <Head title="Sign in — Trocabikes" />

      <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-12">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-text"
          >
            Trocabikes
          </Link>
        </div>

        <div className="w-full max-w-sm rounded-sm border border-border bg-surface p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-xl font-semibold text-text">
              Welcome back
            </h1>
            <p className="text-sm text-text-muted">
              Sign in to your account to continue
            </p>
          </div>

          <Form
            action="/sign-in"
            method="post"
            data-testid="sign-in-form"
            className="flex flex-col gap-4"
          >
            {({ errors, processing }) => (
              <>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-text"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    data-testid="sign-in-email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-text"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      data-testid="sign-in-password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-text-muted"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-xs text-error">{errors.email}</p>
                )}
                {errors.message && (
                  <p className="text-xs text-error">{errors.message}</p>
                )}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    name="remember"
                    className="h-4 w-4 rounded-sm border border-border bg-bg accent-primary"
                  />
                  <label htmlFor="remember" className="text-sm text-text-muted">
                    Keep me signed in
                  </label>
                </div>
                <button
                  type="submit"
                  data-testid="sign-in-submit"
                  className="mt-2 h-10 w-full rounded-sm bg-primary font-medium text-white transition-colors hover:bg-primary-hover"
                  disabled={processing}
                >
                  Sign in
                </button>
                <p className="text-center text-sm">
                  <Link
                    href="/forgot-password"
                    className="text-text-muted transition-colors hover:text-primary"
                  >
                    Forgot your password?
                  </Link>
                </p>
              </>
            )}
          </Form>

          <div className="mt-6 flex flex-col gap-3">
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-x-0 border-t border-border" />
              <span className="relative bg-surface px-3 text-xs text-text-muted">
                or continue with
              </span>
            </div>

            <a
              href="/auth/google/redirect"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-border text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </a>
          </div>
        </div>

        <p className="mt-6 text-sm text-text-muted">
          Don't have an account?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-primary transition-colors hover:text-primary-hover"
          >
            Create one
          </Link>
        </p>
      </div>
    </Layout>
  );
}
