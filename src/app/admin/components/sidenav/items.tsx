"use client"
import { useRouter, usePathname } from 'next/navigation';

export default function SideNavItem({
    name,
    href
}: {
    name: string;
    href: string;
}) {

    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname === href) return;
        return router.push(href);
    };

    return (
        <>
            {/* Desktop View */}
            <li
                className={`
                    flex-row items-center gap-3 hover: cursor-pointer opacity-80 duration-300 transition-opacity w-full sm:flex hidden
                    ${(pathname === href) ? 'text-white' : 'text-white/60'}
                `}
                onClick={handleClick}
            >
                {name}
            </li>

            {/* Mobile View */}
            <li
                className={`
                    flex-row items-center gap-3 hover: cursor-pointer opacity-80 duration-300 transition-opacity w-full sm:hidden flex
                    ${(pathname === href) ? 'text-white' : 'text-white/60'}
                `}
                onClick={handleClick}
            >
                {name}
            </li>
        </>
    );
}
