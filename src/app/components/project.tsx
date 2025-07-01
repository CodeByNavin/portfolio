import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the types for Framework and ProjectData
export type Framework = {
  name: string;
  icon: string;
};

export type ProjectData = {
  image?: {
    src: string;
    name: string;
    width: number;
    height: number;
  };
  title: string;
  timeline: string;
  description: string;
  frameworks?: string[];
  link?: string;
};


export default function ProjectCard({
  data,
  allFrameworks,
}: {
  data: ProjectData;
  allFrameworks: Framework[];
}) {
  const [showFrameworks, setShowFrameworks] = useState<boolean>(false);

  // Create a map from the allFrameworks prop for efficient lookup
  const frameworksMap: Record<string, Framework> = {};
  allFrameworks.forEach(fw => {
    frameworksMap[fw.name.toLowerCase()] = fw;
  });

  // Resolve the frameworks for this specific project
  const projectSpecificFrameworks: Framework[] = data.frameworks?.map(name => frameworksMap[name.toLowerCase()])
    .filter((fw): fw is Framework => !!fw) || [];

  return (
    <div className="relative flex max-h-[420px] max-w-[220px] flex-col items-center rounded-xl bg-secondary px-3 py-3 text-center text-white shadow-md transition-transform hover:scale-105">
      {/* Red corner divs */}
      <div className="absolute left-0 top-0 h-6 w-1 rounded bg-accent" />
      <div className="absolute -top-3 left-2.5 h-6 w-1 rotate-90 rounded bg-accent" />

      <Image
        src={data.image?.src ? `${data.image.src}` : '/NoImage.png'}
        alt={data.image?.name || 'No Image'}
        width={160}
        height={160}
        className="mb-2 h-[100px] w-full rounded-lg object-cover p-1"
      />
      <h1 className="flex flex-row items-center gap-2 text-lg font-semibold">
        {data.title}
        <span className="text-xs text-white/50">
          {' - '}
          {data.timeline}
        </span>
      </h1>
      <p className="line-clamp-3 pb-2 pt-1 text-xs">{data.description}</p>
      <div>
        <button
          className="mt-2 rounded bg-accent px-3 py-1 text-xs font-semibold transition hover:bg-red-600"
          onClick={() => setShowFrameworks(v => !v)}
        >
          {showFrameworks ? 'Hide Frameworks' : 'Show Frameworks'}
        </button>
        {data?.link && (
          <button
            className="mt-2 rounded bg-accent px-3 py-1 text-xs font-semibold transition hover:bg-red-600"
            onClick={() => window.open(data.link, '_blank')}
          >
            View Project
          </button>
        )}
      </div>
      <AnimatePresence>
        {showFrameworks && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="mt-3 grid w-full grid-cols-3 gap-2"
          >
            {/* Render frameworks for this specific project */}
            {projectSpecificFrameworks.map((fw, idx) => (
              <div key={fw.name + idx} className="flex flex-col items-center">
                <div className="flex items-center flex-col not-even:not-odd:items-center justify-center">
                  <Image
                    src={fw.icon}
                    alt={fw.name}
                    width={22}
                    height={22}
                    className="rounded"
                  />
                  <span className="text-xs text-white/70">{fw.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Red corner divs at the bottom */}
      <div className="absolute -right-1 bottom-0 h-6 w-1 rounded bg-accent" />
      <div className="absolute right-1.5 -bottom-3 h-6 w-1 rotate-90 rounded bg-accent" />
    </div>
  );
}