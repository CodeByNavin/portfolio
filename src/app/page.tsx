"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProjectCard, { ProjectData } from './components/project';

export default function Home() {
	const [data, setData] = useState<{ frameworks: { name: string; img: string }[], languages: { name: string; img: string }[] }>({ frameworks: [], languages: [] });
	const [projects, setProjects] = useState<ProjectData[]>([]);

	// Fetch data from data.json
	useEffect(() => {
		Promise.all([
			fetch('/json/data.json')
				.then((response) => response.json())
				.then((data) => {
					setData(data);
				}),
			fetch('/json/projects.json')
				.then((response) => response.json())
				.then((projects) => {
					setProjects(projects);
				})
		])
	}, []);


	return (
		<>
			<div className='flex flex-col relative min-h-screen bg-neutral-800 pb-10 overflow-y-auto overflow-x-hidden'>
				<section className="flex flex-1 h-screen w-full text-white z-10
					flex-row items-center justify-center pl-32 max-lg:pl-0 pr-8 max-lg:pr-0
					max-xl:flex-col max-xl:items-center max-xl:justify-center max-xl:px-4
					max-sm:px-2
				">
					{/* Left: Icon, Name, Role */}
					<div className='flex flex-col items-center justify-center w-1/3 max-xl:w-full max-w-md gap-4 p-4 max-sm:p-2'>
						<Image
							src='/Navin.png'
							alt='Navin'
							height={80}
							width={80}
							className='rounded-full object-cover border-1 border-red-500'
						/>
						<h1 className='font-poppins text-4xl text-center'>Hey I{"'"}m Navin</h1>
						<span className='text-wrap text-center'>A Developer</span>
					</div>

					{/* Right: Info, Frameworks, Languages */}
					<div className='flex flex-col w-2/3 max-xl:w-full gap-8 p-8 max-lg:p-6 max-sm:p-4 items-center max-xl:items-center'>
						{/* Info text inline with name/role */}
						<div className='relative flex flex-col gap-2 h-fit p-8 max-lg:p-6 max-lg:gap-4 max-xl:max-w-xl 2xl:max-w-xl mt-10 max-xl:mt-0 max-sm:p-4'>
							<div className='absolute w-1 h-12 top-0 left-0 bg-red-500' />
							<div className='absolute w-1 h-12 -top-6 left-[1.25rem] translate-x-1/2 bg-red-500 rotate-90' />
							<p className='text-lg max-w-2xl text-wrap'>
								Hi! My name is Navin. I'm a 15-year-old developer who loves building cool things with code. Whether it's a website, a game, or a fun tool, I enjoy learning new tech and turning my ideas into real projects. I'm always excited to try something new and challenge myself!
							</p>
							<div className='absolute w-1 h-12 bottom-0 right-0 bg-red-500' />
							<div className='absolute w-1 h-12 -bottom-6 right-[1.50rem] translate-x-1/2 bg-red-500 rotate-90' />
						</div>
						{/* Frameworks */}
						<div className='relative flex flex-col items-center gap-2 w-full max-w-2xl'>
							<h1 className='text-2xl font-poppins'>Frameworks</h1>
							<div className='flex flex-wrap items-center justify-center gap-2 w-full'>
								{data.frameworks.map((framework) => (
									<div
										key={framework.name}
										className='bg-accent/80 p-4 rounded-full flex items-center justify-center text-sm font-medium'
									>
										<span>{framework.name}</span>
									</div>
								))}
							</div>
						</div>

						{/* Languages */}
						<div className='relative flex flex-col items-center gap-2 w-full max-w-2xl'>
							<h1 className='text-2xl font-poppins'>Languages</h1>
							<div className='flex flex-wrap items-center justify-center gap-2'>
								{data.languages.map((language) => (
									<div
										key={language.name}
										className='bg-accent/80 p-4 rounded-full flex items-center justify-center text-sm font-medium'
									>
										<span>{language.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{projects.length > 0 && (
					<section className="pl-32 max-lg:pl-0 pr-8 max-lg:pr-0 max-lg:px-4 max-sm:px-2">
						{/* Projects */}
						<h1 className='text-2xl font-poppins text-center text-white mt-8'>Projects</h1>
						<div className='flex flex-wrap justify-center gap-4 p-8 max-sm:p-4'>
							{projects?.map((project) => (
								<ProjectCard
									key={project.title}
									data={project}
									allFrameworks={[
										...data.frameworks.map(f => ({ ...f, icon: f.img })),
										...data.languages.map(l => ({ ...l, icon: l.img }))
									]}
								/>
							))}
						</div>
					</section>
				)}


				<div className='absolute top-0 left-0 h-full w-32 bg-red-500/65 max-lg:hidden' />
			</div>
		</>
	);
}
