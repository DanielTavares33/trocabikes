import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function SignUp() {
    return (
        <>
            <Head title="Create account — Trocabikes" />

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
                            Create your account
                        </h1>
                        <p className="text-sm text-text-muted">
                            Join the marketplace and start buying or selling
                            bikes
                        </p>
                    </div>

                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-text"
                            >
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                autoComplete="name"
                                placeholder="Your full name"
                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                            />
                        </div>

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
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-text"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                placeholder="At least 8 characters"
                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                id="terms"
                                type="checkbox"
                                name="terms"
                                className="mt-0.5 h-4 w-4 rounded-sm border border-border bg-bg accent-primary"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-text-muted"
                            >
                                I agree to the{' '}
                                <Link
                                    href="/terms"
                                    className="font-medium text-primary transition-colors hover:text-primary-hover"
                                >
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="/privacy"
                                    className="font-medium text-primary transition-colors hover:text-primary-hover"
                                >
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="mt-2 h-10 w-full rounded-sm bg-primary font-medium text-white transition-colors hover:bg-primary-hover"
                        >
                            Create account
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col gap-3">
                        <div className="relative flex items-center justify-center">
                            <span className="absolute inset-x-0 border-t border-border" />
                            <span className="relative bg-surface px-3 text-xs text-text-muted">
                                or continue with
                            </span>
                        </div>

                        <button className="flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-border text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle">
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
                        </button>
                    </div>
                </div>

                <p className="mt-6 text-sm text-text-muted">
                    Already have an account?{' '}
                    <Link
                        href="/signin"
                        className="font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </>
    );
}
