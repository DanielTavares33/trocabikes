import { Head, Link } from '@inertiajs/react';
import { Image } from 'lucide-react';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';

export default function Create() {
    return (
        <>
            <Head title="Sell your bike — Trocabikes" />

            <div className="flex min-h-screen flex-col bg-bg text-text">
                <Navbar />

                <main className="flex-1 px-6 py-10 lg:px-12">
                    <div className="mx-auto max-w-2xl">
                        <nav className="mb-2 text-sm text-text-muted">
                            <Link
                                href="/"
                                className="transition-colors hover:text-text"
                            >
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-text">Sell your bike</span>
                        </nav>

                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-text">
                                Sell your bike
                            </h1>
                            <p className="mt-1 text-text-muted">
                                Fill in the details below to list your bike on
                                the marketplace
                            </p>
                        </div>

                        <form className="flex flex-col gap-8">
                            <section className="rounded-sm border border-border bg-surface p-6">
                                <h2 className="mb-1 text-lg font-semibold text-text">
                                    Bike details
                                </h2>
                                <p className="mb-6 text-sm text-text-muted">
                                    Tell buyers about your bike
                                </p>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="title"
                                            className="text-sm font-medium text-text"
                                        >
                                            Title
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            placeholder="e.g. Canyon Spectral CF 7 — Full Suspension MTB"
                                            className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="brand"
                                                className="text-sm font-medium text-text"
                                            >
                                                Brand
                                            </label>
                                            <select
                                                id="brand"
                                                name="bike_brand_id"
                                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            >
                                                <option value="">
                                                    Select a brand
                                                </option>
                                                <option value="1">
                                                    Canyon
                                                </option>
                                                <option value="2">
                                                    Specialized
                                                </option>
                                                <option value="3">Trek</option>
                                                <option value="4">Giant</option>
                                                <option value="5">
                                                    Santa Cruz
                                                </option>
                                                <option value="6">
                                                    Cannondale
                                                </option>
                                                <option value="7">Orbea</option>
                                                <option value="8">Scott</option>
                                                <option value="9">
                                                    Merida
                                                </option>
                                                <option value="10">BH</option>
                                                <option value="11">
                                                    Ribble
                                                </option>
                                                <option value="12">Kona</option>
                                                <option value="13">CUBE</option>
                                                <option value="14">
                                                    Decathlon
                                                </option>
                                                <option value="15">
                                                    Other
                                                </option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="category"
                                                className="text-sm font-medium text-text"
                                            >
                                                Category
                                            </label>
                                            <select
                                                id="category"
                                                name="bike_category_id"
                                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            >
                                                <option value="">
                                                    Select a category
                                                </option>
                                                <option value="1">
                                                    Mountain Bike
                                                </option>
                                                <option value="2">
                                                    Road Bike
                                                </option>
                                                <option value="3">
                                                    City Bike
                                                </option>
                                                <option value="4">
                                                    E-Bike
                                                </option>
                                                <option value="5">
                                                    Kids Bike
                                                </option>
                                                <option value="6">BMX</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="condition"
                                                className="text-sm font-medium text-text"
                                            >
                                                Condition
                                            </label>
                                            <select
                                                id="condition"
                                                name="condition"
                                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            >
                                                <option value="">
                                                    Select condition
                                                </option>
                                                <option value="new">
                                                    Nova
                                                </option>
                                                <option value="excellent">
                                                    Excelente
                                                </option>
                                                <option value="good">
                                                    Boa
                                                </option>
                                                <option value="fair">
                                                    Regular
                                                </option>
                                                <option value="used">
                                                    Usada
                                                </option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="frame_material"
                                                className="text-sm font-medium text-text"
                                            >
                                                Frame material
                                            </label>
                                            <select
                                                id="frame_material"
                                                name="frame_material"
                                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            >
                                                <option value="">
                                                    Select material
                                                </option>
                                                <option value="aluminum">
                                                    Aluminum
                                                </option>
                                                <option value="carbon">
                                                    Carbon
                                                </option>
                                                <option value="steel">
                                                    Steel
                                                </option>
                                                <option value="titanium">
                                                    Titanium
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="description"
                                            className="text-sm font-medium text-text"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={4}
                                            placeholder="Describe your bike's condition, upgrades, history, and why you're selling..."
                                            className="w-full resize-y rounded-sm border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-sm border border-border bg-surface p-6">
                                <h2 className="mb-1 text-lg font-semibold text-text">
                                    Bike specs
                                </h2>
                                <p className="mb-6 text-sm text-text-muted">
                                    Technical details about your bike
                                </p>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="year"
                                            className="text-sm font-medium text-text"
                                        >
                                            Year
                                        </label>
                                        <input
                                            id="year"
                                            type="number"
                                            name="year"
                                            min={1990}
                                            max={2026}
                                            placeholder="2024"
                                            className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="size"
                                            className="text-sm font-medium text-text"
                                        >
                                            Size
                                        </label>
                                        <input
                                            id="size"
                                            type="text"
                                            name="size"
                                            placeholder="e.g. M, 54cm"
                                            className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="kilometers"
                                            className="text-sm font-medium text-text"
                                        >
                                            Kilometers
                                        </label>
                                        <input
                                            id="kilometers"
                                            type="number"
                                            name="kilometers"
                                            min={0}
                                            placeholder="0"
                                            className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-sm border border-border bg-surface p-6">
                                <h2 className="mb-1 text-lg font-semibold text-text">
                                    Pricing & location
                                </h2>
                                <p className="mb-6 text-sm text-text-muted">
                                    Set your price and where the bike is located
                                </p>

                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="price"
                                            className="text-sm font-medium text-text"
                                        >
                                            Price (€)
                                        </label>
                                        <div className="relative">
                                            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-text-muted">
                                                €
                                            </span>
                                            <input
                                                id="price"
                                                type="number"
                                                name="price"
                                                min={0}
                                                step="0.01"
                                                placeholder="0.00"
                                                className="h-10 w-full rounded-sm border border-border bg-bg pr-3 pl-8 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="district"
                                                className="text-sm font-medium text-text"
                                            >
                                                District
                                            </label>
                                            <input
                                                id="district"
                                                type="text"
                                                name="district"
                                                placeholder="e.g. Lisboa"
                                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <label
                                                htmlFor="city"
                                                className="text-sm font-medium text-text"
                                            >
                                                City
                                            </label>
                                            <input
                                                id="city"
                                                type="text"
                                                name="city"
                                                placeholder="e.g. Oeiras"
                                                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-sm border border-border bg-surface p-6">
                                <h2 className="mb-1 text-lg font-semibold text-text">
                                    Photos
                                </h2>
                                <p className="mb-6 text-sm text-text-muted">
                                    Add up to 10 photos of your bike
                                </p>

                                <div className="flex cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-border-strong bg-bg px-6 py-12 transition-colors hover:border-primary hover:bg-bg-subtle">
                                <Image
                                    width={40}
                                    height={40}
                                    className="mb-3 text-text-muted"
                                    strokeWidth={1.5}
                                />
                                    <p className="mb-1 text-sm font-medium text-text">
                                        Click to upload photos
                                    </p>
                                    <p className="text-xs text-text-muted">
                                        PNG, JPG or WEBP (max 10MB each)
                                    </p>
                                </div>
                            </section>

                            <section className="rounded-sm border border-border bg-surface p-6">
                                <h2 className="mb-1 text-lg font-semibold text-text">
                                    Contact & submit
                                </h2>
                                <p className="mb-6 text-sm text-text-muted">
                                    Choose your contact preferences
                                </p>

                                <div className="flex flex-col gap-6">
                                    <div className="flex items-start gap-2">
                                        <input
                                            id="phone_visible"
                                            type="checkbox"
                                            name="phone_visible"
                                            className="mt-0.5 h-4 w-4 rounded-sm border border-border bg-bg accent-primary"
                                        />
                                        <label
                                            htmlFor="phone_visible"
                                            className="text-sm text-text-muted"
                                        >
                                            Show your phone number on the
                                            listing so buyers can call you
                                            directly
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="h-10 w-full rounded-sm bg-primary font-medium text-white transition-colors hover:bg-primary-hover"
                                    >
                                        Publish listing
                                    </button>

                                    <p className="text-center text-xs text-text-subtle">
                                        By publishing, you agree to our{' '}
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
                                    </p>
                                </div>
                            </section>
                        </form>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
