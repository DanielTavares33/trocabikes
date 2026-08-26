<?php

use App\Enums\BikeCondition;
use App\Enums\BikeStatus;
use App\Enums\FrameMaterial;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bikes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('bike_brand_id')->constrained();
            $table->foreignId('bike_category_id')->constrained();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->enum('condition', array_column(BikeCondition::cases(), 'value'))->default(BikeCondition::Used->value);
            $table->integer('year');
            $table->string('size');
            $table->enum('frame_material', array_column(FrameMaterial::cases(), 'value'))->default(FrameMaterial::Aluminum->value);
            $table->string('kilometers')->nullable();
            $table->string('district');
            $table->string('city');
            $table->boolean('phone_visible');
            $table->boolean('email_visible')->default(false);
            $table->enum('status', array_column(BikeStatus::cases(), 'value'))->default(BikeStatus::Active->value);
            $table->integer('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bikes');
    }
};
