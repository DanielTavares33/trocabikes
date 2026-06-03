import { Head, Link, Form } from '@inertiajs/react';
import { Mail, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';

interface VerifyEmailProps {
    email: string;
}

export default function VerifyEmail({ email }: Readonly<VerifyEmailProps>) {
    return (
        <Layout>
            <Head title="Verify your email — Trocabikes" />

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
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <h1 className="mb-1 text-xl font-semibold text-text">
                            Check your email
                        </h1>
                        <p className="text-sm text-text-muted">
                            We've sent a verification link to{' '}
                            <span className="font-medium text-text">
                                {email}
                            </span>
                        </p>
                    </div>

                    <div className="rounded-sm border border-border bg-bg-subtle p-3">
                        <p className="text-sm text-text-muted">
                            Click the link in the email to verify your account.
                            If you didn't receive the email, we can send another
                            one.
                        </p>
                    </div>

                    <Form
                        action="/email/verification-notification"
                        method="post"
                        className="mt-6"
                    >
                        {({ errors, processing }) => (
                            <>
                                <input
                                    type="hidden"
                                    name="email"
                                    value={email}
                                />
                                {errors.message && (
                                    <div className="mb-3 rounded-sm border border-error/50 bg-error/10 p-3">
                                        <p className="text-xs text-error">
                                            {errors.message}
                                        </p>
                                    </div>
                                )}
                                <Link
                                    href="/email/verification-notification"
                                    method="post"
                                    type="submit"
                                    className="flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-primary font-medium text-white transition-colors hover:bg-primary-hover"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            Resend verification email
                                            <ArrowRight size={16} />
                                        </>
                                    )}
                                </Link>
                            </>
                        )}
                    </Form>
                </div>

                <div className="mt-6 flex flex-col items-center gap-2">
                    <p className="text-sm text-text-muted">
                        Wrong email address?{' '}
                        <Link
                            href="/logout"
                            method="post"
                            className="font-medium text-primary transition-colors hover:text-primary-hover"
                        >
                            Sign out
                        </Link>{' '}
                        and create a new account
                    </p>
                </div>
            </div>
        </Layout>
    );
}
