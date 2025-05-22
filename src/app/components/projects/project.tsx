"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Framework = {
    name: string;
    icon: string;
};

export type AllowedFramework =
    | "Discord.js"
    | "Express"
    | "JavaScript"
    | "MongoDB"
    | "Mongoose"
    | "Next.js"
    | "Node.js"
    | "React"
    | "Tailwind CSS"
    | "TypeScript";

type ProjectData = {
    image?: {
        data: string;
        name: string;
        width: number;
        height: number;
    };
    title: string;
    timeline: string;
    description: string;
    frameworks?: AllowedFramework[];
};

export default function Project({
    data,
}: {
    data: ProjectData;
}) {
    const [frameworksData, setFrameworksData] = useState<{ name: string; logo: string }[]>([]);
    const [showFrameworks, setShowFrameworks] = useState<boolean>(false);

    useEffect(() => {
        fetch('/frameworks/main.json')
            .then((response) => response.json())
            .then((data: { name: string; logo: string }[]) => {
                setFrameworksData(data);
            });
    }, []);

    // Map framework keys to their data from the JSON
    const frameworks: Framework[] = (data.frameworks || [])
        .map((fwName) => {
            const foundFw = frameworksData.find(
                (fw) => fw.name.toLowerCase() === fwName.toLowerCase()
            );
            return foundFw ? { name: foundFw.name, icon: foundFw.logo } : undefined;
        })
        .filter((fw): fw is Framework => fw !== undefined);

    return (
        <div className="flex flex-col items-center relative py-3 px-3 max-w-[220px] max-h-[420px] rounded-xl shadow-md bg-neutral-900 text-white text-center transition-transform hover:scale-105">
            {/* Red corner divs */}
            <div className="absolute w-1 h-6 top-0 left-0 bg-red-500 rounded" />
            <div className="absolute w-1 h-6 -top-3 left-2.5 bg-red-500 rotate-90 rounded" />
            <Image
                src={data.image?.data ? `${data.image.data}` : '/NoImage.png'}
                alt={data.image?.name || "No Image"}
                width={160}
                height={100}
                className="rounded-lg p-1 w-full h-[100px] object-cover mb-2"
            />
            <h1 className="text-lg font-semibold flex flex-row items-center gap-2">
                {data.title}
                <span className="text-xs text-white/50">{' - '}{data.timeline}</span>
            </h1>
            <p className='pt-1 pb-2 text-xs line-clamp-3'>
                {data.description}
            </p>
            <button
                className="mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-xs font-semibold transition"
                onClick={() => setShowFrameworks((v) => !v)}
            >
                {showFrameworks ? "Hide Frameworks" : "Show Frameworks"}
            </button>
            <AnimatePresence>
                {showFrameworks && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-3 gap-2 w-full mt-3"
                    >
                        {frameworks.map((fw, idx) => (
                            <div key={fw.name + idx} className="flex flex-col items-center">
                                
                                    <div className="flex items-center justify-center">
                                        <Image
                                            src={fw.icon}
                                            alt={fw.name}
                                            width={22}
                                            height={22}
                                            className="rounded"
                                        />
                                    </div>
                                
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Red corner divs at the bottom */}
            <div className="absolute w-1 h-6 bottom-0 -right-1 bg-red-500 rounded" />
            <div className="absolute w-1 h-6 -bottom-3 right-1.5 bg-red-500 rotate-90 rounded" />
        </div>
    );
}