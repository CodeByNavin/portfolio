"use client";
import Header from '@/app/components/navigation/header';
import SideNav from './components/sidenav/main'
import { useState } from 'react';


export default function Admin() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

    return (
        <div className='flex flex-col relative h-screen w-screen bg-neutral-800 overflow-hidden'>
            <Header
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                showArrow={true}
            />
            <nav className='flex flex-col gap-2'>
                <SideNav
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
            </nav>
        </div>
    );
}