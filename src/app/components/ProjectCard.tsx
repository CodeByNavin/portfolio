"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

// Define the types if not already
type Framework = {
  name: string;
  icon: string;
};

type ProjectData = {
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
  const [hovered, setHovered] = useState(false);

  const frameworksMap: Record<string, Framework> = Object.fromEntries(
    allFrameworks.map((f) => [f.name.toLowerCase(), f])
  );

  const fwList: Framework[] =
    data.frameworks
      ?.map((n: string) => frameworksMap[n.toLowerCase()])
      .filter((f): f is Framework => Boolean(f)) || [];

  return (
    <motion.div
      className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl cursor-pointer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Image
        src={data.image?.src || "/NoImage.png"}
        alt={data.title}
        width={400}
        height={240}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-red-400">{data.title}</h3>
        <span className="block text-xs text-white/50">{data.timeline}</span>
        <p className="mt-2 text-sm text-gray-300 line-clamp-3">
          {data.description}
        </p>
      </div>

      {hovered && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-3 gap-3 mb-4">
            {fwList.map((fw: Framework) => (
              <div key={fw.name} className="flex flex-col items-center">
                <Image src={fw.icon} alt={fw.name} width={28} height={28} />
                <span className="text-white text-xs mt-1">{fw.name}</span>
              </div>
            ))}
          </div>
          {data.link && (
            <a
              href={data.link}
              target="_blank"
              className="mt-2 inline-block px-4 py-2 bg-teal-500 rounded-full text-xs font-semibold hover:bg-teal-600 transition"
            >
              View Project
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
