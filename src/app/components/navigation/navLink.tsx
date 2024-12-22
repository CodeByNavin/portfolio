import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function navLink({ name }: { name: string }) {
	const pathname = usePathname();

	return (
		<>
			<Link href={name.toLowerCase()} className={`${pathname === name.toLowerCase() ? 'text-white' : 'hover:text-white'} duration-300`}>
				{name}
			</Link>
		</>
	);
}
