"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SideNavItem from './items'; // Assuming you have a SideNavItem component

export default function SideNav({
    isMenuOpen,
    setIsMenuOpen
}: {
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
}) {

    const [isMobile, setIsMobile] = useState(false);

    // Adjust the state based on screen size for responsiveness
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
                setIsMenuOpen(false);  // Hide sidebar on mobile by default
            } else {
                setIsMobile(false);
                setIsMenuOpen(true);   // Ensure sidebar is visible on larger screens
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsMenuOpen]);

    const toggleMenu = () => {
        if (isMobile) {
            setIsMenuOpen(!isMenuOpen);
        }
    };

    return (
        <>
            {/* Sidebar */}
            <motion.section
                initial={{ x: -400 }}
                animate={{ x: isMenuOpen ? 0 : -400 }}
                exit={{ x: -400 }}
                transition={{
                    duration: 0.3,
                    type: 'tween',
                }}
                className="absolute h-screen w-64 bg-red-500/50 flex flex-col p-4"
            >
                <h2 className='text-lg text-white mb-2 pl-7'>Admin Dashboard</h2>

                {/* Sidebar Menu Items */}
                <div className='pt-4 flex flex-col gap-2 items-start text-white/60 pl-5 w-full'>
                    <SideNavItem name='Introduction' href='/admin' />
                    <SideNavItem name='Projects' href='/admin/projects' />
                </div>
            </motion.section>
        </>
    );
}
