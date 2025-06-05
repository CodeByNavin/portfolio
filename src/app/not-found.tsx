"use client";
import Link from 'next/link';
export default function Custom404() {

    return (
        <div className='flex flex-col relative h-screen w-screen bg-neutral-800 overflow-hidden'>
            <section className='pt-14 relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-48 h-full w-full text-white z-10'>
                <h1 className='text-6xl font-bold'>404</h1>
                <p className='mt-4 text-lg'>Page Not Found</p>
                <Link href='/' className='mt-6 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition'>
                    Go to Home
                </Link>
            </section>
        </div>
    );
}