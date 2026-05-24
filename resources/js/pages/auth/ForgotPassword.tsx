import { Head, Link, Form } from '@inertiajs/react';

export default function ForgotPassword() {
    return (
        <>
            <Head title="Forgot password — Trocabikes" />

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
                            Forgot your password?
                        </h1>
                        <p className="text-sm text-text-muted">
                            No worries, we'll send you reset instructions.
                        </p>
                    </div>

                    <Form
                        action="/forgot-password"
                        method="post"
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
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        required
                                        className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    />
                                </div>

                                {errors.email && (
                                    <p className="text-xs text-error">
                                        {errors.email}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="mt-2 h-10 w-full rounded-sm bg-primary font-medium text-white transition-colors hover:bg-primary-hover"
                                    disabled={processing}
                                >
                                    Reset password
                                </button>

                                <p className="text-center text-sm">
                                    <Link
                                        href="/sign-in"
                                        className="text-text-muted transition-colors hover:text-primary"
                                    >
                                        Back to sign in
                                    </Link>
                                </p>
                            </>
                        )}
                    </Form>
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
        </>
    );
}