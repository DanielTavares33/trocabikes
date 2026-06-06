import { Form, Head } from '@inertiajs/react';
import {
    Camera,
    User as UserIcon,
    Mail,
    Phone,
    MessageCircle,
    MapPin,
    FileText,
} from 'lucide-react';
import { useState } from 'react';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';
import type { User } from '~/types/auth';

interface Props {
    user: Readonly<User>;
}

export default function Profile({ user }: Readonly<Props>) {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(
        user.avatar ?? null,
    );

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Layout>
            <Head title="Profile — Trocabikes" />

            <div className="flex min-h-screen flex-col bg-bg text-text">
                <Navbar />

                <main className="flex-1 px-6 py-10 lg:px-12">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-text">
                                Profile Settings
                            </h1>
                            <p className="mt-1 text-text-muted">
                                Manage your account information and preferences
                            </p>
                        </div>

                        <Form
                            action="/profile"
                            method="post"
                            encType="multipart/form-data"
                            className="flex flex-col gap-8"
                        >
                            {({ errors, processing }) => (
                                <>
                                    {/* Avatar Section */}
                                    <section className="rounded-sm border border-border bg-surface p-6">
                                        <h2 className="mb-1 text-lg font-semibold text-text">
                                            Profile Photo
                                        </h2>
                                        <p className="mb-6 text-sm text-text-muted">
                                            Upload a profile photo or use your
                                            initials
                                        </p>

                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                {avatarPreview ? (
                                                    <img
                                                        src={avatarPreview}
                                                        alt={user.name}
                                                        className="h-24 w-24 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-white">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                )}
                                                <label
                                                    htmlFor="avatar"
                                                    className="hover:bg-text-hover absolute right-0 bottom-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-text text-bg"
                                                >
                                                    <Camera
                                                        width={14}
                                                        height={14}
                                                    />
                                                </label>
                                                <input
                                                    id="avatar"
                                                    type="file"
                                                    name="avatar"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={
                                                        handleAvatarChange
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-text">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-text-muted">
                                                    PNG, JPG or WEBP (max 2MB)
                                                </p>
                                                {errors.avatar && (
                                                    <p className="mt-1 text-xs text-red-600">
                                                        {errors.avatar}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Personal Information */}
                                    <section className="rounded-sm border border-border bg-surface p-6">
                                        <h2 className="mb-1 text-lg font-semibold text-text">
                                            Personal Information
                                        </h2>
                                        <p className="mb-6 text-sm text-text-muted">
                                            Your basic profile details
                                        </p>

                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="name"
                                                    className="flex items-center gap-2 text-sm font-medium text-text"
                                                >
                                                    <UserIcon
                                                        width={16}
                                                        height={16}
                                                    />
                                                    Name
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    defaultValue={user.name}
                                                    placeholder="Your name"
                                                    className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                                />
                                                {errors.name && (
                                                    <p className="text-xs text-red-600">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="email"
                                                    className="flex items-center gap-2 text-sm font-medium text-text"
                                                >
                                                    <Mail
                                                        width={16}
                                                        height={16}
                                                    />
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    defaultValue={user.email}
                                                    placeholder="your@email.com"
                                                    className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                                />
                                                {errors.email && (
                                                    <p className="text-xs text-red-600">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="bio"
                                                    className="flex items-center gap-2 text-sm font-medium text-text"
                                                >
                                                    <FileText
                                                        width={16}
                                                        height={16}
                                                    />
                                                    Bio
                                                </label>
                                                <textarea
                                                    id="bio"
                                                    name="bio"
                                                    rows={3}
                                                    defaultValue={
                                                        user.bio ?? ''
                                                    }
                                                    placeholder="Tell others about yourself..."
                                                    className="w-full resize-y rounded-sm border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                                />
                                                {errors.bio && (
                                                    <p className="text-xs text-red-600">
                                                        {errors.bio}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Contact Information */}
                                    <section className="rounded-sm border border-border bg-surface p-6">
                                        <h2 className="mb-1 text-lg font-semibold text-text">
                                            Contact Information
                                        </h2>
                                        <p className="mb-6 text-sm text-text-muted">
                                            How buyers can reach you
                                        </p>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="phone"
                                                    className="flex items-center gap-2 text-sm font-medium text-text"
                                                >
                                                    <Phone
                                                        width={16}
                                                        height={16}
                                                    />
                                                    Phone
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    name="phone"
                                                    defaultValue={
                                                        user.phone ?? ''
                                                    }
                                                    placeholder="+351 912 345 678"
                                                    className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                                />
                                                {errors.phone && (
                                                    <p className="text-xs text-red-600">
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="whatsapp"
                                                    className="flex items-center gap-2 text-sm font-medium text-text"
                                                >
                                                    <MessageCircle
                                                        width={16}
                                                        height={16}
                                                    />
                                                    WhatsApp
                                                </label>
                                                <input
                                                    id="whatsapp"
                                                    type="tel"
                                                    name="whatsapp"
                                                    defaultValue={
                                                        user.whatsapp ?? ''
                                                    }
                                                    placeholder="+351 912 345 678"
                                                    className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                                />
                                                {errors.whatsapp && (
                                                    <p className="text-xs text-red-600">
                                                        {errors.whatsapp}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Location */}
                                    <section className="rounded-sm border border-border bg-surface p-6">
                                        <h2 className="mb-1 text-lg font-semibold text-text">
                                            Location
                                        </h2>
                                        <p className="mb-6 text-sm text-text-muted">
                                            Where you're based
                                        </p>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="district"
                                                    className="flex items-center gap-2 text-sm font-medium text-text"
                                                >
                                                    <MapPin
                                                        width={16}
                                                        height={16}
                                                    />
                                                    District
                                                </label>
                                                <input
                                                    id="district"
                                                    type="text"
                                                    name="district"
                                                    defaultValue={
                                                        user.district ?? ''
                                                    }
                                                    placeholder="e.g. Lisboa"
                                                    className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                                />
                                                {errors.district && (
                                                    <p className="text-xs text-red-600">
                                                        {errors.district}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <label
                                                    htmlFor="city"
                                                    className="flex items-center gap-2 text-sm font-medium text-text"
                                                >
                                                    <MapPin
                                                        width={16}
                                                        height={16}
                                                    />
                                                    City
                                                </label>
                                                <input
                                                    id="city"
                                                    type="text"
                                                    name="city"
                                                    defaultValue={
                                                        user.city ?? ''
                                                    }
                                                    placeholder="e.g. Oeiras"
                                                    className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                                />
                                                {errors.city && (
                                                    <p className="text-xs text-red-600">
                                                        {errors.city}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </section>

                                    {/* Submit */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
                                        >
                                            {processing
                                                ? 'Saving...'
                                                : 'Save Changes'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </main>

                <Footer />
            </div>
        </Layout>
    );
}
