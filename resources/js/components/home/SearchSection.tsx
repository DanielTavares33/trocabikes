import { Form } from '@inertiajs/react';
import { ChevronDown, MapPin, Search } from 'lucide-react';

import { index as bikesIndex } from '@/routes/bikes';

export default function SearchSection() {
  return (
    <section className="border-y border-border bg-bg-subtle px-6 py-10 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-6 text-center text-xl font-semibold text-text">
          Find your bike
        </h2>

        <Form
          {...bikesIndex.form()}
          className="flex flex-col gap-4 lg:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-text-subtle"
              width={20}
              height={20}
            />
            <input
              type="text"
              name="q"
              data-testid="home-search-q"
              placeholder="Search by brand, model, or keyword..."
              className="h-12 w-full rounded-sm border border-border bg-surface pr-4 pl-12 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <div className="relative lg:w-48">
            <MapPin
              className="absolute top-1/2 left-4 -translate-y-1/2 text-text-subtle"
              width={20}
              height={20}
            />
            <select
              name="location"
              className="h-12 w-full appearance-none rounded-sm border border-border bg-surface pr-10 pl-12 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            >
              <option value="">All locations</option>
              <option value="lisboa">Lisboa</option>
              <option value="porto">Porto</option>
              <option value="braga">Braga</option>
              <option value="coimbra">Coimbra</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-subtle"
              width={16}
              height={16}
            />
          </div>

          <button
            type="submit"
            data-testid="home-search-submit"
            className="h-12 rounded-sm bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Search
          </button>
        </Form>
      </div>
    </section>
  );
}
