import { Head, Link, useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { update } from '@/routes/bikes';
import BikeForm from '~/components/bikes/BikeForm';
import type { BikeFormData } from '~/components/bikes/BikeForm';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';

interface EditProps {
  bike: {
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
    email_visible: boolean;
    images: { id: number; url: string }[];
  };
  brands: { id: number; name: string; slug: string }[];
  categories: { id: number; name: string; slug: string }[];
  conditions: { value: string; label: string }[];
  frameMaterials: { value: string; label: string }[];
}

export default function Edit({
  bike,
  brands,
  categories,
  conditions,
  frameMaterials,
}: Readonly<EditProps>) {
  const { data, setData, transform, post, processing, errors } = useForm({
    title: bike.title,
    bike_brand_id: String(bike.bike_brand_id),
    bike_category_id: String(bike.bike_category_id),
    description: bike.description,
    price: String(bike.price),
    condition: bike.condition,
    year: String(bike.year),
    size: bike.size,
    frame_material: bike.frame_material,
    kilometers: bike.kilometers ?? '',
    district: bike.district,
    city: bike.city,
    phone_visible: bike.phone_visible,
    email_visible: bike.email_visible,
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
    return () => {
      photoPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [photoPreviews]);

  const handleChange = (field: keyof BikeFormData, value: string | boolean) => {
    setData(field, value as never);
  };

  const handlePhotosChange = (files: File[]) => {
    setPhotos(files);
  };

  const handleRemoveExistingPhoto = (id: number) => {
    setRemovedPhotoIds((current) => [...current, id]);
  };

  transform((formData) => ({
    ...formData,
    photos,
    removed_photo_ids: removedPhotoIds,
  }));

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    post(update.url(bike.slug), { forceFormData: true });
  };

  return (
    <Layout>
      <Head title={`Edit ${bike.title} — Trocabikes`} />

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
              <span className="text-text">Edit bike</span>
            </nav>

            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-text">Edit bike</h1>
              <p className="mt-1 text-text-muted">Update your bike details</p>
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
              existingImages={bike.images}
              removedPhotoIds={removedPhotoIds}
              onChange={handleChange}
              onPhotosChange={handlePhotosChange}
              onRemovePhoto={(index) => {
                const next = photos.filter((_, i) => i !== index);
                handlePhotosChange(next);
              }}
              onRemoveExistingPhoto={handleRemoveExistingPhoto}
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
