import { Link, usePage } from '@inertiajs/react';
import { Bike, Heart, LogOut, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { logout, myBikes, profile, savedBikes } from '~/routes';

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth.user;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-bg/80 px-6 backdrop-blur-md lg:px-12">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-tight text-text">
                    Trocabikes
                </span>
            </Link>

            {user ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        data-testid="account-menu"
                        aria-label="Account menu"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border transition-colors hover:border-border-strong"
                    >
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <span className="text-sm font-semibold text-text">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </button>

                    {open && (
                        <div className="absolute top-full right-0 mt-2 w-48 rounded-sm border border-border bg-bg py-1 shadow-lg">
                            <Link
                                href={profile.url()}
                                data-testid="nav-profile"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-text transition-colors hover:bg-bg-subtle"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </Link>
                            <Link
                                href={myBikes.url()}
                                data-testid="nav-my-bikes"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-text transition-colors hover:bg-bg-subtle"
                            >
                                <Bike className="h-4 w-4" />
                                My Bikes
                            </Link>
                            <Link
                                href={savedBikes.url()}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-text transition-colors hover:bg-bg-subtle"
                            >
                                <Heart className="h-4 w-4" />
                                Saved Bikes
                            </Link>
                            <div className="my-1 border-t border-border" />
                            <Link
                                href={logout.url()}
                                method="post"
                                as="button"
                                data-testid="nav-logout"
                                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm text-text transition-colors hover:bg-bg-subtle"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <Link
                        href="/sign-in"
                        data-testid="nav-sign-in"
                        className="rounded-sm border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/sign-up"
                        data-testid="nav-sign-up"
                        className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </header>
    );
}
