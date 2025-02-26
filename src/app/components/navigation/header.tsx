'use client';

import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collapsedXVarients } from '../../../../lib/varients/navigation';
import NavLink from './navLink';
import { useSession, signOut } from 'next-auth/react'

export default function Header({
	isMenuOpen,
	setIsMenuOpen
}: {
	isMenuOpen: boolean;
	setIsMenuOpen: (value: boolean) => void;
}) {
	const [collapsed, setCollapsed] = useState<boolean>(false);

	// Adjust the state based on screen size for responsiveness
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1024) {
				setCollapsed(true);
			} else {
				setCollapsed(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [setCollapsed]);

	const { data: session } = useSession()

	return (
		<>
			<div className='fixed flex flex-row items-center justify-between px-[1.2rem] py-6 w-screen select-none z-50'>
				<div>
					<ChevronRightIcon
						className={`size-5 ${isMenuOpen ? 'rotate-0' : 'max-lg:rotate-90 rotate-180'
							} lg:duration-700 duration-500 text-neutral-300 cursor-pointer `}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					/>
				</div>


				<div className='absolute flex flex-row-reverse max-lg:flex-col items-center gap-6 lg:h-full max-lg:top-6 right-10 w-fit max-lg:w-12'>
					<ChevronRightIcon
						className={`size-5 ${collapsed ? 'rotate-0' : 'max-lg:rotate-90 rotate-180'
							} lg:duration-700 duration-500 text-neutral-300 cursor-pointer `}
						onClick={() => setCollapsed(!collapsed)}
					/>

					<AnimatePresence>
						{!collapsed && (
							<motion.nav
								initial='hidden'
								animate='visible'
								exit='exit'
								variants={collapsedXVarients}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
								className='flex flex-row max-lg:flex-col items-center gap-8 text-neutral-400 navS'
							>
								<NavLink name='About' />
								<NavLink name='Projects' />
								<Link
									className="rounded-2xl duration-300 p-1 hover:text-white"
									href={'https://discord.com/users/863508137080127518'}
								>
									Contact
								</Link>
								{!session ? (
									<Link
										href="/signin"
										className='bg-red-500/70 text-white rounded-2xl px-2 duration-300 hover:scale-110 p-1'
									>
										SignIn
									</Link>
								) : (
									<button
										onClick={() => signOut()}
										className='bg-red-500/70 text-white rounded-2xl px-2 duration-300 hover:scale-110 p-1'
									>
										Sign Out
									</button>
								)}


							</motion.nav>
						)}
					</AnimatePresence>

				</div>
			</div>
		</>
	);
}
