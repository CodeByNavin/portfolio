"use client";
import ProjectCard from "./ProjectCard";

export default function ProjectGallery({
  projects,
  allFrameworks,
}: {
  projects: any[];
  allFrameworks: any[];
}) {
  return (
    <section id="projects" className="py-16 bg-gray-900 text-white">
      <h2 className="text-3xl font-semibold text-red-400 font-poppins text-center mb-8">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p) => (
          <ProjectCard key={p.title} data={p} allFrameworks={allFrameworks} />
        ))}
      </div>
    </section>
  );
}
