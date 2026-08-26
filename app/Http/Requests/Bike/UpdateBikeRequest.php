<?php

namespace App\Http\Requests\Bike;

use App\Enums\BikeCondition;
use App\Enums\FrameMaterial;
use App\Models\Bike;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class UpdateBikeRequest extends FormRequest
{
    public const MAX_PHOTOS = 10;

    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('bike')) ?? false;
    }

    public function rules(): array
    {
        /** @var Bike|null $bike */
        $bike = $this->route('bike');

        return [
            'title' => ['required', 'string', 'max:255'],
            'bike_brand_id' => [
                'required',
                'integer',
                Rule::exists('bike_brands', 'id')->where(function ($query) use ($bike): void {
                    $query->where('is_active', true);

                    if ($bike instanceof Bike) {
                        $query->orWhere('id', $bike->bike_brand_id);
                    }
                }),
            ],
            'bike_category_id' => ['required', 'integer', 'exists:bike_categories,id'],
            'description' => ['required', 'string', 'max:5000'],
            'price' => ['required', 'numeric', 'min:0', 'max:999999.99'],
            'condition' => ['required', Rule::enum(BikeCondition::class)],
            'year' => ['required', 'integer', 'min:1990', 'max:'.(date('Y') + 1)],
            'size' => ['required', 'string', 'max:50'],
            'frame_material' => ['required', Rule::enum(FrameMaterial::class)],
            'kilometers' => ['nullable', 'integer', 'min:0'],
            'district' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'phone_visible' => ['sometimes', 'boolean'],
            'email_visible' => ['sometimes', 'boolean'],
            'photos' => ['sometimes', 'array'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
            'removed_photo_ids' => ['sometimes', 'array'],
            'removed_photo_ids.*' => ['integer', 'exists:bike_images,id'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $bike = $this->route('bike');

            if (! $bike instanceof Bike) {
                return;
            }

            /** @var array<int, int|string> $removedIds */
            $removedIds = $this->input('removed_photo_ids', []);
            $newPhotoCount = count($this->file('photos', []));

            if ($removedIds !== []) {
                $validRemovalCount = $bike->images()->whereIn('id', $removedIds)->count();

                if ($validRemovalCount !== count($removedIds)) {
                    $validator->errors()->add(
                        'removed_photo_ids',
                        'One or more photos do not belong to this bike.',
                    );
                }
            }

            $remainingCount = $bike->images()
                ->whereNotIn('id', $removedIds)
                ->count();
            $totalAfterUpdate = $remainingCount + $newPhotoCount;

            if ($totalAfterUpdate < 1) {
                $validator->errors()->add('photos', 'At least one photo is required.');
            }

            if ($totalAfterUpdate > self::MAX_PHOTOS) {
                $validator->errors()->add(
                    'photos',
                    'A bike may have at most '.self::MAX_PHOTOS.' photos.',
                );
            }
        });
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'phone_visible' => $this->boolean('phone_visible'),
            'email_visible' => $this->boolean('email_visible'),
        ]);
    }
}
