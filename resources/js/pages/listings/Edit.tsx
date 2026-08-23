import { Head, Link, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';
import ListingForm from '~/components/listings/ListingForm';
import type {ListingFormData} from '~/components/listings/ListingForm';

interface EditProps {
    listing: {
        id: number;
        slug: string;
        title: string;
        bike_brand_id: number;
        bike_category_id: number;
        description: string;
        price: number;
        condition: string;
        year: number;
        size: string;
        frame_material: string;
        kilometers: string | null;
        district: string;
        city: string;
        phone_visible: boolean;
        images: { id: number; url: string }[];
    };
    brands: { id: number; name: string }[];
    categories: { id: number; name: string }[];
    conditions: { value: string; label: string }[];
    frameMaterials: { value: string; label: string }[];
}

export default function Edit({
    listing,
    brands,
    categories,
    conditions,
    frameMaterials,
}: Readonly<EditProps>) {
    const { data, setData, post, processing, errors } = useForm({
        title: listing.title,
        bike_brand_id: String(listing.bike_brand_id),
        bike_category_id: String(listing.bike_category_id),
        description: listing.description,
        price: String(listing.price),
        condition: listing.condition,
        year: String(listing.year),
        size: listing.size,
        frame_material: listing.frame_material,
        kilometers: listing.kilometers ?? '',
        district: listing.district,
        city: listing.city,
        phone_visible: listing.phone_visible,
        photos: [] as File[],
        removed_photo_ids: [] as number[],
        _method: 'put',
    });
    const [photos, setPhotos] = useState<File[]>([]);
    const [removedPhotoIds, setRemovedPhotoIds] = useState<number[]>([]);
    const photoPreviews = useMemo(
        () => photos.map((file) => URL.createObjectURL(file)),
        [photos],
    );

    useEffect(() => {
        setData('photos', photos);
    }, [photos, setData]);

    useEffect(() => {
        setData('removed_photo_ids', removedPhotoIds);
    }, [removedPhotoIds, setData]);

    useEffect(() => {
        return () => {
            photoPreviews.forEach((preview) => URL.revokeObjectURL(preview));
        };
    }, [photoPreviews]);

    const handleChange = (
        field: keyof ListingFormData,
        value: string | boolean,
    ) => {
        setData(field, value as never);
    };

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        post(`/listings/${listing.slug}`, { forceFormData: true });
    };

    return (
        <Layout>
            <Head title={`Edit ${listing.title} — Trocabikes`} />

            <div className="flex min-h-screen flex-col bg-bg text-text">
                <Navbar />

                <main className="flex-1 px-6 py-10 lg:px-12">
                    <div className="mx-auto max-w-2xl">
                        <nav className="mb-2 text-sm text-text-muted">
                            <Link
                                href="/my-bikes"
                                className="transition-colors hover:text-text"
                            >
                                My bikes
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-text">Edit listing</span>
                        </nav>

                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold text-text">
                                Edit listing
                            </h1>
                            <p className="mt-1 text-text-muted">
                                Update your listing details
                            </p>
                        </div>

                        <ListingForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            brands={brands}
                            categories={categories}
                            conditions={conditions}
                            frameMaterials={frameMaterials}
                            photos={photos}
                            photoPreviews={photoPreviews}
                            existingImages={listing.images}
                            removedPhotoIds={removedPhotoIds}
                            onChange={handleChange}
                            onPhotosChange={setPhotos}
                            onRemovePhoto={(index) =>
                                setPhotos((current) =>
                                    current.filter((_, i) => i !== index),
                                )
                            }
                            onRemoveExistingPhoto={(id) =>
                                setRemovedPhotoIds((current) => [...current, id])
                            }
                            onSubmit={handleSubmit}
                            submitLabel="Save changes"
                        />
                    </div>
                </main>

                <Footer />
            </div>
        </Layout>
    );
}
