export default function Hero() {
    return (
        <section className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden bg-text lg:min-h-[600px]">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop&q=80)',
                }}
            />
            <div className="absolute inset-0 bg-text/70" />

            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
                <p className="mb-4 text-sm font-medium tracking-widest text-white uppercase">
                    The bike marketplace
                </p>
                <h1 className="mb-6 text-5xl leading-tight font-semibold tracking-tight text-white lg:text-7xl">
                    Find your next ride.
                </h1>
                <p className="mx-auto mb-10 max-w-xl text-lg text-white/80">
                    Connect with sellers in your area. Browse hundreds of bikes
                    from MTB to road, e-bikes to kids' bikes.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a
                        href="/browse"
                        className="rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition-colors hover:bg-primary-hover"
                    >
                        Browse bikes
                    </a>
                    <a
                        href="#"
                        className="rounded-sm border border-white/30 bg-white/10 px-8 py-3 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                        Sell your bike
                    </a>
                </div>
            </div>
        </section>
    );
}
