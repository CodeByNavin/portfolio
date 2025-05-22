"use client"
import Image from 'next/image';
import Header from '@/app/components/navigation/header';

export default function Home() {

	return (
		<>
			<div className='flex flex-col relative h-screen bg-neutral-800 overflow-hidden'>
				<Header
					isMenuOpen={true}
					setIsMenuOpen={() => { }}
					showArrow={false}
				/>
				<section className='relative flex items-center justify-center gap-64 px-48 h-full w-full text-white -translate-y-28 z-10 lg:translate-x-14 max-xl:flex-col max-xl:justify-center max-xl:gap-24 max-xl:translate-y-0'>
					<div className='relative flex flex-col items-center w-fit h-fit gap-8 max-lg:p-16 p-16'>
						<div className='flex flex-col text-nowrap'>
							<div className='absolute top-0 left-0 size-5 bg-neutral-900/60 rotate-45' />
							<div className='absolute bottom-0 right-0 size-5 bg-neutral-900/60 rotate-45' />
							<h2 className='font-poppins text-red-500'>Hey, I am</h2>
							<div className="flex flex-row items-center gap-4 ml-[-1.5rem] pt-3">
								<Image
									src='/Navin.png'
									alt='Navin'
									width={80}
									height={80}
									className='rounded-full object-cover border-1 border-red-500'
								/>
								<h1 className='text-4xl font-semibold'>Navin</h1>
							</div>
						</div>
					</div>

					<div className='relative flex flex-col gap-2 h-fit p-8 max-lg:gap-4 max-lg:px-24 max-lg:text-nowrap max-xl:max-w-xl 2xl:max-w-xl'>
						<div className='absolute w-1 h-12 top-0 left-0 bg-red-500' />
						<div className='absolute w-1 h-12 -top-6 left-[1.25rem] translate-x-1/2 bg-red-500 rotate-90' />
						<div className='absolute top-0 right-4 size-3 bg-white/70 rotate-45' />
						<div className='absolute top-6 -right-1 size-3 bg-white/70 rotate-45' />
						<h1 className='font-poppins text-3xl'>About Me</h1>
						<span className='max-lg text-wrap'>
							I am a developer, with a passion for making different types of applications.
						</span>
					</div>
				</section>
				<div className='absolute top-0 left-0 h-screen w-32 bg-red-500/65 max-lg:hidden' />
			</div>
		</>
	);
}
