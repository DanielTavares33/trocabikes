import { Head } from '@inertiajs/react';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';

export default function MyBikes() {
    return (
        <Layout>
            <Head title="My Bikes — Trocabikes" />

            <div className="flex min-h-screen flex-col bg-bg text-text">
                <Navbar />

                <main className="flex flex-1 items-center justify-center px-6">
                    <h1 className="text-2xl font-semibold">My Bikes</h1>
                </main>

                <Footer />
            </div>
        </Layout>
    );
}
