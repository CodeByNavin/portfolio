"use client"
import Image from 'next/image';
import Header from '@/app/components/navigation/header';
import { useEffect, useState } from 'react';

export default function AboutMe() {
    const [frameworks, setFrameworks] = useState<{ name: string; logo: string }[]>([])

    useEffect(() => {
        fetch('/frameworks/main.json')
            .then((response) => response.json())
            .then((data) => {
                setFrameworks(data);
            })
    }, [])

    return (
        <div className='bg-neutral-800 text-white min-h-screen'>
            <Header
                isMenuOpen={true}
                setIsMenuOpen={() => { }}
                showArrow={false}
            />

            <section className='relative pt-16 pb-24'>
                <div className="container mx-auto px-6 text-center">
                    {/* Header/Intro Section */}
                    <h1 className="text-4xl font-semibold mb-4">About Me</h1>
                    <p className="text-lg mb-6 text-neutral-400">
                        Hi, I'm Navin, a developer with love for building different applications.
                        Creating different
                        {' '}
                        <span
                            className="text-red-500 hover:cursor-pointer hover:underline"
                            onClick={() => window.location.href = '/frameworks/projects'}
                        >
                            projects
                        </span> for any needs.
                    </p>

                    {/* Image Section */}
                    <div className='flex justify-center mb-8'>
                        <Image
                            src='/Navin.png'
                            alt='Profile Picture'
                            width={150}
                            height={150}
                            className='rounded-full border-4 border-red-500'
                        />
                    </div>

                    {/* What I Do Section */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
                        <p className="text-lg text-neutral-400">
                            I create applications that are easy for individuals to use.
                            My focus is on frontend and backend development.
                        </p>
                    </div>

                    {/* Skills/Frameworks Section */}
                    <div className='max-w-3xl mx-auto mb-16'>
                        <h2 className="text-2xl font-semibold mb-4">Framework I Work With</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {frameworks.map((framework, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <Image
                                        src={framework.logo}
                                        alt={framework.name}
                                        width={40}
                                        height={40}
                                        className="mb-2"
                                    />
                                    <p className="text-sm">{framework.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl font-semibold mb-4">Let's Get in Touch!</h2>
                        <p className="text-lg text-neutral-400 mb-6">
                            If you're interested in working together or just want to chat about tech, feel free to reach out! You can find me on social media or contact me directly.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="https://github.com/CodeByNavin"
                                target="_blank"
                                className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 duration-300"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
