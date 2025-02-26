"use client";
import Header from '@/app/components/navigation/header';
import SideNav from '../components/sidenav/main';
import { useState, useEffect } from 'react';
import ProjectInfo from '@/app/projects/components/project';
import GetProjects from './helpers/GetProjects';
import UpdateProject from './helpers/UpdateProject';
import DeleteProject from './helpers/DeleteProject';

export default function Admin() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
    const [Projects, setProjects] = useState<any[]>([]);
    const [EditingProject, setEditingProject] = useState<any | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
        const FetchProjects = async () => {
            const Projects = await GetProjects();
            setProjects(Projects as any);
        };

        FetchProjects();
    }, [EditingProject]);

    useEffect(() => {
        // Preload frameworks if EditingProject exists
        if (EditingProject) {
            setSelectedOptions(EditingProject.frameworks || []);
        }
    }, [EditingProject]);

    const handleSelectChange = (framework: string) => {
        setSelectedOptions((prev) => {
            let updatedOptions;
            if (prev.includes(framework)) {
                updatedOptions = prev.filter((option) => option !== framework);
            } else {
                updatedOptions = [...prev, framework];
            }

            // Update the EditingProject with the new frameworks
            setEditingProject((prevProject: any) => ({
                ...prevProject,
                frameworks: updatedOptions,
            }));

            return updatedOptions;
        });
    };

    const handleSaveProject = async (updatedProject: any) => {
        console.log('Saving project:', updatedProject);
        await UpdateProject(updatedProject);
        setEditingProject(null);
    };

    const handleDeleteProject = async (updatedProject: any) => {
        console.log('Deleting project:', updatedProject);
        await DeleteProject(updatedProject);
        setEditingProject(null);
    };

    const FrameworkList = [
        'discordjs.png',
        'express.svg',
        'javascript.svg',
        'mongodb.svg',
        'mongoose.svg',
        'NextJs.png',
        'react.svg',
        'tailwindcss.svg',
        'typescript.svg'
    ];

    return (
        <div className='flex flex-col h-screen bg-neutral-800 text-white'>
            {/* SideNav for mobile */}
            <div className="absolute top-0 left-0 z-50 md:hidden">
                <SideNav
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
            </div>

            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Main content area */}
            <section className={`overflow-y-hidden flex flex-col md:flex-row gap-8 px-4 py-4 mt-9 transition-all duration-300 ${isMenuOpen ? 'md:ml-[250px]' : ''}`}>
                {/* Left side - Projects List */}
                <div className='flex-1 overflow-y-auto'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className='text-lg font-semibold md:text-xl'>Projects</h2>
                        <button
                            className='p-2 bg-green-500 rounded'
                            onClick={() => setEditingProject({})}
                        >
                            Create New Project
                        </button>
                    </div>
                    <div className='space-y-4'>
                        {Array.isArray(Projects) && Projects.map((project, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <ProjectInfo data={project} />
                                <button
                                    className='p-4 bg-red-500/50 rounded'
                                    onClick={() => setEditingProject(project)}
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle divider */}
                <div className='w-1 h-full bg-red-500 md:block hidden'></div>

                {/* Right side - Editor */}
                <div className='flex-1 overflow-y-auto'>
                    {EditingProject ? (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveProject(EditingProject);
                            }}
                        >
                            <h2 className='text-xl font-semibold mb-4'>
                                {EditingProject.id ? 'Edit Project' : 'Create New Project'}
                            </h2>

                            {/* Project Name Input */}
                            <div className="flex flex-col w-full p-4 mb-4 rounded bg-neutral-700">
                                <label htmlFor="frameworks" className="text-lg font-semibold mb-2">
                                    Set Title:
                                </label>
                                <textarea
                                    value={EditingProject.title || ''}
                                    onChange={(e) => setEditingProject({ ...EditingProject, title: e.target.value })}
                                    placeholder='Project Title'
                                    className='w-full p-2 mb-4 rounded bg-neutral-600 text-white'
                                />
                            </div>

                            {/* Project Description Textarea */}
                            <div className="flex flex-col w-full p-4 mb-4 rounded bg-neutral-700">
                                <label htmlFor="frameworks" className="text-lg font-semibold mb-2">
                                    Set Description:
                                </label>
                                <textarea
                                    value={EditingProject.description || ''}
                                    onChange={(e) => setEditingProject({ ...EditingProject, description: e.target.value })}
                                    placeholder='Project Description'
                                    className='w-full p-2 mb-4 rounded bg-neutral-600 text-white'
                                />
                            </div>

                            {/* Project Timeline Textarea */}
                            <div className="flex flex-col w-full p-4 mb-4 rounded bg-neutral-700">
                                <label htmlFor="frameworks" className="text-lg font-semibold mb-2">
                                    Set Timeline:
                                </label>
                                <textarea
                                    value={EditingProject.timeline || ''}
                                    onChange={(e) => setEditingProject({ ...EditingProject, timeline: e.target.value })}
                                    placeholder='Project Timeline'
                                    className='w-full p-2 mb-4 rounded bg-neutral-600 text-white'
                                />
                            </div>

                            {/* File Input for Project Image */}
                            <div className="flex flex-col w-full p-4 mb-4 rounded bg-neutral-700">
                                <label htmlFor="frameworks" className="text-lg font-semibold mb-2">
                                    Select Image:
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files ? e.target.files[0] : null;
                                        if (file) {
                                            const reader = new FileReader();

                                            reader.onloadend = () => {
                                                const image = new Image();
                                                image.onload = () => {
                                                    setEditingProject({
                                                        ...EditingProject,
                                                        image: {
                                                            data: reader.result as string,
                                                            name: file.name,
                                                            type: file.type,
                                                            size: `${Math.floor(file.size / 1024)} KB`,
                                                            width: image.width,
                                                            height: image.height,
                                                        },
                                                    });
                                                };
                                                image.src = reader.result as string;
                                            };

                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                {/* Display the preloaded image if available */}
                                {EditingProject.image && (
                                    <img
                                        src={EditingProject.image.data}
                                        alt={EditingProject.image.name}
                                        className="mt-4 w-32 h-32 object-cover rounded"
                                    />
                                )}
                            </div>

                            {/* Frameworks Dropdown */}
                            <div className="flex flex-col w-full p-4 mb-4 rounded bg-neutral-700">
                                <label htmlFor="frameworks" className="text-lg font-semibold mb-2">
                                    Select Frameworks:
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full p-2 bg-neutral-600 text-white rounded flex justify-between items-center"
                                    >
                                        {selectedOptions.length > 0
                                            ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedOptions.map((option, index) => (
                                                        <div
                                                            className="flex-row bg-neutral-700 gap-x-2 p-2 rounded"
                                                            key={index}
                                                        >
                                                            <span>
                                                                {option.charAt(0).toUpperCase() + option.slice(1).split('.')[0]}
                                                            </span>
                                                            <span
                                                                onClick={() => handleSelectChange(option)}
                                                                className="cursor-pointer pl-2 size-10"
                                                            >
                                                                x
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                            : 'Choose Frameworks'}
                                    </button>
                                    {isDropdownOpen && (
                                        <ul className="absolute w-full bg-neutral-700 text-white p-2 rounded mt-2 z-50">
                                            {FrameworkList.map((framework) => (
                                                <li
                                                    key={framework}
                                                    className="p-2 hover:bg-neutral-600 cursor-pointer"
                                                    onClick={() => handleSelectChange(framework)}
                                                >
                                                    {framework.charAt(0).toUpperCase() + framework.slice(1).split('.')[0]}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Save, Cancel, and Delete Buttons */}
                            <div className='flex gap-4'>
                                <button
                                    type='submit'
                                    className='p-2 bg-green-500 rounded w-full md:w-auto'
                                >
                                    Save
                                </button>
                                <button
                                    type='button'
                                    className='p-2 bg-gray-500 rounded w-full md:w-auto'
                                    onClick={() => setEditingProject(null)}
                                >
                                    Cancel
                                </button>
                                {Projects.find((project) =>
                                    project._id === EditingProject._id
                                ) && (
                                        <button
                                            type='button'
                                            className='p-2 bg-red-500 rounded w-full md:w-auto'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDeleteProject(EditingProject);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                            </div>
                        </form>
                    ) : (
                        <div className='text-center text-gray-400'>
                            <p>Select a project to edit or create a new one.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
