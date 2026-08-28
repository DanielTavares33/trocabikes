import { Image, X } from 'lucide-react';
import type { SubmitEvent } from 'react';
import { useRef, useState } from 'react';

import { BIKE_MAX_PHOTOS, BIKE_MAX_YEAR, BIKE_MIN_YEAR } from '@/lib/bike';

interface ExistingImage {
  id: number;
  url: string;
}

export interface BikeFormData {
  title: string;
  bike_brand_id: string;
  bike_category_id: string;
  description: string;
  price: string;
  condition: string;
  year: string;
  size: string;
  frame_material: string;
  kilometers: string;
  district: string;
  city: string;
  phone_visible: boolean;
  email_visible: boolean;
}

interface BikeFormProps {
  data: BikeFormData;
  errors: Record<string, string>;
  processing: boolean;
  brands: { id: number; name: string; slug: string }[];
  categories: { id: number; name: string; slug: string }[];
  conditions: { value: string; label: string }[];
  frameMaterials: { value: string; label: string }[];
  photos: File[];
  photoPreviews: string[];
  existingImages?: ExistingImage[];
  removedPhotoIds: number[];
  onChange: (field: keyof BikeFormData, value: string | boolean) => void;
  onPhotosChange: (files: File[]) => void;
  onRemovePhoto: (index: number) => void;
  onRemoveExistingPhoto: (id: number) => void;
  onSubmit: (event: SubmitEvent) => void;
  submitLabel: string;
}

export default function BikeForm({
  data,
  errors,
  processing,
  brands,
  categories,
  conditions,
  frameMaterials,
  photos,
  photoPreviews,
  existingImages = [],
  removedPhotoIds,
  onChange,
  onPhotosChange,
  onRemovePhoto,
  onRemoveExistingPhoto,
  onSubmit,
  submitLabel,
}: Readonly<BikeFormProps>) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const visibleExistingImages = existingImages.filter(
    (image) => !removedPhotoIds.includes(image.id),
  );

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }

    const maxNewPhotos = Math.max(
      0,
      BIKE_MAX_PHOTOS - visibleExistingImages.length,
    );
    const nextFiles = [...photos, ...Array.from(fileList)].slice(
      0,
      maxNewPhotos,
    );
    onPhotosChange(nextFiles);
  };

  return (
    <form
      onSubmit={onSubmit}
      data-testid="bike-form"
      className="flex flex-col gap-8"
    >
      <section className="rounded-sm border border-border bg-surface p-6">
        <h2 className="mb-1 text-lg font-semibold text-text">Bike details</h2>
        <p className="mb-6 text-sm text-text-muted">
          Tell buyers about your bike
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-sm font-medium text-text">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              data-testid="bike-form-title"
              value={data.title}
              onChange={(event) => onChange('title', event.target.value)}
              placeholder="e.g. Canyon Spectral CF 7 — Full Suspension MTB"
              className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="brand" className="text-sm font-medium text-text">
                Brand
              </label>
              <select
                id="brand"
                name="bike_brand_id"
                data-testid="bike-form-brand"
                value={data.bike_brand_id}
                onChange={(event) =>
                  onChange('bike_brand_id', event.target.value)
                }
                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="">Select a brand</option>
                {brands.map((brand) => (
                  <option
                    key={brand.id}
                    value={brand.id}
                    data-slug={brand.slug}
                  >
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.bike_brand_id && (
                <p className="text-sm text-red-600">{errors.bike_brand_id}</p>
              )}
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
                data-testid="bike-form-category"
                value={data.bike_category_id}
                onChange={(event) =>
                  onChange('bike_category_id', event.target.value)
                }
                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    data-slug={category.slug}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.bike_category_id && (
                <p className="text-sm text-red-600">
                  {errors.bike_category_id}
                </p>
              )}
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
                data-testid="bike-form-condition"
                value={data.condition}
                onChange={(event) => onChange('condition', event.target.value)}
                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="">Select condition</option>
                {conditions.map((condition) => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </select>
              {errors.condition && (
                <p className="text-sm text-red-600">{errors.condition}</p>
              )}
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
                data-testid="bike-form-frame"
                value={data.frame_material}
                onChange={(event) =>
                  onChange('frame_material', event.target.value)
                }
                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="">Select material</option>
                {frameMaterials.map((material) => (
                  <option key={material.value} value={material.value}>
                    {material.label}
                  </option>
                ))}
              </select>
              {errors.frame_material && (
                <p className="text-sm text-red-600">{errors.frame_material}</p>
              )}
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
              data-testid="bike-form-description"
              rows={4}
              value={data.description}
              onChange={(event) => onChange('description', event.target.value)}
              placeholder="Describe your bike's condition, upgrades, history, and why you're selling..."
              className="w-full resize-y rounded-sm border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-sm border border-border bg-surface p-6">
        <h2 className="mb-1 text-lg font-semibold text-text">Bike specs</h2>
        <p className="mb-6 text-sm text-text-muted">
          Technical details about your bike
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="year" className="text-sm font-medium text-text">
              Year
            </label>
            <input
              id="year"
              type="number"
              name="year"
              data-testid="bike-form-year"
              min={BIKE_MIN_YEAR}
              max={BIKE_MAX_YEAR}
              value={data.year}
              onChange={(event) => onChange('year', event.target.value)}
              placeholder="2024"
              className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            {errors.year && (
              <p className="text-sm text-red-600">{errors.year}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="size" className="text-sm font-medium text-text">
              Size
            </label>
            <input
              id="size"
              type="text"
              name="size"
              data-testid="bike-form-size"
              value={data.size}
              onChange={(event) => onChange('size', event.target.value)}
              placeholder="e.g. M, 54cm"
              className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            {errors.size && (
              <p className="text-sm text-red-600">{errors.size}</p>
            )}
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
              value={data.kilometers}
              onChange={(event) => onChange('kilometers', event.target.value)}
              placeholder="0"
              className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            {errors.kilometers && (
              <p className="text-sm text-red-600">{errors.kilometers}</p>
            )}
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
            <label htmlFor="price" className="text-sm font-medium text-text">
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
                data-testid="bike-form-price"
                min={0}
                step="0.01"
                value={data.price}
                onChange={(event) => onChange('price', event.target.value)}
                placeholder="0.00"
                className="h-10 w-full rounded-sm border border-border bg-bg pr-3 pl-8 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
            </div>
            {errors.price && (
              <p className="text-sm text-red-600">{errors.price}</p>
            )}
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
                data-testid="bike-form-district"
                value={data.district}
                onChange={(event) => onChange('district', event.target.value)}
                placeholder="e.g. Lisboa"
                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              {errors.district && (
                <p className="text-sm text-red-600">{errors.district}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="city" className="text-sm font-medium text-text">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                data-testid="bike-form-city"
                value={data.city}
                onChange={(event) => onChange('city', event.target.value)}
                placeholder="e.g. Oeiras"
                className="h-10 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-sm border border-border bg-surface p-6">
        <h2 className="mb-1 text-lg font-semibold text-text">Photos</h2>
        <p className="mb-6 text-sm text-text-muted">
          Add up to {BIKE_MAX_PHOTOS} photos of your bike
        </p>

        <input
          id="photos"
          ref={fileInputRef}
          type="file"
          data-testid="bike-form-photos"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            handleFiles(event.dataTransfer.files);
          }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed px-6 py-12 transition-colors ${
            dragOver
              ? 'border-primary bg-bg-subtle'
              : 'border-border-strong bg-bg hover:border-primary hover:bg-bg-subtle'
          }`}
        >
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

        {(visibleExistingImages.length > 0 || photoPreviews.length > 0) && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {visibleExistingImages.map((image) => (
              <div key={image.id} className="relative aspect-square">
                <img
                  src={image.url}
                  alt=""
                  className="h-full w-full rounded-sm object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemoveExistingPhoto(image.id)}
                  className="absolute top-1 right-1 rounded-full bg-bg/90 p-1 text-text"
                >
                  <X width={14} height={14} />
                </button>
              </div>
            ))}
            {photoPreviews.map((preview, index) => (
              <div key={preview} className="relative aspect-square">
                <img
                  src={preview}
                  alt=""
                  className="h-full w-full rounded-sm object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemovePhoto(index)}
                  className="absolute top-1 right-1 rounded-full bg-bg/90 p-1 text-text"
                >
                  <X width={14} height={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {errors.photos && (
          <p className="mt-2 text-sm text-red-600">{errors.photos}</p>
        )}
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
              checked={data.phone_visible}
              onChange={(event) =>
                onChange('phone_visible', event.target.checked)
              }
              className="mt-0.5 h-4 w-4 rounded-sm border border-border bg-bg accent-primary"
            />
            <label htmlFor="phone_visible" className="text-sm text-text-muted">
              Show your phone number and WhatsApp on the bike
            </label>
          </div>

          <div className="flex items-start gap-2">
            <input
              id="email_visible"
              type="checkbox"
              name="email_visible"
              checked={data.email_visible}
              onChange={(event) =>
                onChange('email_visible', event.target.checked)
              }
              className="mt-0.5 h-4 w-4 rounded-sm border border-border bg-bg accent-primary"
            />
            <label htmlFor="email_visible" className="text-sm text-text-muted">
              Show your email address on the bike
            </label>
          </div>

          <button
            type="submit"
            data-testid="bike-form-submit"
            disabled={processing}
            className="h-10 w-full rounded-sm bg-primary font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {processing ? 'Saving...' : submitLabel}
          </button>
        </div>
      </section>
    </form>
  );
}
