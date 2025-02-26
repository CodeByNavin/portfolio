"use client";
import Image from 'next/image';
import Header from '@/app/components/navigation/header';
import Link from 'next/link';
import ProjectInfo from './components/project';
import { useState, useEffect } from 'react';
import GetProjects from './helpers/GetProjects';

export default function Projects() {

    const [Projects, setProjects] = useState<any[] | unknown>([]);

    useEffect(() => {
        const FetchProjects = async () => {
            let Projects = await GetProjects();
            Projects = JSON.parse(Projects as any);
            setProjects(Projects as any);
        };

        FetchProjects();
    }, []);

    return (
        <>
            <div className='flex flex-col relative h-screen w-screen bg-neutral-800 overflow-hidden'>
                <Header
                    setIsMenuOpen={() => { }}
                    isMenuOpen={true}
                />
                <section className='pt-14 relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-48 h-full w-full text-white z-10'>
                    <div className='relative flex flex-wrap justify-center gap-6 p-6 w-full text-wrap'>
                        {Array.isArray(Projects) && Projects.map((project: any, index: number) => (
                            <ProjectInfo
                                key={index}
                                data={project}
                            />
                        ))}
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
        </>
    );
}