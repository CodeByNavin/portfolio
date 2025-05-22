"use client";
import Image from 'next/image';
import Header from '@/app/components/navigation/header';
import ProjectInfo from '@/app/components/projects/project';

export default function Projects() {

    return (
        <>
            <div className='flex flex-col relative h-screen w-screen bg-neutral-800 overflow-hidden'>
                <Header
                    setIsMenuOpen={() => { }}
                    isMenuOpen={true}
                    showArrow={false}
                />
                <section className='pt-14 relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-48 h-full w-full text-white z-10'>
                    <div className='relative flex flex-wrap justify-center gap-6 p-6 w-full text-wrap'>
                        <ProjectInfo
                            data={{
                                title: 'Memory Game',
                                timeline: 'May 19th - May 21st, 2025',
                                description: 'A simple memory game where you have to find pairs of cards. The game is built using React and Tailwind CSS.',

                                frameworks: ["JavaScript", "Node.js", "React", "Tailwind CSS", "TypeScript"]
                            }}
                        />
                        
                    </div>
                </section>

                <div className='absolute top-0 left-0 h-screen w-32 bg-red-500/65 max-lg:hidden' />
                <div className='absolute bottom-6 right-5 group'>

                    <Image src={'/Navin.png'} alt='profile' fill={true} className='rounded-full' />
                    <div className='absolute hidden group-hover:block bottom-16 right-0 w-32 p-2 text-center bg-neutral-900 text-white rounded-lg shadow-md duration-300 transition-all'>
                        <span className='text-sm'>Feel free to reach out for any questions!</span>
                    </div>
                </div>
            </div>
        </>
    );
}