<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class RateLimiterMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $name, int $maxAttempts = 5, int $decaySeconds = 60): Response
    {
        $key = strtolower($name).':'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, $maxAttempts)) {
            $seconds = RateLimiter::availableIn($key);

            return back()->withErrors([
                'email' => "Too many {$name} attempts. Please try again in {$seconds} seconds.",
            ])->header('Retry-After', (string) $seconds);
        }

        $response = $next($request);

        if ($response->isRedirect() && $errors = $request->session()->get('errors')) {
            $errorMessages = $errors->getMessages();
            $shouldRateLimit = $name !== 'login';

            if (! $shouldRateLimit && isset($errorMessages['email'])) {
                $shouldRateLimit = is_array($errorMessages['email'])
                    && array_any(
                        $errorMessages['email'],
                        fn ($msg) => str_contains($msg, 'credentials')
                    );
            }

            if ($shouldRateLimit) {
                RateLimiter::hit($key, $decaySeconds);
            }
        }

        return $response;
    }
}
