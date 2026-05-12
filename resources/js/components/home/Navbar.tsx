import { Link } from '@inertiajs/react';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-bg/80 px-6 backdrop-blur-md lg:px-12">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tight text-text">
                    Trocabikes
                </span>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
                <Link
                    href="/browse"
                    className="text-sm font-medium text-text-muted transition-colors hover:text-text"
                >
                    Browse
                </Link>
                <Link
                    href="#"
                    className="text-sm font-medium text-text-muted transition-colors hover:text-text"
                >
                    How it works
                </Link>
            </nav>

            <div className="flex items-center gap-3">
                <Link
                    href="/signin"
                    className="rounded-sm border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
                >
                    Sign in
                </Link>
                <Link
                    href="#"
                    className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                    Post a listing
                </Link>
            </div>
        </header>
    );
}
