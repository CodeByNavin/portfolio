import Image from 'next/image';
import Header from './components/navigation/header';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			<div className='flex flex-col relative h-screen bg-neutral-800 overflow-hidden'>
				<Header />
				<section className='relative flex items-center justify-center gap-64 px-48 h-full w-full text-white -translate-y-28 z-10 lg:translate-x-14 max-xl:flex-col max-xl:justify-center max-xl:gap-24 max-xl:translate-y-0'>
					<div className='relative flex flex-col items-center w-fit h-fit gap-8 max-lg:p-16 p-16'>
						<div className='flex flex-col text-nowrap'>
							<div className='absolute top-0 left-0 size-5 bg-neutral-900/60 rotate-45' />
							<div className='absolute bottom-0 right-0 size-5 bg-neutral-900/60 rotate-45' />
							<h2 className='font-poppins text-red-500'>Hey, I am</h2>
							<h1 className='text-4xl font-semibold'>Navin (Baymax) </h1>
							<h3 className='pt-2 text-lg border-b-4 border-b-red-500 pb-1 w-fit font-semibold'>
								Founder of{' '}
								<span className='hover:text-red-500 duration-500 cursor-pointer'>
									Baymax API's
								</span>
							</h3>
						</div>
					</div>

					<div className='relative flex flex-col gap-2 w-fit max-xl:mx-32 h-fit p-8 max-lg:gap-4 max-lg:px-20 max-lg:text-nowrap xl:max-w-2xl'>
						<div className='absolute w-1 h-12 top-0 left-0 bg-red-500' />
						<div className='absolute w-1 h-12 -top-6 left-[1.25rem] translate-x-1/2 bg-red-500 rotate-90' />
						<div className='absolute top-0 right-4 size-3 bg-white/70 rotate-45' />
						<div className='absolute top-6 -right-1 size-3 bg-white/70 rotate-45' />
						<h1 className='font-poppins text-3xl'>About Me</h1>
						<span className='max-lg:hidden'>
							As a backend developer and the founder of Baymax APIs, I specialize in creating
							powerful APIs that drive innovation and efficiency. With a deep love for coding
							and problem-solving, I thrive on delivering solutions that make a real impact.
						</span>
						<button className='hidden max-lg:flex justify-center w-full h-full bg-red-500 p-2 rounded-xl hover:scale-110 duration-300'>
							Click me!
						</button>
					</div>
				</section>

				<div className='absolute top-0 left-0 h-screen w-32 bg-red-500/65 max-lg:hidden' />

				<Link
					href='https://discord.com/users/863508137080127518'
					target='_blank'
					className='absolute bottom-6 right-6 w-[50px] h-[50px] hover:scale-110 duration-300 cursor-pointer z-10'
				>
					<Image src={'/profile.png'} alt='profile' fill={true} className='rounded-full' />
				</Link>
			</div>
		</>
	);
}
