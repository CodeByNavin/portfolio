"use client"
import Image from 'next/image';
import Header from '@/app/components/navigation/header';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

export default function SignInPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email) {
            return setError('Email was not provided');
        }

        const emailRegex = /([a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)?)\@([a-zA-Z]+)\.([a-z]{2,3})(?:\.[a-zA-Z]{2,3})?/gi;
        if (!emailRegex.test(formData.email)) {
            return setError('Invalid email provided');
        }

        if (!formData.password) {
            return setError('Password was not provided');
        }

        setError(null);
        signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: true,
            redirectTo: 'http://localhost:3000/admin',
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className='flex flex-col relative h-screen w-screen bg-neutral-800 overflow-hidden'>
            <Header
                isMenuOpen={true}
                setIsMenuOpen={() => { }}
                showArrow={false}
            />
            <section className='pt-14 relative flex flex-col items-center justify-center gap-8 px-6 md:px-12 lg:px-48 h-full w-full text-white z-10'>
                <div className='relative flex flex-col gap-4 p-6 max-w-full'>
                    <div>
                        <div className='absolute w-1 h-12 top-0 left-0 bg-red-500' />
                        <div className='absolute w-1 h-12 -top-6 left-[1.25rem] translate-x-1/2 bg-red-500 rotate-90' />
                    </div>

                    <h3 className="text-red-500">{error}</h3>

                    <form onSubmit={handleSignIn} className="flex flex-col gap-y-4 text-white">
                        <label className="font-semibold">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="rounded bg-[#181818] p-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <label className="font-semibold">Password:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="rounded bg-[#181818] p-2 text-white pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <div
                                onMouseEnter={() => setShowPassword(true)}
                                onMouseLeave={() => setShowPassword(false)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showPassword ? (
                                    <EyeIcon className="w-5 h-5 text-gray-400" />
                                ) : (
                                    <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-red-500 py-2 rounded text-white hover:bg-red-600 transition-colors duration-300"
                        >
                            Sign In
                        </button>
                    </form>

                    <div>
                        <div className='absolute w-1 h-12 bottom-0 -right-1 bg-red-500' />
                        <div className='absolute w-1 h-12 -bottom-6 right-[1.25rem] translate-x-1/2 bg-red-500 rotate-90' />
                    </div>
                </div>
            </section>

            <div className='absolute top-0 left-0 h-screen w-32 bg-red-500/65 max-lg:hidden' />
            <div className='absolute bottom-6 right-5 group'>
                <Link
                    href='https://discord.com/users/863508137080127518'
                    target='_blank'
                    className='absolute bottom-1 right-1 w-[50px] h-[50px] hover:scale-110 duration-300 cursor-pointer z-10'
                >
                    <Image src={'/profile.png'} alt='profile' fill={true} className='rounded-full' />
                </Link>
                <div className='absolute hidden group-hover:block bottom-16 right-0 w-32 p-2 text-center bg-neutral-900 text-white rounded-lg shadow-md duration-300 transition-all'>
                    <span className='text-sm'>Feel free to reach out for any questions!</span>
                </div>
            </div>
        </div>
    );
}
