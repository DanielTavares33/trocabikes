import { Head, Link, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { store } from '@/routes/bikes';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';
import BikeForm from '~/components/bikes/BikeForm';
import type { BikeFormData } from '~/components/bikes/BikeForm';

interface CreateProps {
    brands: { id: number; name: string }[];
    categories: { id: number; name: string }[];
    conditions: { value: string; label: string }[];
    frameMaterials: { value: string; label: string }[];
}

const emptyForm: BikeFormData = {
    title: '',
    bike_brand_id: '',
    bike_category_id: '',
    description: '',
    price: '',
    condition: '',
    year: '',
    size: '',
    frame_material: '',
    kilometers: '',
    district: '',
    city: '',
    phone_visible: false,
    email_visible: false,
};

export default function Create({
    brands,
    categories,
    conditions,
    frameMaterials,
}: Readonly<CreateProps>) {
    const { data, setData, post, processing, errors } = useForm({
        ...emptyForm,
        photos: [] as File[],
    });
    const [photos, setPhotos] = useState<File[]>([]);
    const photoPreviews = useMemo(
        () => photos.map((file) => URL.createObjectURL(file)),
        [photos],
    );

    useEffect(() => {
        setData('photos', photos);
    }, [photos, setData]);

    useEffect(() => {
        return () => {
            photoPreviews.forEach((preview) => URL.revokeObjectURL(preview));
        };
    }, [photoPreviews]);

    const handleChange = (
        field: keyof BikeFormData,
        value: string | boolean,
    ) => {
        setData(field, value as never);
    };

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        post(store.url(), { forceFormData: true });
    };

    return (
        <Layout>
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

                        <BikeForm
                            data={data}
                            errors={errors}
                            processing={processing}
                            brands={brands}
                            categories={categories}
                            conditions={conditions}
                            frameMaterials={frameMaterials}
                            photos={photos}
                            photoPreviews={photoPreviews}
                            removedPhotoIds={[]}
                            onChange={handleChange}
                            onPhotosChange={setPhotos}
                            onRemovePhoto={(index) =>
                                setPhotos((current) =>
                                    current.filter((_, i) => i !== index),
                                )
                            }
                            onRemoveExistingPhoto={() => {}}
                            onSubmit={handleSubmit}
                            submitLabel="Publish bike"
                        />
                    </div>
                </main>

                <Footer />
            </div>
        </Layout>
    );
}
