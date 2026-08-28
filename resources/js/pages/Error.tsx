import { Head } from '@inertiajs/react';

interface ErrorPageProps {
  readonly status: number;
  readonly message?: string;
}

const statusConfig: Record<
  number,
  { title: string; description: string; suggestion: string }
> = {
  404: {
    title: '404 — Lost in the Wilderness',
    description:
      'Looks like this page went on a solo ride and never came back.',
    suggestion: 'Time to head back to base camp and try another trail.',
  },
  403: {
    title: '403 — No Entry, Sorry Mate',
    description:
      'This path is blocked. Even the mountain goats need a permit around here.',
    suggestion: 'Check your papers or take the scenic route instead.',
  },
  500: {
    title: '500 — Our Bad, We Probably Broke Something',
    description:
      'Our server just hit a rock. Or maybe ate something weird. Give it a sec.',
    suggestion: 'Try again — servers are resilient creatures.',
  },
  503: {
    title: '503 — Out for a Quick Service Break',
    description:
      "We're doing some maintenance. Our mechanic says it'll be ready soon.",
    suggestion: 'Coffee break? Come back in a few minutes.',
  },
  419: {
    title: '419 — Session Went on Holiday',
    description:
      'Your session expired faster than a bike tire on a rocky trail.',
    suggestion: 'Just press refresh — like hitting the reset button on life.',
  },
  429: {
    title: '429 — Slow Your Roll',
    description: "Whoa there, speed racer! You're making too many requests.",
    suggestion: 'Take a breather. Even bikes need to cool down.',
  },
  401: {
    title: '401 — You Shall Not Pass (Without Logging In)',
    description:
      'This area is for members only. Like a members-only bike club.',
    suggestion: 'Sign in and join the cool kids.',
  },
};

export default function ErrorPage({ status, message }: ErrorPageProps) {
  const config = statusConfig[status] ?? {
    title: `${status} — Error`,
    description: message ?? 'An unexpected error occurred.',
    suggestion: 'Please try again later.',
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6">
      <Head title={config.title} />

      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">{status}</h1>

        <h2 className="mt-4 text-2xl font-semibold text-text">
          {config.title.split(' — ')[1]}
        </h2>

        <p className="mt-4 text-text-muted">{config.description}</p>
        <p className="mt-1 text-sm text-text-muted">{config.suggestion}</p>
      </div>
    </div>
  );
}
