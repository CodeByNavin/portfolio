"use client";
import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import TechGrid from "./components/TechGrid";
import ProjectGallery from "./components/ProjectGallery";
import ProjectCard from "./components/ProjectCard";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState<any>({ frameworks: [], languages: [] });
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [fwRes, projRes] = await Promise.all([
          fetch("/json/data.json"),
          fetch("/json/projects.json"),
        ]);
        setData(await fwRes.json());
        setProjects(await projRes.json());
      } catch (e: any) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center text-white p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10">Error: {error.message}</div>;

  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <HeroSection />
      <TechGrid frameworks={data.frameworks} languages={data.languages} />
      <ProjectGallery
        projects={projects}
        allFrameworks={[
          ...data.frameworks.map((f: any) => ({ name: f.name, icon: f.img })),
          ...data.languages.map((l: any) => ({ name: l.name, icon: l.img })),
        ]}
      />
    </main>
  );
}
