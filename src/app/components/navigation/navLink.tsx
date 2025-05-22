import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function navLink({ name, href }: { name: string, href: string }) {
	const pathname = usePathname();

	return (
		<>
			<Link href={href} className={`${pathname === href ? 'text-white' : 'hover:text-white'} duration-300 bg-secondary rounded-lg p-2 flex items-center gap-2`}>
				{name}
			</Link>
		</>
	);
}
