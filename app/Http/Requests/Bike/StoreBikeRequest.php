<?php

namespace App\Http\Requests\Bike;

use App\Enums\BikeCondition;
use App\Enums\FrameMaterial;
use App\Models\Bike;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBikeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Bike::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'bike_brand_id' => [
                'required',
                'integer',
                Rule::exists('bike_brands', 'id')->where('is_active', true),
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
            'photos' => ['required', 'array', 'min:1', 'max:10'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:10240'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'phone_visible' => $this->boolean('phone_visible'),
            'email_visible' => $this->boolean('email_visible'),
        ]);
    }
}
