export default function Footer() {
    return (
        <footer className="border-t border-border bg-bg px-6 py-12 lg:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    <div className="col-span-2 lg:col-span-1">
                        <span className="mb-3 block text-base font-semibold text-text">
                            Trocabikes
                        </span>
                        <p className="text-sm text-text-muted">
                            The marketplace to buy and sell bikes in Portugal.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-text">
                            Marketplace
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-text-muted transition-colors hover:text-text"
                                >
                                    Browse bikes
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-text-muted transition-colors hover:text-text"
                                >
                                    Post a listing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-text-muted transition-colors hover:text-text"
                                >
                                    How it works
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-text">
                            Support
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-text-muted transition-colors hover:text-text"
                                >
                                    Help center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-text-muted transition-colors hover:text-text"
                                >
                                    Safety tips
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-text-muted transition-colors hover:text-text"
                                >
                                    Contact us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold text-text">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-text-muted transition-colors hover:text-text"
                                >
                                    Terms of service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-sm text-text-muted transition-colors hover:text-text"
                                >
                                    Privacy policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-text-muted lg:flex-row">
                    <p>&copy; 2026 Trocabikes. All rights reserved.</p>
                    <p>Made with care for cyclists.</p>
                </div>
            </div>
        </footer>
    );
}
