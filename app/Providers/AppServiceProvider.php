<?php

namespace App\Providers;

use App\Models\Bike;
use App\Models\BikeBrand;
use App\Models\BikeCategory;
use App\Models\BikeImage;
use App\Observers\BikeBrandObserver;
use App\Observers\BikeCategoryObserver;
use App\Observers\BikeImageObserver;
use App\Observers\BikeObserver;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureExceptionHandling();

        BikeBrand::observe(BikeBrandObserver::class);
        BikeCategory::observe(BikeCategoryObserver::class);
        Bike::observe(BikeObserver::class);
        BikeImage::observe(BikeImageObserver::class);
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }

    protected function configureExceptionHandling(): void
    {
        Inertia::handleExceptionsUsing(function ($response) {
            $status = $response->response->status();

            if (in_array($status, [403, 401, 404, 419, 429, 500, 503])) {
                return $response->render('Error', [
                    'status' => $status,
                    'message' => $response->exception->getMessage(),
                ]);
            }

            return $response;
        });
    }
}
